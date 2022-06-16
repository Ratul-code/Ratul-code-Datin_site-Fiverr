require("dotenv").config({ path: "./.env" });
const express			=require('express');
const cors              =require('cors')
const passport			=require('passport');
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




// Passport.js
app.use(passport.initialize());
require("./config/passport")(passport)


// Routes
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/user"));
app.use("/subs", require("./routes/subs"));


// error handler should be in last
app.use(require("./middlewares/errorHandler"));

app.get("/",(req,res)=>{
	res.send("<h1>Hi there Hello</h1>")
});

// listening
app.listen(PORT,()=>{
    console.log(`Server running at: http://localhost:${PORT}`)
})