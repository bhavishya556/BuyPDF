import { useState, React } from 'react';
import { Input, Toast } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import axios from 'axios';

import { VStack, StackDivider, Box, FormControl, FormLabel, Button } from '@chakra-ui/react';

const SignUp = () => {
    const toast = useToast();
    const [name, setName] = useState('');
    const [pic, setPic] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitHandler = async () => {
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: 'Please enter all required fields',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            });
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast({
                title: 'Invalid email format',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            });
            return;
        }

        if (password.length < 6) {
            toast({
                title: 'Password should be at least 6 characters',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: 'Passwords do not match',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            });
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    pic: pic
                })
            }

            const { data } = await axios.post("/api/", { name, email, password }, config);
            console.log(data);

            toast({
                title: 'Registration successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            });

        } catch (error) {
            toast({
                title: 'Registration failed',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            });

        }
    }

    return (
        <VStack>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder="Enter your name"
                    onChange={(event) => setName(event.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder="Enter your email"
                    onChange={(event) => setEmail(event.target.value)}
                />
            </FormControl>
            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                    placeholder="Enter your Password"
                    onChange={(event) => setPassword(event.target.value)}
                    type='password'
                />
            </FormControl>
            <FormControl>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                    placeholder="Enter your Confirm Password"
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    type='password'
                />
            </FormControl>

            <Button
                colorScheme="blue"
                width="100%"
                margin="20px"
                onClick={submitHandler}
            >
                Sign Up
            </Button>
        </VStack>
    );
}

export default SignUp;
