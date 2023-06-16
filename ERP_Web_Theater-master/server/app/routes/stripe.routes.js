require("dotenv").config();
const cors = require("cors");
const createOrderItem = require('../controllers/bookOrderItem.controller'); 

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);


module.exports = function (app) {

  app.post("/payment", cors() , async (req, res) => {
    let { amount, id } = req.body;
    try {
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
      // customer,
        payment_method_types:['card'],
        confirm:true
     
      });
   
//       const irina=await createOrderItem.createOrderItem(amount,1,1);
// console.log(irina)
      res.json({
        message: "Payment successful",
        success: true,
      });
   
    } catch (err) {
  console.log(err)
      res.json({
        message: "Payment failed",
        success: false,
      });
    }
  });
};
