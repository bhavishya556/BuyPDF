// Import the PdfModel defined in your schema file
const PdfModel = require('../models/pdfModel');


// Create a controller function for handling the creation of PDF entries
const createPdf = async (req, res) => {
  try {
    // Extract data from the request body
    const { name, description, url, price } = req.body;

    // Create a new PdfModel instance
    const newPdf = new PdfModel({
      name,
      description,
      url,
      price,
      // ... other fields
    });

    // Save the new PDF entry to the database
    const savedPdf = await newPdf.save();

    // Respond with the saved PDF entry
    res.status(201).json(savedPdf);
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPDFs = async (req, res) => {
  try {
    // Retrieve all PDF entries from the database
    const pdfs = await PdfModel.find();

    // Respond with the retrieved PDF entries
    res.status(200).json({
      data: pdfs
    });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPdfById = async (req, res) => {
  try {
    // Extract PDF ID from the request body
    const { _id } = req.body;

    // Retrieve the PDF entry from the database by ID
    const pdf = await PdfModel.findById(_id);

    // Check if the PDF entry exists
    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    // Respond with the retrieved PDF entry
    res.status(200).json({
      data: pdf
    });
  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = { createPdf, getPDFs, getPdfById };


