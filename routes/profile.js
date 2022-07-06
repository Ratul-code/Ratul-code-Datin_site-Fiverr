const passport = require("passport");
const { createProfile, getProfiles, likeProfileById,checkLikeById,getLikedUser, getProfileById,getProfileImage } = require("../controllers/profile");
const minBronze = require("../middlewares/CheckMember/minBronze");
const upload = require("../middlewares/upload");
const router = require("express").Router();

router.post("/createProfile",passport.authenticate("jwt",{session:false}),upload.single("profileImage"),createProfile);
router.get("/getProfiles",passport.authenticate("jwt",{session:false}),getProfiles);
router.get("/getProfile/:id",passport.authenticate("jwt",{session:false}),getProfileById);
router.get("/likeProfile/:id",passport.authenticate("jwt",{session:false}),minBronze,likeProfileById);
router.get("/checkLike/:id",passport.authenticate("jwt",{session:false}),minBronze,checkLikeById);
router.get("/getLikedUser",passport.authenticate("jwt",{session:false}),getLikedUser);
router.get("/getProfileImage/:id",passport.authenticate("jwt",{session:false}),getProfileImage);

module.exports = router;