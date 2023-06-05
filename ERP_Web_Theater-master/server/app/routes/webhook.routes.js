module.exports=function (app) {
    app.post('/stripe-webhook',(req,res)=>{
    const sig=req.headers['stripe-signature'];
    let event;

    try{
        event=stripe.webhooks.constructEvent(req.body,sig,process.env.STRIPE_SECRET_TEST);
    }catch(error){
        return res.status(400).send(`Webhook error: ${error.message}`)
    }

    switch(event.type){
        case 'payment_intent.succeeded':
        break;
case 'payment_intent.payment_failed':
    break;
    default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    res.json({received:true})
})
}