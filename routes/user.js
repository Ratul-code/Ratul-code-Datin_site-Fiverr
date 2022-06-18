const passport = require("passport");
const { getUser,getPlan, createProfile } = require("../controllers/user");

const router = require("express").Router();

router.get("/",passport.authenticate("jwt",{session:false}),getUser);
router.get("/getPlan",passport.authenticate("jwt",{session:false}),getPlan);
router.get("/createProfile",passport.authenticate("jwt",{session:false}),createProfile);

module.exports = router;