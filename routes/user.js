const passport = require("passport");
const { getPlan, createProfile, getProfiles, getUserId, getProfileById } = require("../controllers/user");
const upload = require("../middlewares/upload");
const router = require("express").Router();

router.get("/getUserId",passport.authenticate("jwt",{session:false}),getUserId);
router.get("/getPlan",passport.authenticate("jwt",{session:false}),getPlan);
router.post("/createProfile",passport.authenticate("jwt",{session:false}),upload.single("profileImage"),createProfile);
router.get("/getProfiles",passport.authenticate("jwt",{session:false}),getProfiles);
router.get("/getProfile/:id",passport.authenticate("jwt",{session:false}),getProfileById);

module.exports = router;