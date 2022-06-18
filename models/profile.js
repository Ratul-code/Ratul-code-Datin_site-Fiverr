const  {mongoose,Schema}  = require("mongoose");
const profileSchema = new mongoose.Schema({
    bio:{
        type:String,
        maxlength:[60,"Your bio cannot exceed 60 characters"],
    },
    profileUser:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
});

const Profile = mongoose.model("profile",profileSchema); 

module.exports = Profile;