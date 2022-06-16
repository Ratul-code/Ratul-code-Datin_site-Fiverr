const passport = require("passport");
const { getUser,getPlan } = require("../Controllers/user");
const { checkAuth } = require("../middlewares/checkAuth");

const router = require("express").Router();

router.get("/",passport.authenticate("jwt",{session:false}),getUser);
router.get("/getPlan",passport.authenticate("jwt",{session:false}),getPlan);

module.exports = router;