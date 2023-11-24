import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import "./paysucess.css"
import { useNavigate } from "react-router-dom";

const PaySucces = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/userPurchasedPdf")

        },2000)

    }, []);


    return (
        <div className='pay-con'>
            <div class="svg-container">
                <svg class="ft-green-tick" xmlns="http://www.w3.org/2000/svg" height="200" width="200" viewBox="0 0 48 48" aria-hidden="true">
                    <circle class="circle" fill="#5bb543" cx="24" cy="24" r="22" />
                    <path class="tick" fill="none" stroke="#FFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M14 27l5.917 4.917L34 17" />
                </svg>
            </div>
            <h3 className='pay-txt'>Payment successful</h3>
        </div>
    );
};

export default PaySucces;
