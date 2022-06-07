import { useState } from 'react'
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react'

import { ethers, BigNumber } from 'ethers';
import swapNFT from './SwapNFT.json';

const swapNFTAddress = "0x3e096c5c7C447B48E78c3B7B522eed5f274114D1";

export default function MainMint({ accounts, setAccounts }) {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = accounts[0] ? true : false;

    async function handleMint() {
        if (!window.ethereum) return

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(swapNFTAddress, swapNFT.abi, signer );

        try {
            const response = await contract.mint( BigNumber.from(mintAmount), {
                value: ethers.utils.parseEther((0.02*mintAmount).toString())
            } );
            console.log(response);
        } catch(err) {
            console.log("err:", err)
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount => mintAmount -1);
    };
    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount => mintAmount +1);
    };

    

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
        <Box width="520px">
            <div>
                <Text fontSize="48px" textShadow="0 5px #000"> NFT for swap test use </Text>
                    { isConnected ? (
                        <div> 
                            <div>
                                <Button 
                                    backgroundColor="#D6517D"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px #0F0F0F"
                                    color="#FFF"
                                    cursor="pointer"
                                    fontFamily="inherit"
                                    padding="15px"
                                    margin="0 15px"  
                                    onClick={handleDecrement}
                                > - </Button>
                                <input type="number" value={mintAmount}/>
                                <Button 
                                    backgroundColor="#D6517D"
                                    borderRadius="5px"
                                    boxShadow="0px 2px 2px 1px #0F0F0F"
                                    color="#FFF"
                                    cursor="pointer"
                                    fontFamily="inherit"
                                    padding="15px"
                                    margin="0 15px"  
                                    onClick={handleIncrement}
                                > + </Button>
                            </div>
                            <Button 
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="#FFF"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                margin="0 15px"  
                                onClick={handleMint}
                            > Mint </Button>
                        </div>
                    ) : (
                        <p> you must be connected to mint.</p>
                    )}
            </div>     
        </Box>
    </Flex>
  )
}
