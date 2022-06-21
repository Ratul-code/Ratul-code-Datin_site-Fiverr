const { stripe } = require("../../utils/stripe");
const User = require("../../models/user");
const Profile = require("../../models/profile");
const fs = require("fs");
const ErrorResponse = require("../../utils/errorResponse");
const { profile } = require("console");
exports.getUserId = (req, res, next) => {
  return res.json(req.user.id);
};

exports.getPlan = async (req, res, next) => {
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
    if (subscriptionData.data.length > 1) {
      let isGoldMemeber = subscriptionData.data.find(
        (subs) => subs.plan.nickname === "Gold"
      );
      if (isGoldMemeber) {
        return res.json({ plan: "Gold" });
      }
      let isSilverMemeber = subscriptionData.data.find(
        (subs) => subs.plan.nickname === "Silver"
      );
      if (isSilverMemeber) {
        return res.json({ plan: "Silver" });
      }
    }
    return res.json({ plan: subscriptionData.data[0].plan });
  } else {
    res.json();
  }
};

exports.createProfile = async (req, res, next) => {
    
  const profileExists = await Profile.findOne({ profileUser: req.user.id });
  if (!profileExists) {
    try {
      const { bio, country, state, city, hobby, seeking, minAge, maxAge } =
        req.body;
      const newProfile = await Profile.create({
        firstname:req.user.firstname,
        lastname:req.user.lastname,
        username:req.user.username,
        gender:req.user.gender,
        age:req.user.age,
        profileImage: {
          name:req.file.filename,
          data:fs.readFileSync(`uploads/${req.file.filename}`),
        },
        bio,
        about: {
          country,
          state,
          city,
          hobby,
        },
        interests: {
          seeking,
          minAge: parseInt(minAge),
          maxAge: parseInt(maxAge),
        },
        profileUser: req.user,
      });
      res.json(newProfile);
    } catch (error) {
      console.log(error);
      next(error);
    }
  } else {
    return next(
      new ErrorResponse("A profile of this user already exists", 500)
    );
  }
};

exports.getProfiles = async (req, res, next) => {
    try {
        const profiles = await Profile.find();
        return res.json(profiles);
    } catch (error) {
        
    }
};
exports.getProfileById = async (req, res, next) => {
  const userId = req.params.id;
  console.log("myid",req.user.id);
  console.log({userId});
  console.log(userId === req.user.id);
  let myProfile = false;
  if (userId === req.user.id) {
    myProfile = true;
  }
  try {
    try{
        const profile = await Profile.findOne({profileUser:userId});
        return res.json({profile,myProfile});
    }catch(err){
        return res.json({profile:null,myProfile});
    }
  } catch (error) {
    next(error);
  }
};
