import React, { useState } from 'react';

import { useCustomContext } from '../context/Context';

import "../components/card.css"

const Card = ({ amount, pdfurl, checkOutHandler, id, description, pdfname }) => {
    const customContext = useCustomContext();
    const purchasedPdfDetails = customContext.purchasedPdfDetails;

    // Check if the current card's id is in the purchasedPdfDetails array
    const isPdfPurchased = purchasedPdfDetails.some(pdf => pdf._id === id);

    const [isPdfOpen, setIsPdfOpen] = useState(false);

    const openPdf = () => {
        setIsPdfOpen(true);
    };

    const closePdf = () => {
        setIsPdfOpen(false);
    };

    return (
        <div className='card-con'>
            <div className=''>
                {isPdfOpen ? (
                 
                    <div className='open-pdf-box'>
                        <embed src={pdfurl} type="application/pdf" className='open-pdf' />
                        <button onClick={closePdf} className='close-btn'>Close PDF</button>
                    </div>
                ) : (
                  
                    isPdfPurchased ? (
                        <div className='pdf-box'>
                           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIWJlfRX_DqT3EWuESyNUo63EQUabc783qoxa3RGYMeOnm49kNVXR-emGJbFGwXbg4Cfo&usqp=CAU" className='pdf' />
                            <div>
                                <p>Title : {pdfname}</p>
                                <h2>Description</h2>
                                <p>{description}</p>

                            </div>

                            <button onClick={openPdf} className='btn'>Open Now</button>
                        </div>
                    ) : (
                        <div className='pdf-box'>
                            <img src="https://images.ctfassets.net/lzny33ho1g45/create-pdf-p-img/86d457f1b603cb90f72772c064cda867/Group_9898.png?w=1520&fm=jpg&q=30&fit=thumb&h=760" className='pdf' />
                            <div>


                                <div className='card-des'>
                                    <p>Title : {pdfname}</p>
                                    <h2>Description</h2>
                                    <p>{description}</p>

                                </div>


                            </div>
                            <h2>Price</h2>


                            <h3 className='card-amt'>{amount / 100}</h3>
                            <button onClick={() => checkOutHandler(amount, id)} className='btn'>Buy Now</button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Card;
