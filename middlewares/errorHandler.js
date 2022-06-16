const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err,req,res,next)=>{
    let error = {...err}
    error.message = err.message

    if(err.code==11000){
        const message = `An account with this email already exists`;
        error = new ErrorResponse(message,400)
    }
    if(err.name ===`ValidationError`){
        const message = Object.values(err.errors).map(values=>{
            values.message
        });
        error = new ErrorResponse(message,400)
    }

    res.status(error.statusCode).json({
        success:false,
        error:error.message || "Server Error"
    })
}

module.exports = errorHandler;