const { stripe } = require("../../utils/stripe")

exports.getUser = (req,res,next)=>{
    res.json({user:req.user})
}
exports.getPlan = async (req,res,next)=>{
    const subscriptionData = await stripe.subscriptions.list(
        {
            customer:req.user.stripeCustomerId,
            status:"all",
            expand:["data.default_payment_method"]
        },
        {
            apiKey:process.env.STRIPE_SECRET_KEY
        }
    )
    if(subscriptionData.data.length){
        res.json({plan:subscriptionData.data[0].plan.nickname})
    }else{
        res.json();
    }
}
