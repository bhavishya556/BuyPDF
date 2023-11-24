import { useState, useEffect } from 'react';
import { Input, VStack, FormControl, FormLabel, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCustomContext } from '../../context/Context';

const Login = () => {
  const customContext = useCustomContext();


  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  




  

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: 'Please enter both email and password',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const body = {
        email,
        password,
      };
      
      
      const  data  = await axios.post('/api/login', body, config);
     
      customContext.setUserDetails(data.data);
      
      
      console.log(customContext,"custom");
      console.log("user data in login",data);

      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
      navigate('/home');
    } catch (error) {
      console.error(error);

      toast({
        title: 'Login failed',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  return (
    <VStack>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input placeholder="Enter your email" onChange={(event) => setEmail(event.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          placeholder="Enter your password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </FormControl>
      <Button colorScheme="blue" width="100%" margin="20px" onClick={handleLogin}>
        Login
      </Button>
    </VStack>
  );
};

export default Login;
