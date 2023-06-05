const orderController = require("../controllers/bookOrder.controller.js");

module.exports = function (app) {
  app.post("/api/order", orderController.createOrder);
  app.put("/api/order/:id", orderController.updateOrder);
  app.delete("/api/order/:id", orderController.deleteOrder);
  app.get("/api/order", orderController.getAllOrders);
 app.get("/api/order/:id", orderController.getOneOrder);
     
 
};
