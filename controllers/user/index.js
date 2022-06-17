const { stripe } = require("../../utils/stripe")

exports.getUser = (req,res,next)=>{
    res.json({user:req.user})
}


exports.getPlan = async (req,res,next)=>{
    const subscriptionData = await stripe.subscriptions.list(
        {
            customer:req.user.stripeCustomerId,
            status:"active",
            expand:["data.default_payment_method"]
        },
        {
            apiKey:process.env.STRIPE_SECRET_KEY
        }
    )
    if(subscriptionData.data.length){
        if(subscriptionData.data.length>1){
            let isGoldMemeber = subscriptionData.data.find(subs=>subs.plan.nickname==="Gold")
            if(isGoldMemeber){
                return res.json({plan:"Gold"})
            }
            let isSilverMemeber = subscriptionData.data.find(subs=>subs.plan.nickname==="Silver")
            if(isSilverMemeber){
                return res.json({plan:"Silver"})
            }
        }
        return res.json({plan:subscriptionData.data[0].plan})
    }else{
        res.json();
    }
}
