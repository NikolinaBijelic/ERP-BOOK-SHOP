const bookPublisherController = require("../controllers/bookPublisher.controller.js");

module.exports = function (app) {
  app.post("/api/bookPublisher", bookPublisherController.createBookPublisher);
  app.put("/api/bookPublisher/:id", bookPublisherController.updateBookPublisher);
  app.delete("/api/bookPublisher/:id", bookPublisherController.deleteBookPublisher);
  app.get("/api/bookPublisher", bookPublisherController.getAllBookPublishers);
 app.get("/api/bookPublisher/:id", bookPublisherController.getOneBookPublisher);
     
 
};
