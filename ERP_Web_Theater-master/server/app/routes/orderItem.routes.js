const orderItemController = require("../controllers/bookOrderItem.controller.js");

module.exports = function (app) {
  app.post("/api/orderItem", orderItemController.createOrderItem);
  app.put("/api/orderItem/:id", orderItemController.updateOrderItem);
  app.delete("/api/orderItem/:id", orderItemController.deleteOrderItem);
  app.get("/api/orderItem", orderItemController.getAllOrderItems);
 app.get("/api/orderItem/:id", orderItemController.getOneOrderItem);
     
 
};
