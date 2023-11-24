import React, { useEffect } from 'react';
import { useCustomContext } from '../context/Context';
import "./userPurchase.css"

const UserPurchasedPdf = () => {
  const customContext = useCustomContext();
  const fetchPurchasePdf = customContext.fetchPurchasePdf;
  const purchasedPdfDetails = customContext.purchasedPdfDetails;

  useEffect(() => {
    const updateUiWithNewPurchase = async () => {
      await fetchPurchasePdf();
      console.log(purchasedPdfDetails, 'purchased pdf details in user purchased pdf');
    };
    updateUiWithNewPurchase();
  }, []);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "Are you sure you want to reload? You will be logged out.";
      event.returnValue = message; // Standard for most browsers
      return message; // For some older browsers
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className='usercon'>
      <div className='dash-con'>
        <div className='user-con'>
          <img src="https://i.pinimg.com/originals/05/5a/91/055a91979264664a1ee12b9453610d82.png" className='user-img' />
          <div className='user-pic'>
            <div className='user-pic'>
             Name : {customContext.user?.name || "user not available"}
            </div>



          </div>
          <div className='user-pic'>
          Email : {customContext.user?.email || "user not available"}


          </div>
        </div>

      </div>

      <h2 className='his-txt'> Purchased PDF History</h2>

      {purchasedPdfDetails.map((pdf, index) => (
        <div key={index} className='pdf-card'>
          <p> PDF Name</p>
          <p>{pdf.name}</p>
          <p> PDF Description</p>
          <p className='pdf-des'>{pdf.description}</p>
          <p>Price: {pdf.price / 100}</p>
          <a href={pdf.url} target="_blank" rel="noopener noreferrer">
            <button className='btn'>View PDF</button>
            <hr />
          </a>

        </div>
      ))}
    </div>
  );
};

export default UserPurchasedPdf;
