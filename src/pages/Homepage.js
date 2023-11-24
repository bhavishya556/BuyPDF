import React, { useEffect, useState, } from 'react'
import { Image, Text, VStack, Box, Stack, Button, useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import axios from 'axios';
import { useCustomContext } from "../context/Context";
import "./home.css"





const Homepage = () => {

    const customContext = useCustomContext();

    // console.log("in home", user);
    const toast = useToast();



    const [isPdfOpen, setIsPdfOpen] = useState(false);
    const [isPdfOpen2, setIsPdfOpen2] = useState(false);
    const fetchData = customContext.fetchData;
    const fetchPurchasePdf = customContext.fetchPurchasePdf;
    const fetchPdfDetails = customContext.fetchPdfDetails;
    const purchasedPdfIds = customContext.purchasedPdfIds;
    const allPdf = customContext.allPdf;
    // const [userName,setUserName] = useState(customContext.user);
    const navigate = useNavigate();
    // console.log("in home", user);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
          const message = "Are you sure you want to reload? You will be logged out.";
          event.returnValue = message; 
          return message; 
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);
    






    useEffect(() => {

        fetchData();





    }, []);

    // useEffect(() => {


    //     toast({
    //         title: 'logout plaese login',
    //         status: 'warning',
    //         duration: 3000,
    //         isClosable: true,
    //         position: 'bottom',
    //     });






    // }, [user]);







    const key = "rzp_test_Sy31FCpZQSjjKn"

    const checkOutHandler = async (amount, id) => {
        try {

            const { data: { key } } = await axios.get("api/getkey");

            // Create an order on the server
            const { data: { order } } = await axios.post("api/pay", {
                amount
            });

            // pay ment method
            const options = {
                key,
                "amount": (order.amount),
                "currency": "INR",
                "name": "Bhavishya Verma",
                "description": "Test Transaction",
                "image": "https://cdn-share-sprites.flaticon.com/pack/11/11989/11989695-musicians_3x2.jpg",
                "order_id": order.id,
                "handler": async (response) => {
                    try {
                        const verificationResponse = await axios.post("api/paymentverification", {
                            "razorpay_payment_id": response.razorpay_payment_id,
                            "razorpay_order_id": response.razorpay_order_id,
                            "razorpay_signature": response.razorpay_signature,
                            "pdf_id": id,
                            "user_id": customContext.user._id,
                        });

                        if (verificationResponse.data.success) {
                            navigate(`${verificationResponse.data.redirectUrl}`);;
                        } else {
                            // Handle failure
                        }
                    } catch (error) {
                        console.error('Error in checkOutHandler:', error);
                    
                    }
                },
                "prefill": {
                    "name": "Gaurav Kumar",
                    "email": "gaurav.kumar@example.com",
                    "contact": "9000090000"
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };

          

            const razor = new window.Razorpay(options);
            const paymentCallback = async (response) => {
                console.log("call backe is run")
                navigate('/userPurchasedPdf')

            };

            razor.on('payment.success', paymentCallback);
            razor.open();







        }
        catch (error) {
            console.error('Error in checkOutHandler:', error);
        }

    }
    const nav = () => {
        console.log("call backe is run")
        navigate('/userPurchasedPdf')

    };
    const btn1 = () => {
        setIsPdfOpen(!isPdfOpen);
    };

    const btn2 = () => {
        setIsPdfOpen2(!isPdfOpen2);
    };

    return (
        <Box>
            < div className="nav">

                <div className="nav-header">
                    <div className="nav-title">
                        PDF Buying Web Applications

                    </div>
                </div>
                        <Button onClick={() => nav()}>Dashbord</Button>




            </div>

            <Stack direction={["column"]}>

                {isPdfOpen ? (
                    // If PDF is open, display the embedded PDF with close button
                    <div className='open-pdf-box'>
                        <embed src={"https://drive.google.com/uc?id=19dYGPH5yUejISU_udzLr-FwIh2oNasBU"} type="application/pdf" className='open-pdf' />
                        <button onClick={btn1} className='close-btn'>Close PDF</button>
                    </div>
                ) : (
                    // If PDF is not open, display the appropriate button

                    <div className='pdf-box'>
                        <embed src={"https://drive.google.com/uc?id=19dYGPH5yUejISU_udzLr-FwIh2oNasBU"} type="application/pdf" className='pdf' />
                        <div>

                            <h2>Free</h2>



                        </div>
                        <button onClick={btn1} className='btn'>open Now</button>
                    </div>
                )
                }
                {isPdfOpen2 ? (
                    
                    <div className='open-pdf-box'>
                        <embed src={"https://drive.google.com/uc?id=1frpnT__fpp5anmhjO3KFPBOHGj9apfAu"} type="application/pdf" className='open-pdf' />
                        <button onClick={btn2} className='close-btn'>Close PDF</button>
                    </div>
                ) : (
                    

                    <div className='pdf-box'>
                        <embed src={"https://drive.google.com/uc?id=1frpnT__fpp5anmhjO3KFPBOHGj9apfAu"} type="application/pdf" className='pdf' />
                        <div>

                            <h2>Free</h2>



                        </div>
                        <button onClick={btn2} className='btn'>open Now</button>
                    </div>
                )
                }
                {allPdf.map((pdf) => (
                    <Card
                        id={pdf._id}
                        checkOutHandler={checkOutHandler}
                        amount={pdf.price}
                        description={pdf.description}
                        pdfurl={pdf.url}
                        pdfname={pdf.name}
                        user={customContext.user}
                    />
                ))}
            </Stack>



        </Box>
    )
}

export default Homepage;