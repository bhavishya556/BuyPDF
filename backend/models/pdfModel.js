const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  name: String,
  description: String,
  url: String,
  price: Number,
  

});



module.exports =  mongoose.model('Pdf', pdfSchema);
