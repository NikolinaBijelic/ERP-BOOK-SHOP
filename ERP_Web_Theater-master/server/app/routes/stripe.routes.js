require("dotenv").config();
const cors = require("cors");
const db = require("../models");
const OrderItem=db.orderItem;

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);


module.exports = function (app) {

  app.post("/payment", cors() , async (req, res) => {
    let { amount, id,orderItemId ,itemAmount} = req.body;
    id = id.toString();
  
    try {

      const orderItem=await OrderItem.findOne({where:{id:orderItemId}});

      if(!orderItem){
        console.log('error')
        return res.status(404).json({
          message:"Order item not found",
          success:false
        })
      }

     let paymentMethod=await stripe.paymentMethods.create({
     type:'card',
      card:{
        number:'4242424242424242',
        exp_month:9,
        exp_year:2023,
        cvc:'314'
      },
     });

     
      await stripe.paymentIntents.create({
        payment_method:paymentMethod.id,
        amount,
       currency: "USD",
        description: "Karta je uspesno placenja",
  
        payment_method_types:['card'],
        confirm:true
     
      });

      const availableStock = orderItem.availableStock;
      console.log('availableStock',availableStock)
      console.log('itemAmount',itemAmount)
      if (itemAmount > availableStock) {
        return res.status(400).send('Requested amount exceeds available stock');
      }else{
        res.json({
          message: "Payment successful",
          success: true,
        });
      }
   
// Update the order item with the new amount
const updatedOrderItem = await OrderItem.update(
  { amount: itemAmount },
  { where: { id: orderItemId } }
);


if (updatedOrderItem[0] === 0) {
  return res.status(400).json({
    message: "Failed to update order item",
    success: false,
  });
}

  
   
    } catch (err) {
  console.log(err)
      res.json({
        message: "Payment failed",
        success: false,
      });
    }
  });
};
