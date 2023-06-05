const cors = require("cors");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

module.exports = function (app) {
  app.post("/payment", cors(), async (req, res) => {
    let { amount, id } = req.body;
    try {
     console.log('nina',req.body)
     let paymentMethod=await stripe.paymentMethods.create({
      type:'card',
      card:{
        number:'4242424242424242',
        exp_month:9,
        exp_year:2023,
        cvc:'314'
      },
     });

     console.log('payment',paymentMethod)
      const payment = await stripe.paymentIntents.create({
        payment_method:paymentMethod.id,
        amount,
        currency: "USD",
        description: "Karta je uspesno placenja",
        payment_method: id,
        confirm: true,
        payment_method_types:['card']
       //automatic_payment_methods:{enabled:true}
      });

      console.log("Payment", payment);
      
      res.send(payment).json({
        message: "Payment successful",
        success: true,
      });
      //return payment;
    } catch (err) {
      console.log(err);

      res.json({
        message: "Payment failed",
        success: false,
      });
    }
  });
};
/* 
router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
}); */

//module.exports = router;
