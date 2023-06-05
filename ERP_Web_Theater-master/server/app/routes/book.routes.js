const bookController = require("../controllers/book.controller.js");

module.exports = function (app) {
  app.post("/api/book", bookController.createBook);
  app.put("/api/book/:id", bookController.updateBook);
  app.delete("/api/book/:id", bookController.deleteBook);
  app.get("/api/book", bookController.getAllBooks);
 app.get("/api/book/:id", bookController.getOneBook);
     
 
};