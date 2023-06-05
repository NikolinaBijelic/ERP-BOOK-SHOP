const bookLanguageController = require("../controllers/bookLanguage.controller.js");

module.exports = function (app) {
  app.post("/api/bookLanguage", bookLanguageController.createBookLanguage);
  app.put("/api/bookLanguage/:id", bookLanguageController.updateBookLanguage);
  app.delete("/api/bookLanguage/:id", bookLanguageController.deleteBookLanguage);
  app.get("/api/bookLanguage", bookLanguageController.getAllBookLanguages);
 app.get("/api/bookLanguage/:id", bookLanguageController.getOneBookLanguage);
     
 
};
