const passport = require("passport");
const { getUser,getPlan } = require("../controllers/user");

const router = require("express").Router();

router.get("/",passport.authenticate("jwt",{session:false}),getUser);
router.get("/getPlan",passport.authenticate("jwt",{session:false}),getPlan);

module.exports = router;