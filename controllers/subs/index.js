const ErrorResponse = require("../../utils/errorResponse");
const { stripe } = require("../../utils/stripe")

exports.getPrices = async (req,res,next)=>{
    const prices = await stripe.prices.list({
        apiKey:process.env.STRIPE_SECRET_KEY
    })
    res.json(prices)
};



exports.createSession = async (req,res,next)=>{



    // const {plan} = req.body
    // const subscriptionData = await stripe.subscriptions.list(
    //     {
    //         customer:req.user.stripeCustomerId,
    //         status:"all",
    //         expand:["data.default_payment_method"]
    //     },
    //     {
    //         apiKey:process.env.STRIPE_SECRET_KEY
    //     }
    // )
    // if(subscriptionData.data.length){
    //     let sameplan=subscriptionData.data.find(subs=>subs.plan.nickname===plan);
    //     if(sameplan){
    //         return next(new ErrorResponse(`You have already our ${plan} membership`))
    //     }
    // }




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
};