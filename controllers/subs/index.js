const { stripe } = require("../../utils/stripe")

exports.getPrices = async (req,res,next)=>{
    const prices = await stripe.prices.list({
        apiKey:process.env.STRIPE_SECRET_KEY
    })
    res.json(prices)
};



exports.createSession = async (req,res,next)=>{
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
    res.json(session)
};