const Purchase = require('../models/purchaceModel');

exports.getPurchasedPDFs = async (req,res) => {
    const {userId} = req.body;
  try {
  
    const purchases = await Purchase.find({ userId })

   
    const pdfIds = purchases.map((purchase) => purchase.pdfId);
    res.status(200).json({
        succes:true,
        data:pdfIds,
        message: "data is fetched"
    })

    return pdfIds;
  } catch (error) {
    console.error('Error getting purchased PDFs:', error);
    throw error;
  }
};

