const db = require("../models");
const Book = db.book;
const OrderItem=db.orderItem

// 1.Create 
// POST api/book
// {
//   "id": 8,
//   "Bookname": "Rat i",
//   "bookAuthorId":1,
//   "updatedAt": "2023-05-31T21:42:22.863Z",
//   "createdAt": "2023-05-31T21:42:22.863Z"
// }
const createBook = async (req, res) => {
  try{ 
  let info = {
    Bookname: req.body.Bookname,
    bookAuthorId:req.body.bookAuthorId,
    bookPublisherId:req.body.bookPublisherId,
    bookGenreId : req.body.bookPublisherId,
    bookLanguageId : req.body.bookLanguageId,
    orderItemId : req.body.orderItemId,
  };

  const book = await Book.create(info);
  res.status(200).send(book);
}catch(error){
  console.log('nikolina')
  console.error(error)
}

};

// 2.Get all 
const getAllBooks = async (req, res) => {
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

  let allBooks= await Book.findAndCountAll({
    //where: { condition },
    order: [["Bookname", "desc"]],
    limit: size,
    offset: page * size,
  });
  res.status(200).send({
    content: allBooks.rows,
    totalPages: Math.ceil(allBooks.count / Number.parseInt(size)),
  });
  }catch(error){
    console.error(error)
  }
  
};

// 3.Get single book 
const getOneBook = async (req, res) => {
  try{
    let id = req.params.id;
  let getOneBook = await Book.findOne({
    include:[{
      model:OrderItem,
      as:'orderItem'
    }],
    where: { id: id },

  });
  res.status(200).send(getOneBook);
  }catch(error){
    console.error(error)
  }
};

// 4.Update  book
// PUT api/book/:id
// {
//   "id": 3,
//   "Bookname": "Rat i Mir",
//   "updatedAt": "2023-05-31T21:42:22.863Z",
//   "createdAt": "2023-05-31T21:42:22.863Z"
// }
const updateBook = async (req, res) => {
  try{
    let id = req.params.id;
    const updateBook = await Book.update(req.body, { where: { id: id } });
    res.status(200).send(updateBook);
  }catch(err){
    console.error(err)
  }
  
 
};

// 5.Delete book
const deleteBook= async (req, res) => {
 try{
  let id = req.params.id;
  await Book.destroy({ where: { id: id } });
  res.status(200).send(`Performance  with id ${id} is deleted!`);
 } catch(err){
  console.error(err)
 }
};


module.exports = {
  createBook,
  getAllBooks,
  getOneBook,
  updateBook,
  deleteBook
};


