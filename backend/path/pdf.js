// pdf.js
const express = require("express");
const router = express.Router();

const { registerUser,loginUser } = require("../controllers/authUser"); 
const{ createPdf, getPDFs,getPdfById }= require("../controllers/pdfupload"); 
const {payment,paymentVerification,getkey} = require("../controllers/payment"); 
const {getPurchasedPDFs} = require("../controllers/purchasedPDF.");


router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/pay", payment);
router.post("/getPurchasedPDFs", getPurchasedPDFs);
router.post("/getPdfById", getPdfById);

router.post("/upload", createPdf);
router.post("/paymentverification", paymentVerification);
router.get("/getpdfs", getPDFs);
router.get("/getkey", getkey);



module.exports = router;

