import { useState, useEffect } from 'react'
import { Box, Button, Flex, Input, Spacer, Text } from '@chakra-ui/react'

import { ethers, BigNumber } from 'ethers';
import { contractABI, contractAddress } from './swapNFT-contract';

import {
    useAccount,
    useContractRead,
    useContractWrite,
    chain
} from 'wagmi'

export default function MainMint({ switchNetReq }) {
    
    const [mintAmount, setMintAmount] = useState(1);
    const [contractTotalSupply, setContractTotalSupply] = useState();
    const [contractBalanceOf, setContractBalanceOf] = useState();
    const { data: account } = useAccount();

    const { data: balanceOf, isBalanceOfError, isBalanceOfLoading }  = useContractRead(
        {
          addressOrName: contractAddress,
          contractInterface: contractABI,
        },
        'balanceOf',
        {
            args: '0xa6A53158A0A30AA8C3Dbf71E5234bA058b2458B6',
        },
        { watch: true },
      )
    
      const { data: totalSupply, isTotalSupplyError, isTotalSupplyLoading } = useContractRead(
        {
          addressOrName: contractAddress,
          contractInterface: contractABI,
        },
        'totalSupply',
        { watch: true },
      )


    const { data: mintData, isError: mintError, isLoading: isMintLoading, write: mint } = useContractWrite(
        {
          addressOrName: contractAddress,
          contractInterface: contractABI,
        },
        'mint'
      )
      const handleMint = () => { mint() }

      useEffect(() => {
        setContractBalanceOf( ethers.utils.formatEther((balanceOf).toString()) )        
      }, [balanceOf])

      useEffect(() => {
        setContractTotalSupply(ethers.utils.formatEther((totalSupply).toString()))
      }, [totalSupply])

    // async function handleMint() {
    //     if (!window.ethereum) return

    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const signer = provider.getSigner();
    //     const contract = new ethers.Contract(contractAddress, contractABI.abi, signer );

    //     try {
    //         const response = await contract.mint( BigNumber.from(mintAmount), {
    //             value: ethers.utils.parseEther((0.02*mintAmount).toString())
    //         } );
    //         console.log(response);
    //     } catch(err) {
    //         console.log("err:", err)
    //     }
    // }

    // const handleDecrement = () => {
    //     if (mintAmount <= 1) return;
    //     setMintAmount(mintAmount => mintAmount -1);
    // };
    // const handleIncrement = () => {
    //     if (mintAmount >= 3) return;
    //     setMintAmount(mintAmount => mintAmount +1);
    // };

    

  return (
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
        <Box width="520px">
            <div>
                <Text fontSize="48px" textShadow="0 5px #000"> Demo NFT for swapNFT app </Text>
                    { !switchNetReq && account ? (
                        <div> 
                            <div>
                                {/* <Button 
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
                                <input type="number" value={mintAmount} readOnly/>
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
                                > + </Button> */}

                                <Text> Total Supply: {contractTotalSupply} ETH </Text>
                                <Spacer/>
                                <Text> Balance of your wallet: {contractBalanceOf} ETH </Text>
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
