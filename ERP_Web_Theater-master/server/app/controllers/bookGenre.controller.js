const db = require("../models");
const GenreBook = db.bookgenre;

// 1.Create genre for book
// POST api/genreBook
// {
//  "id": 1,
//"genreName": "Klasik",
//"updatedAt": "2023-05-31T22:46:02.971Z",
//"createdAt": "2023-05-31T22:46:02.971Z"
// }
const createBookGen = async (req, res) => {
  try{
    let info = {
      genreName: req.body.genreName
      
    };
  
    const bookGenre = await GenreBook.create(info);
    res.status(200).send(bookGenre);
  }catch(err){
    console.error(err)
  }
  

};

// 2.Get all book genre
const getAllBookGenre = async (req, res) => {
  try{
    const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);
  //const performanceName = String(req.query.performanceName);
  /*  var condition = performanceName
    ? { performanceName: { [Op.like]: `%${performanceName}%` } }
    : null; */

  let page = 0;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 10;
  if (
    !Number.isNaN(sizeAsNumber) &&
    !(sizeAsNumber > 10) &&
    !(sizeAsNumber < 1)
  ) {
    size = sizeAsNumber;
  }

  let allBookGenres = await GenreBook.findAndCountAll({
    //where: { condition },
    order: [["genreName", "desc"]],
    limit: size,
    offset: page * size,
  });
  res.status(200).send({
    content: allBookGenres.rows,
    totalPages: Math.ceil(allBookGenres.count / Number.parseInt(size)),
  });
  }catch(err){
    console.error(err)
  }
  
};

// 3.Get single book genre
const getOneBookGenre = async (req, res) => {
  try{
    let id = req.params.id;
  let getoneBookGenre = await GenreBook.findOne({
    include:[{
      model:Book,
      as:'book'
    }],
    where: { id: id },
  });
  res.status(200).send(getoneBookGenre);
  }catch(err){
    console.error(err)
  }
  
};

// 4.Update genre book
// PUT api/genreBook/:id
// {
//   "id": 3,
//   "genreName": "Klasika",
//   "updatedAt": "2023-05-31T21:42:22.863Z",
//   "createdAt": "2023-05-31T21:42:22.863Z"
// }
const updateBookGenre = async (req, res) => {
  try{
    let id = req.params.id;
  const updatedBookGenre = await GenreBook.update(req.body, { where: { id: id } });
  res.status(200).send(updatedBookGenre);
 
  }catch(err){
    console.error(err)
  }
  
};

// 5.Delete genre
const deleteBookGenre= async (req, res) => {
  try{
    let id = req.params.id;
  await GenreBook.destroy({ where: { id: id } });
  res.status(200).send(`Performance  with id ${id} is deleted!`);
  }catch(err){
    console.error(err)
  }
  
};


module.exports = {
  createBookGen,
  getAllBookGenre,
  getOneBookGenre,
  updateBookGenre,
  deleteBookGenre
};


