const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

exports.checkAuth = async (req, res, next) => {
  let token;
  console.log(req)
    if(req.cookies.xs){
    token = req.cookies.xs
  }
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new ErrorResponse("User not Found", 404));
    }
    req.user = user;
    next();

  }
   catch (error) {
    return next(new ErrorResponse("Not authorized to access this Route", 401));
  }
};