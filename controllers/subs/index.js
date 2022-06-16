const { stripe } = require("../../utils/stripe")

exports.getPrices = async (req,res,next)=>{
    const prices = await stripe.prices.list({
        apiKey:process.env.STRIPE_SECRET_KEY
    })
    res.json(prices)
};



exports.createSession = async (req,res,next)=>{
    console.log(req.user.stripeCustomerId);
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
            success_url:"https://dating-website-lyart.vercel.app/profile/2",
            cancel_url:"https://dating-website-lyart.vercel.app/membership",
            customer:req.user.stripeCustomerId
        },
        {
        apiKey:process.env.STRIPE_SECRET_KEY
    })
    res.json(session)
};