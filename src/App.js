import logo from './logo.svg';
import { useState,useEffect } from 'react';
import './App.css';
import { Button, ButtonGroup } from '@chakra-ui/react'
import Authpage from './pages/AuthPage';
import Homepage from './pages/Homepage';
import UserPurchasedPdf from './pages/UserPurchasedPdf';
import PaySucces from './pages/PaySucces';

import Chat from './pages/Chat';



import { Route, Router, Routes, useParams } from 'react-router-dom';

function App() {
  const {userId} = useParams();
  console.log("userid",userId);

  return (
    <div className="App">
    {/* <Button colorScheme='blue'>Button</Button>  */}
    <Routes>

    <Route path='/' element={<Authpage/>} ></Route>
    <Route path="/home" element={<Homepage/>} ></Route>
    <Route path='/chat' element={<Chat/>} ></Route>
   
    <Route path='/userPurchasedPdf' element={<UserPurchasedPdf/>} ></Route>
    <Route path='/PaySucces' element={<PaySucces/>} ></Route>
    </Routes>
    
    </div>
  );
}

export default App;
