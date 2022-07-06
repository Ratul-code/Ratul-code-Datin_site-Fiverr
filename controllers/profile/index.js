const Profile = require("../../models/profile");
const User = require("../../models/user");
const fs = require("fs");
const ErrorResponse = require("../../utils/errorResponse");

exports.createProfile = async (req, res, next) => {

    const profileExists = await Profile.findOne({ profileUser: req.user.id });
    if (!profileExists) {
      try {
        const { profileImage,bio, country, state, city, hobby, seeking, minAge, maxAge } =
          req.body;
          console.log(profileImage,bio);
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
          next(error);
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
  exports.likeProfileById = async (req, res, next) => {
    const userId = req.params.id;
    const profile = await Profile.findOne({profileUser:userId});
    let liked=true;
    if(profile){
        const isLiked = profile.likes.find(like=>like.givenBy.toString()===req.user.id);
        if(isLiked){
            const likes = profile.likes.filter(like=>like.givenBy.toString()!==req.user.id);
            profile.likes = likes
            liked=false
        }else{
            profile.likes.push({givenBy:req.user})
        }
        await profile.save();
        return res.json({liked,noOfLikes:profile.likes.length})
    }
    return next(new ErrorResponse("No such profile exists",500))
  };

  exports.checkLikeById = async (req, res, next) => {
    const userId = req.params.id;
    const profile = await Profile.findOne({profileUser:userId});
    let liked=false;
    if(profile){
        const isLiked = profile.likes.find(like=>like.givenBy.toString()===req.user.id);
        if(isLiked){
            liked=true
        }
        return res.json({liked,noOfLikes:profile.likes.length})
    }
    return next(new ErrorResponse("No such profile exists",500))
  };


  exports.getLikedUser = async (req, res, next) => {
    const profile = await Profile.findOne({profileUser:req.user.id})
    .populate("likes.givenBy").exec();
    if(profile){
        res.json(profile.likes);
    }
  };


  exports.getProfileImage = async (req, res, next) => {
    const userId = req.params.id
    const profile = await Profile.findOne({profileUser:userId})
    if(profile){
        return res.json(profile.profileImage.name);
    }
    return res.json();
  };
