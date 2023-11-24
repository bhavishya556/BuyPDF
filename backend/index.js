const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');


require("dotenv").config();
// const { notFound, errorHandler} = require("./middelware/errormiddelware");

const Razorpay = require("razorpay");

exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });


const PORT = process.env.PORT || 4000;

//middleare to parse json request
app.use(express.json());

//impot routes for api
// const todoRoutes = require("./path/todos")
const pdfRoutes = require("./path/pdf")

//mount the todo api routes
// app.use("/api/v1",todoRoutes)
app.use("/api",pdfRoutes)

//error handlaing
// app.use(notFound);
// app.use(errorHandler);
app.use(cors());


//start server


app.listen(PORT,()=>{
    console.log(` app is running ${PORT}`)

});

//conect to db
const dbconnect = require("./config/database");
dbconnect();

//defoulroute

app.get("/api/getkey",(req,res)=>{
  
    res.send(`<h2>this is homepage</h2>`)

})

//deployment config

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, "../frontend/build")));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "../frontend/build/index.html"));
    });
} else {
    // Define a route for the homepage
    app.get("/", (req, res) => {
        res.send("<h2>this is homepage</h2>");
    });
}



//deployment config

