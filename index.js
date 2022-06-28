require("dotenv").config({ path: "./.env" });
const express			=require('express');
const cors              =require('cors')
const passport			=require('passport');
const multer			=require('multer');
const connectDB         =require("./config/db");
const PORT              =process.env.PORT || 8000;
const app               =express();

// Local Imports





// Database
connectDB();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/images', express.static('uploads'))




// Passport.js
app.use(passport.initialize());
require("./config/passport")(passport)




app.get("/",(req,res)=>{
	res.send("<h1>dating</h1>")
});
app.get("/:filename",(req,res,next)=>{
    res.json(req.params);
})
// Routes
app.use("/auth", require("./routes/auth"));
app.use("/user", require("./routes/user"));
app.use("/subs", require("./routes/subs"));


// error handler should be in last
app.use(require("./middlewares/errorHandler"));


// listening
app.listen(PORT,()=>{
    console.log(`Server started at: http://localhost:${PORT}`)
})