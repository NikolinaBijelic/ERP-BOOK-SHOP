const db = require("../models");
const AuthorBook = db.bookAuthor;

//Create Main Model
const Book=db.book;

// 1.Create author
// POST api/bookAuthor
// {
//   "id": 3,
//   "nameAuthor": "Lav Tolstoj",
//   "updatedAt": "2023-05-31T21:42:22.863Z",
//   "createdAt": "2023-05-31T21:42:22.863Z"
// }
const createBookAuthor = async (req, res) => {
  try{
    let info = {
      nameAuthor: req.body.nameAuthor
      
    };
  
    const bookAuthor = await AuthorBook.create(info);
    res.status(200).send(bookAuthor);
  
  }catch(err){
    console.error(err)
  }
  
};

// 2.Get all authors
const getAllBookAuthors = async (req, res) => {
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
  
    let allBookAuthors= await AuthorBook.findAndCountAll({
      //where: { condition },
      order: [["nameAuthor", "desc"]],
      limit: size,
      offset: page * size,
    });
    res.status(200).send({
      content: allBookAuthors.rows,
      totalPages: Math.ceil(allBookAuthors.count / Number.parseInt(size)),
    });
  }catch(err){
    console.error(err)
  }
 
};

// 3.Get one author
const getOneBookAuthor = async (req, res) => {
  try{
    let id = req.params.id;
    let getOneBookAuthor = await AuthorBook.findOne({
      include:[
        {
        model:Book,
        as:"book"
      }
    ],
      where: { id: id },
    });
    res.status(200).send(getOneBookAuthor);
  }catch(err){
    console.error(err)
  }

};

// 1.Update author
// PUT api/bookAuthor
// {
//   "id": 3,
//   "nameAuthor": "Lav N. Tolstoj",
//   "updatedAt": "2023-05-31T21:42:22.863Z",
//   "createdAt": "2023-05-31T21:42:22.863Z"
// }
const updateBookAuthor = async (req, res) => {
  try{
    let id = req.params.id;
    const updateBookAuthor = await AuthorBook.update(req.body, { where: { id: id } });
    res.status(200).send(updateBookAuthor);
  }catch(err){
      console.error(err)
    }
 
};

// 5.Delete author
const deleteBookAuthor= async (req, res) => {
  try{
    let id = req.params.id;
    await AuthorBook.destroy({ where: { id: id } });
    res.status(200).send(`Performance  with id ${id} is deleted!`);
  }catch(err){
    console.err(err)
  }
 
};


module.exports = {
  createBookAuthor,
  getAllBookAuthors,
  getOneBookAuthor,
  updateBookAuthor,
  deleteBookAuthor
};


