import React, { useEffect } from 'react'
import { Box, Button, Flex, Link, Spacer } from '@chakra-ui/react'
// import Facebook from "./assets/social-media-icons/facebook_32x32.png";

/**
 * @TODO switch account function and logout
 */
export default function NavBar({ accounts, setAccounts }) {
    const isConnected = accounts[0] ? true : false;

    const connectAccount = async() => {
        if (!window.ethereum) return
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts"})
        setAccounts(accounts);
    }  


    return (
        <Flex justify="space-between" align="center" padding="30px">
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="http://www.facebook.com">
                    Facebook
                </Link>
                <Link href="https://discord.com/">
                    Discord
                </Link>
            </Flex>

            <Flex justify="space-around" align="center" width="40%" padding="30px">
                <Box margin="0 15px"> About </Box>
                <Spacer />
                <Box margin="0 15px"> Mint </Box>
                <Spacer />
                <Box margin="0 15px"> Team </Box>

            {isConnected ? (
                <Box margin="0 15px"> Connected </Box>
            ) : (
                <Button 
                    backgroundColor="#D6517D"
                    borderRadius="5px"
                    boxShadow="0px 2px 2px 1px #0F0F0F"
                    color="#FFF"
                    cursor="pointer"
                    fontFamily="inherit"
                    padding="15px"
                    margin="0 15px"    
                    onClick={connectAccount}
                > 
                    Connect 
                </Button>
            )}
            </Flex>

        </Flex>
    )
}
