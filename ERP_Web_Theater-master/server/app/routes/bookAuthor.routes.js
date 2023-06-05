const bookAuthorController = require("../controllers/bookAuthor.controller.js");

module.exports = function (app) {
  app.post("/api/bookAuthor", bookAuthorController.createBookAuthor);
  app.put("/api/bookAuthor/:id", bookAuthorController.updateBookAuthor);
  app.delete("/api/bookAuthor/:id", bookAuthorController.deleteBookAuthor);
  app.get("/api/bookAuthor", bookAuthorController.getAllBookAuthors);
 app.get("/api/bookAuthor/:id", bookAuthorController.getOneBookAuthor);
     
 
};