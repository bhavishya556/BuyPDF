require("dotenv").config();
const notFound =(req,res,next)=>{
    const error = new Error (`not found ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// const errorHandler =(error,req,res,next)=>{
//    const statusCode = res.statusCode ===200?500:res.statusCode;
//    res.status(statusCode);;
//    res.json({error:error.message,
// stack: process.env.NODE_ENV !== 'production' ?null :error.stack,
// });
// };



// module.exports ={ notFound,errorHandler};