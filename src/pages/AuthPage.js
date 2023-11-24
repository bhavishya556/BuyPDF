import React from 'react'
import { Container, Box, Text, TabPanels, TabList, Tabs, TabPanel, Tab } from '@chakra-ui/react'
import Login from '../components/Authentication/Login'
import SignUp from '../components/Authentication/SignUp'

const authpage = () => {
    return (
        <Container maxW="xl" centerContent mt={"30px"}>
            <Box
                d="flex"
                justifyContent="center"
                p={3}
                bg={"white"}
                w={"100%"}
                borderRadius={"lg"}
                borderWidth={"1px"}>
                <Text
                    fontSize={"4xl"}
                  
                    color={"black"}


                >
                    My PDF Application
                </Text>
                <Box
                    bg={"white"}>
                    <Tabs variant='soft-rounded' >
                        <TabList>
                            <Tab>Login</Tab>
                            <Tab>Sign up</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                               <Login/>
                            </TabPanel>
                            <TabPanel>
                                <SignUp></SignUp>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                </Box>

            </Box>
        </Container>
    )
}

export default authpage