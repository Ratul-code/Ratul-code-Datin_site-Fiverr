const passport = require("passport");
const { getPrices,createSession } = require("../controllers/subs");
const { stripe } = require("../utils/stripe");
const router = require("express").Router();

router.get("/prices",getPrices);

router.post("/session",passport.authenticate("jwt",{session:false}),createSession);

module.exports = router;