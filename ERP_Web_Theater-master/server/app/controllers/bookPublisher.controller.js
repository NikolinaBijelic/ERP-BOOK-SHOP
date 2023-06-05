const db = require("../models");
const PublisherBook = db.bookPublisher;

//Create Main Model
const Book=db.book;

// 1.Create book publisher
// POST api/bookPublisher
// {
//   "id": 1,
//   "namePublisher": "Lagun",
//   "updatedAt": "2023-05-31T21:42:22.863Z",
//   "createdAt": "2023-05-31T21:42:22.863Z"
// }
const createBookPublisher = async (req, res) => {
  try{
    let info = {
      namePublisher: req.body.namePublisher
      
    };
  
    const bookPublisher = await PublisherBook.create(info);
    res.status(200).send(bookPublisher);
  }catch(err){
    console.error(err)
  }
 

};

// 2.Get all book publishers
const getAllBookPublishers = async (req, res) => {
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

  let getAllBookPublishers= await PublisherBook.findAndCountAll({
    //where: { condition },
    order: [["namePublisher", "desc"]],
    limit: size,
    offset: page * size,
  });
  res.status(200).send({
    content: getAllBookPublishers.rows,
    totalPages: Math.ceil(getAllBookPublishers.count / Number.parseInt(size)),
  });
  }catch(err){
    console.error(err)
  }
  
};

// 3.Get one book publisher
const getOneBookPublisher = async (req, res) => {
  try{
    let id = req.params.id;
    let getOneBookPublisher = await PublisherBook.findOne({
      include:[{
        model:Book,
        as:'book'
      }],
      where: { id: id },
    });
    res.status(200).send(getOneBookPublisher);
  }catch(err){
    console.error(err)
  }
 
};

// update book publisher
// PUT api/bookPublisher
// {
//   "id": 1,
//   "namePublisher": "Laguna",
//   "updatedAt": "2023-05-31T21:42:22.863Z",
//   "createdAt": "2023-05-31T21:42:22.863Z"
// }
const updateBookPublisher = async (req, res) => {
  try{
    let id = req.params.id;
  const updateBookPublisher = await PublisherBook.update(req.body, { where: { id: id } });
  res.status(200).send(updateBookPublisher);
 
  }catch(err){
    console.error(err)
  }
  
};

// 5.Delete publisher
const deleteBookPublisher= async (req, res) => {
  try{
    let id = req.params.id;
    await PublisherBook.destroy({ where: { id: id } });
    res.status(200).send(`Performance  with id ${id} is deleted!`);
  }catch(err){
    console.error(err)
  }
 
};


module.exports = {
  createBookPublisher,
  getAllBookPublishers,
  getOneBookPublisher,
  updateBookPublisher,
  deleteBookPublisher
};


