const User = require("../models/user");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const { stripe } = require("../utils/stripe");


exports.register = async (req, res, next) => {
    const {firstname, lastname, username, gender,age, email, password } = req.body;
    const duplicateEmail = await User.findOne({email})
    if(duplicateEmail){
      return next(new ErrorResponse("An account with this email already exist", 500));
    }
    const customer = await stripe.customers.create({
      email
    },{
      apiKey:process.env.STRIPE_SECRET_KEY
    }
    );
    try {
      const user = await User.create({
        firstname,
        lastname,
        username,
        gender,
        age,
        email,
        password,
        stripeCustomerId:customer.id,
        createdat:new Date().toISOString()
      });
      sendToken(user, 201, res);
    } catch (error) {
      console.log(error,"jk")
      next(error);
    }
  };


  exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    if (email.trim()==="" || password.trim()==="") {
      return next(new ErrorResponse("Please Provide email and password", 400));
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return next(new ErrorResponse("User not found or Incorrect Email", 404));
      }
      const isMatch = await user.matchPasswords(password);
      if (!isMatch) {
        return next(new ErrorResponse("Incorrect Password", 404));
      }
      sendToken(user, 202, res);
    } catch (error) {
      next(error);
    }
  };


const sendToken = (user, statusCode, res) => {
    const token = `Bearer ${user.getSignedToken()}`;
    res
      .status(statusCode)
      .cookie("xs", token, {
        sameSite: "strict",
        path: "/",
        //   maxAge: ,
        httpOnly: true,
        secure: true,
      })
      .json({
        success: true,
        token,
        user
      })
    }