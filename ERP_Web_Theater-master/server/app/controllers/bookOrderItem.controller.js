const db = require("../models");
const OrderItem = db.orderItem;
const Book = db.book;

// 1.Create order item 
// POST api/orderItem
// {
//   "id": 3,
//   "price": "12",
//   "amount": "125",
//   "updatedAt": "2023-05-31T21:42:22.863Z",
//   "createdAt": "2023-05-31T21:42:22.863Z"
// }
const createOrderItem = async (req, res) => {
  try{
    let info = {
      price: req.body.price,
      amount: req.body.amount,
      orderId: req.body.orderId,
      availableStock:req.body.availableStock
  
    };
  
    const orderItem = await OrderItem.create(info);
    res.status(200).send(orderItem);
  }catch(err){
    console.error(err)
  }
  

};

// 2.Get all order items
const getAllOrderItems = async (req, res) => {
  try{
    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsNumber = Number.parseInt(req.query.size);
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
  
    let allOrderItems= await OrderItem.findAndCountAll({
      //where: { condition },
      order: [["price", "desc"]],
      limit: size,
      offset: page * size,
    });
    res.status(200).send({
      content: allOrderItems.rows,
      totalPages: Math.ceil(allOrderItems.count / Number.parseInt(size)),
    });
  }catch(err){
    console.error(err)
  }
 
};

// 3.Get one order item
const getOneOrderItem = async (req, res) => {
  try{
    let id = req.params.id;
  let getOneOrderItem = await OrderItem.findOne({
    include:[{
      model:Book,
      as:'book'
    }],
    where: { id: id },
  });
  res.status(200).send(getOneOrderItem);
  }catch(err){
    console.error(err)
  }
  
};

// 1.Update order item 
// PUT api/orderItem
// {
//   "id": 3,
//   "price": "120",
//   "amount": "1",
//   "updatedAt": "2023-05-31T21:42:22.863Z",
//   "createdAt": "2023-05-31T21:42:22.863Z"
// }
const updateOrderItem = async (req, res) => {
  try{
    let id = req.params.id;
  const updateOrderItem = await OrderItem.update(req.body, { where: { id: id } });
  res.status(200).send(updateOrderItem);
  }catch(err){
    console.error(err)
  }
};

//update amount order
const updateOrderItemAmount = async (req, res) => {
  try {
    const id = req.params.id;
    //const orderItemId = req.body.orderItemId;
    const newAmount = req.body.amount;

    // Fetch the current order item from the database
    const orderItem = await OrderItem.findOne({ where: { id: id } });

    if (!orderItem) {
      return res.status(404).send('Order item not found');
    }

    // Check if the requested amount exceeds the available stock
    const availableStock = orderItem.availableStock;
    if (newAmount > availableStock) {
      return res.status(400).send('Requested amount exceeds available stock');
    }

    // Perform the database update operation
    const updatedOrderItem = await OrderItem.update(
      { amount: newAmount },
      { where: { id: id } }
    );

    // Handle any errors raised by the trigger
    if (updatedOrderItem[0] === 0) {
      return res.status(400).send('Failed to update order item');
    }

    res.status(200).send(updatedOrderItem);
  } catch (err) {
    // Check for the custom trigger error and handle it separately
    if (err.code === '45000') {
      return res.status(400).send(err.message);
    }
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

// 5.Delete order item
const deleteOrderItem= async (req, res) => {
  try{
    let id = req.params.id;
    await OrderItem.destroy({ where: { id: id } });
    res.status(200).send(`Performance  with id ${id} is deleted!`);
  }catch(err){
    console.error(err)
  }
 
};


module.exports = {
  createOrderItem,
  getAllOrderItems,
  getOneOrderItem,
  updateOrderItem,
  updateOrderItemAmount,
  deleteOrderItem
};


