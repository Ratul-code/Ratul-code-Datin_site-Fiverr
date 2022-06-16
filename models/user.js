const  mongoose  = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        trim:true,
        required:[true,"Please provide your firstname"],
        maxlength:[20,"firstname can not be more than 20 character"],
    },
    lastname:{
        type:String,
        trim:true,
        required:[true,"Please provide a lastname"],
        maxlength:[20,"lastname can not be more than 20 character"],
    },
    username:{
        type:String,
        trim:true,
        required:[true,"Please provide a username"],
        maxlength:[20,"username can not be more than 20 character"],
    },
    gender:{
        type:String,
        required:[true,"Please select your gender"]
    },
    age:{
        type:Number,
        required:[true,"Please select your gender"],
        min:0,
        max:60
    },
    email:{
        type:String,
        trim:true,
        required:[true,"Please provide an Email"],
        unique:true,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill a valid email address'],
    },
    password:{
        type:String,
        required:[true,"Please add a password"],
        minlength:6,
    },
    stripeCustomerId:{
        type:String,
        required:true
    },
    createdat:String,
    resetPasswordToken:String,
    resetPasswordDate:Date,
});

userSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password,this.password);
}


userSchema.methods.getSignedToken = function(){
    return jwt.sign({
        id:this._id,
    },process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
}

userSchema.methods.getresetPasswordToken = function(){
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetPasswordToken).digest("hex");

    this.resetPasswordDate = Date.now() + 10 * (120*1000);

    return resetPasswordToken;
}


userSchema.pre("save",async function(next){
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
});

const User = mongoose.model("User",userSchema); 

module.exports = User;