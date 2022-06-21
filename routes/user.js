const passport = require("passport");
const { getPlan, createProfile, getProfiles, getUserId, getProfileById } = require("../controllers/user");
const upload = require("../middlewares/upload");
const router = require("express").Router();

router.get("/getUserId",getUserId);
router.get("/getPlan",getPlan);
router.post("/createProfile",upload.single("profileImage"),createProfile);
router.get("/getProfiles",getProfiles);
router.get("/getProfile/:id",getProfileById);

module.exports = router;