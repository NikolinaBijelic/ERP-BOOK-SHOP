const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const passport = require('passport');

router.post("/payment", passport.authenticate("jwt", { session: false }),(req, res) => {
  console.log('userpayment',req)
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
      customer:req.user.stripeCustomerId
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
