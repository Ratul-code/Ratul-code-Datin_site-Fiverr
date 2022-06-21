const { mongoose, Schema } = require("mongoose");
const profileSchema = new mongoose.Schema({
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
    min:14,
    max:100
},
  profileImage: {
    type: Buffer,
    required: [true, "Please provide a profile image"],
  },
  bio: {
    type: String,
    maxlength: [40, "Your bio cannot exceed 40 characters"],
    required: [true, "Please provide a bio"],
    trim:true
  },
  likes: [
    {
      givenBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      createdAt: {
        type: Date,
      },
    },
  ],
  about: {
    country: { type: String ,trim:true},
    state: { type: String,trim:true },
    city: { type: String,trim:true },
    hobby: { type: String,trim:true },
    ethnicity: { type: String,trim:true },
  },
  interests: {
    seeking: { type: String, enum: ["Male", "Female", "Any"],trim:true },
    minAge: { type: Number, min: 14,trim:true },
    maxAge: { type: Number, max: 100,trim:true },
    country: { type: String,trim:true },
    city: { type: String,trim:true },
    hobby: { type: String,trim:true },
    ethnicity: { type: String,trim:true },
  },
  profileUser: {
    type: Schema.Types.ObjectId,
    ref: "user",
    unique: true,
  },
  createdAt: { type: String, default: new Date().toISOString() },
});

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
