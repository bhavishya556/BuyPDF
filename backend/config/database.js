const mongoose = require("mongoose");

require("dotenv").config();

const dbconnect =() =>{
    mongoose.connect(process.env.DATABASE_URL,{
        
        

    })
    .then(()=>{
        console.log("db  connection is successful");
    })
    .catch((er)=>{
        console.log("db  connection is failed",er)
        process.exit(1);

    })
}
module.exports = dbconnect;

