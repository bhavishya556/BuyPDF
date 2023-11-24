const {instance} = require("../index");
const User = require('../models/userModel');
const Purchase = require('../models/purchaceModel');
const crypto = require("crypto");

require("dotenv").config();
exports.payment = async (req, res) => {
    try {
      const options = {
        amount: Number(req.body.amount),
        currency: "INR",
      };
  
      console.log("Creating order with options:", options);
  
      const order = await instance.orders.create(options);
      console.log("Order created:", order);
  
      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      console.error("Error creating order:", error);
  
      if (error.response) {
       
        console.error("Razorpay API Error:", error.response.data);
      } else if (error.request) {
        
        console.error("No response received from Razorpay API");
      } else {
        
        console.error("Error setting up Razorpay API request:", error.message);
      }
  
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
  };
  exports.paymentVerification = async (req, res) => {
    try {
      const { user_id, pdf_id, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
      const body = razorpay_order_id + "|" + razorpay_payment_id;
  
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");
  
      const isAuthentic = expectedSignature === razorpay_signature;
  
      if (isAuthentic) {
      
        const purchase = await Purchase.create({
          userId: user_id,
          pdfId: pdf_id,
        });
  
        console.log('Purchase added successfully:', purchase);
  
        res.status(200).json({
          success: true,
          redirectUrl: `/userPurchasedPdf`,
        });
      } else {
        res.status(400).json({
          success: false,
        });
      }
    } catch (error) {
      
      console.error('Error adding purchase:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  
  
  exports.getkey = async (req, res) => {
    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY,
    })
  

  }
  


  
  