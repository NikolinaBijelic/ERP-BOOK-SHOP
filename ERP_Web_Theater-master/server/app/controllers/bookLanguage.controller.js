const db = require("../models");
const LanguageBook = db.bookLanguage;

// 1.Create book language
// POST api/bookLanguage
// {
//   "id": 3,
//   "languageName": "Srpski",
//   "updatedAt": "2023-05-31T21:42:22.863Z",
//   "createdAt": "2023-05-31T21:42:22.863Z"
// }
const createBookLanguage = async (req, res) => {
  try{
    let info = {
      languageName: req.body.languageName
      
    };
  
    const bookLanguage = await LanguageBook.create(info);
    res.status(200).send(bookLanguage);
  }catch(err){
    console.error(err)
  }
 

};

// 2.Get all book's languages
const getAllBookLanguages = async (req, res) => {
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

  let allBookLanguages= await LanguageBook.findAndCountAll({
    //where: { condition },
    order: [["languageName", "desc"]],
    limit: size,
    offset: page * size,
  });
  res.status(200).send({
    content: allBookLanguages.rows,
    totalPages: Math.ceil(allBookLanguages.count / Number.parseInt(size)),
  });
  }catch(err){
    console.error(err)
  }
  
};

// 3.Get one book language
const getOneBookLanguage = async (req, res) => {
  try{
    let id = req.params.id;
  let getOneBookLanguage = await LanguageBook.findOne({
    include:[{
      model:Book,
      as:'book'
    }],
    where: { id: id },
  });
  res.status(200).send(getOneBookLanguage);
  }catch(err){
    console.error(err)
  }
  
};

// 4.Update book language
// PUT api/bookLanguage
// {
//   "id": 3,
//   "languageName": "Srpski jezik",
//   "updatedAt": "2023-05-31T21:42:22.863Z",
//   "createdAt": "2023-05-31T21:42:22.863Z"
// }
const updateBookLanguage = async (req, res) => {
  try{
    let id = req.params.id;
    const updateBookLanguage = await LanguageBook.update(req.body, { where: { id: id } });
    res.status(200).send(updateBookLanguage);
   
 }catch(err){
  console.error(err)
 }
 
};

// 5.Delete language
const deleteBookLanguage= async (req, res) => {
  try{
    let id = req.params.id;
    await LanguageBook.destroy({ where: { id: id } });
    res.status(200).send(`Performance  with id ${id} is deleted!`);
  }catch(err){
    console.error(err)
  }
 
};


module.exports = {
  createBookLanguage,
  getAllBookLanguages,
  getOneBookLanguage,
  updateBookLanguage,
  deleteBookLanguage
};


