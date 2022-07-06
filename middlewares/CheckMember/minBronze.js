const ErrorResponse = require("../../utils/errorResponse");
const { stripe } = require("../../utils/stripe");

module.exports = async (req,res,next) =>{
    const subscriptionData = await stripe.subscriptions.list(
        {
          customer: req.user.stripeCustomerId,
          status: "active",
          expand: ["data.default_payment_method"],
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY,
        }
      );
      if (subscriptionData.data.length) {
          let permittedMemeber = subscriptionData.data.find(
            (subs) => subs.plan.nickname === "Gold" || subs.plan.nickname === "Silver"  || subs.plan.nickname === "Bronze"  
          );
          if(permittedMemeber){
            console.log(permittedMemeber.plan.nickname);
            return next()
          } 
          else return next(new ErrorResponse("User must be atleast a bronze member to access this route",401))
      } else {
        return next(new ErrorResponse("User must be atleast a bronze member to access this route",401))
      }
}