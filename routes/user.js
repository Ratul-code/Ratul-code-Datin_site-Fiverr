const passport = require("passport");
const { getPlan, createProfile, getProfiles, getUserId, getProfileById } = require("../controllers/user");
const minBronze = require("../middlewares/CheckMember/minBronze");
const upload = require("../middlewares/upload");
const router = require("express").Router();

router.get("/getUserId",passport.authenticate("jwt",{session:false}),getUserId);
router.get("/getPlan",passport.authenticate("jwt",{session:false}),getPlan);

module.exports = router;