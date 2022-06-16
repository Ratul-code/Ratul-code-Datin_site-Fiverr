const mongoose = require("mongoose");
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    // useCreateIndex : true,
    useUnifiedTopology: true,
    // useFindAndModify : true,
  });
  console.log("mongodb connect");
};
module.exports = connectDB;