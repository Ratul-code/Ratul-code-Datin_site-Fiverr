const ErrorResponse = require("../../utils/errorResponse");
const { stripe } = require("../../utils/stripe")

exports.getPrices = async (req,res,next)=>{
    const prices = await stripe.plans.list({
        apiKey:process.env.STRIPE_SECRET_KEY
    });
    const activePlansList = prices.data.filter(price=>price.active===true);
    res.json(activePlansList)
};




exports.createSession = async (req,res,next)=>{
    try{
        const currentPrice = await stripe.prices.retrieve(req.body.priceId)
        const plan = currentPrice.nickname
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
            let userPlan=subscriptionData.data[0].plan.nickname;
            if(subscriptionData.data.length>1){
                let isGoldMemeber = subscriptionData.data.find(subs=>subs.plan.nickname==="Gold")
                if(isGoldMemeber){
                    userPlan = "Gold"
                }
                let isSilverMemeber = subscriptionData.data.find(subs=>subs.plan.nickname==="Silver")
                if(isSilverMemeber){
                    userPlan = "Silver"
                }
            }

            if(plan===userPlan){
                return next(new ErrorResponse(`You have already our ${plan} membership`,500))
            }
            if(userPlan==="Gold" && plan!=="Gold"){
                return next(new ErrorResponse(`You have already our highest ${userPlan} membership`,500))
            }
            if(userPlan==="Silver" && plan!=="Gold"){
                return next(new ErrorResponse(`You have already our ${userPlan} membership. You can only buy Gold membership`,500))
            }
        }

        const session = await stripe.checkout.sessions.create(
            {
                mode:"subscription",
                payment_method_types:["card"],
                line_items:[
                    {
                        price:req.body.priceId,
                        quantity:1
                    }
                ],
                success_url:`${process.env.CLIENT_SITE}/profile/2`,
                cancel_url:`${process.env.CLIENT_SITE}/membership`,
                customer:req.user.stripeCustomerId
            },
            {
            apiKey:process.env.STRIPE_SECRET_KEY
        })
        if(session){
           return res.json(session)
        }
        return res.json();
    } catch(err){
        next(err);
    }
};