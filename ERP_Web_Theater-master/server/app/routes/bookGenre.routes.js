const bookGenereController = require("../controllers/bookGenre.controller.js");

module.exports = function (app) {
  app.post("/api/bookGenre", bookGenereController.createBookGen);
  app.put("/api/bookGenre/:id", bookGenereController.updateBookGenre);
  app.delete("/api/bookGenre/:id", bookGenereController.deleteBookGenre);
  app.get("/api/bookGenre", bookGenereController.getAllBookGenre);
 app.get("/api/bookGenre/:id", bookGenereController.getOneBookGenre);
     
 
};
