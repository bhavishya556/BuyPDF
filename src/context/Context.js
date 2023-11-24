import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { Input, VStack, FormControl, FormLabel, Button, useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
const CustomContext = createContext(null);

export const useCustomContext = () => useContext(CustomContext);

export const CustomContextProvider = (props) => {
  const [user, setUserDetails] = useState();
  const [purchasedPdfIds, setPurchasedPdfIds] = useState([]);
  const [purchasedPdfDetails, setPurchasedPdfDetails] = useState([]);
  const [allPdf, setAllPdf] = useState([]);
  const num = 10;
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {

       
           

      
      toast({
        title: 'you are not logout please login again',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      alert("you have logout plaese login again");
      navigate("../");
    } else {
      const fetchDataAndPurchase = async () => {
        await fetchPurchasePdf();
      };
      fetchDataAndPurchase();
    }
  }, [user]);

  console.log("user data in context", user);

  useEffect(() => {
    console.log("only id", purchasedPdfIds);
  }, [purchasedPdfIds]);

  useEffect(() => {
    console.log("det", purchasedPdfDetails);
  }, [purchasedPdfDetails]);

  const fetchData = async () => {
    try {
      const response = await axios.get('api/getpdfs');
      setAllPdf(response.data.data);
    } catch (error) {
      console.error('Error fetching PDF data:', error);
    }
  };

  const fetchPurchasePdf = async () => {
    console.log(user?._id, "user id in function");

    try {
      const purchasePdf = await axios.post('api/getPurchasedPDFs', {
        userId: user?._id,
      });
      console.log(purchasePdf, "id in function");

      const details = [];
      for (const id of purchasePdf.data.data) {
        console.log('Fetching details for ID:', id);
        const pdfDetails = await axios.post('api/getPdfById', {
          _id: id,
        });
        console.log('Details received for ID', id, ':', pdfDetails.data.data);
        details.push(pdfDetails.data.data);
      }
      console.log('All details fetched:', details);

      setPurchasedPdfIds(purchasePdf.data.data);
      setPurchasedPdfDetails(details);
    } catch (error) {
      console.error('Error fetching purchased PDF data:', error);
    }
  };

  return (
    <CustomContext.Provider value={{ num, user, fetchPurchasePdf, fetchData, allPdf, setUserDetails,purchasedPdfDetails }}>
      {props.children}
    </CustomContext.Provider>
  );
};
