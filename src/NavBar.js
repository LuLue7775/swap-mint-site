import React, { useEffect } from 'react'
import { Box, Button, Flex, Link, Spacer } from '@chakra-ui/react'
// import Facebook from "./assets/social-media-icons/facebook_32x32.png";

import { useAccount, useConnect, useNetwork, chain } from 'wagmi'

/**
 * @TODO switch account function and logout
 */
export default function NavBar({ switchNetReq, setSwitchNet }) {
    const { connect, connectors } = useConnect();
    const { data: account } = useAccount();

    const connectAccount = async() => { 
        if ( account ) return;
        connect(connectors[0]); 
    }  
    
    const { activeChain, switchNetwork } = useNetwork({
        chainId: chain.rinkeby.id,
    });
    useEffect(() => {
        if (activeChain && activeChain.id !== chain.rinkeby.id) {
          setSwitchNet(true)
          switchNetwork && switchNetwork();

        } else {
          setSwitchNet(false)
        }
      }, [activeChain, switchNetwork] )


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

            { account ? (
                switchNetReq ? (<Box margin="0 15px"> pls switch net </Box>) : (<Box margin="0 15px"> CONNECTED </Box>)
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
