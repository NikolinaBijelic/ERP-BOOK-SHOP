const db = require("../models");
const Order = db.order;
const OrderItem=db.orderItem;

// 1.Create order item 
// POST api/orderItem
// {
//   "id": 3,
//   "price": "12",
//   "amount": "125",
//   "updatedAt": "2023-05-31T21:42:22.863Z",
//   "createdAt": "2023-05-31T21:42:22.863Z"
// }
const createOrder = async (req, res) => {
 try{ 
  let info = {
    date:req.body.date,
    userId:req.body.userId
  };

  const order = await Order.create(info);
  res.status(200).send(order);
  
}catch(error){
  console.error(error)
}
};

// 2.Get all order 
const getAllOrders = async (req, res) => {
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

  let allOrders = await Order.findAndCountAll({
    //where: { condition },
    order: [["date", "desc"]],
    limit: size,
    offset: page * size,
  });
  res.status(200).send({
    content: allOrders.rows,
    totalPages: Math.ceil(allOrders.count / Number.parseInt(size)),
  });
  }catch(err){
  console.error(err)
}  
};

// 3.Get one order 
const getOneOrder = async (req, res) => {
  try{
    let id = req.params.id;
    let getOneOrder = await Order.findOne({
      include:[{
        model:OrderItem,
        as:'orderItem'
      }],
      where: { id: id },
    });
    res.status(200).send(getOneOrder);
  }catch(error){
    console.error(error)
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
const updateOrder = async (req, res) => {
  try{
    let id = req.params.id;
    const updateOrder = await Order.update(req.body, { where: { id: id } });
    res.status(200).send(updateOrder);
  }catch(err){
    console.error(err)
  }
 
 
};

// 5.Delete order item
const deleteOrder= async (req, res) => {
  try{
    let id = req.params.id;
  await Order.destroy({ where: { id: id } });
  res.status(200).send(`Order  with id ${id} is deleted!`);
  }catch(err){
    console.error(err)
  }
  
};


module.exports = {
  createOrder,
  getAllOrders,
  getOneOrder,
  updateOrder,
  deleteOrder
};


