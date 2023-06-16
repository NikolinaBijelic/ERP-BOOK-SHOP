require("dotenv").config();
const db = require("../models");
const OrderItem=db.orderItem;

module.exports=function (app) {
    app.post('/stripe-webhook',async(req,res)=>{
    const sig=req.headers['stripe-signature'];
    let event;

    try{
        event=stripe.webhooks.constructEvent(req.body,sig,process.env.WEB_HOOK_SECRET_KEY);
    }catch(error){
        return res.status(400).send(`Webhook error: ${error.message}`)
    }

    switch(event.type){
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            const orderId = paymentIntent.metadata.orderId;
            const amount = paymentIntent.amount;
            const currency = paymentIntent.currency;
            try{
           const order=await OrderItem.findById({ _id: orderId });
           if (order) {
            // Prepare the order data to send to the admin interface
            const orderData = {
              orderId: order._id,
             // customerName: order.customerName,
              amount,
              currency,
              paymentMethodId,
             // paymentStatus,
            };
  
            // Send the order data as a response to the admin interface
            res.json(orderData);
        } else {
            console.log('Order not found');
            res.status(404).json({ message: 'Order not found' });
          }
            }catch (err) {
                console.error('Error saving payment details:', err);
              }
        break;
        case 'payment_intent.payment_failed':
        break;
        default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    res.json({received:true})
})
}