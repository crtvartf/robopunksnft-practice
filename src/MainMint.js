import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import RoboPunksNFT from './RoboPunksNFT.json';

const RoboPunksNFTAddress = "0x64A067594C411619A9E4095E1750ae451994eEd9" // Address of a contract we deployed on rinkeby testnet

const MainMint = ({accounts, setAccounts}) => {
  const [mintAmount, setMintAmount] = useState(1); // Here user states the amount of NFTs he wants to mint
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum); // Initial setup for ethers to connect to ethereum blockchain
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        RoboPunksNFTAddress, // Passing address of the contract
        RoboPunksNFT.abi, // Passing ABI from our RoboPunksNFT.json
        signer // Address that is minting NFTs
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.001 * mintAmount).toString()),
        }); // Here we call the mint function from our smart contract and using BigNumber because of solidity
        console.log("Response", response);
      } catch(err) {
        console.log("Error", err);
      }
    }
  };

  // Function to check if we don't go below 1 in mint amount
  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  // Function to check if we don't go above 3 in mint amount
  const handleIncrement = () => {
    if (mintAmount >= 3) return;
    setMintAmount(mintAmount + 1);
  };

  return(
    <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
      <Box width="520px">
        <div>
          <Text fontSize="48px" textShadow="0 5px #000000">RoboPunks</Text>
          <Text fontSize="48px" letterSpacing="-5.5%" fontFamily="VT323" textShadow="0 2px 2px #000000">Mint RoboPunks NFT for shits and giggles</Text>
        </div>
        {isConnected ? (
          <div>
            <Flex justify="center" align="center">
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0 2px 2px 1px #0F0F0F"
                color="#FFFFFF"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleDecrement}
              >-</Button>
              <Input
                readOnly
                fontFamily="inherit"
                width="100px"
                height="40px"
                textAlign="center"
                paddingLeft="19px"
                marginTop="10px"
                type="number"
                value={mintAmount}
              />
              <Button
                backgroundColor="#D6517D"
                borderRadius="5px"
                boxShadow="0 2px 2px 1px #0F0F0F"
                color="#FFFFFF"
                cursor="pointer"
                fontFamily="inherit"
                padding="15px"
                marginTop="10px"
                onClick={handleIncrement}>+
              </Button>
            </Flex>
            <Button
              backgroundColor="#D6517D"
              borderRadius="5px"
              boxShadow="0 2px 2px 1px #0F0F0F"
              color="#FFFFFF"
              cursor="pointer"
              fontFamily="inherit"
              padding="15px"
              marginTop="10px"
              onClick={handleMint}>MINT NOW</Button>
          </div>
        ) : (
          <Text
            marginTop="70px"
            fontSize="30px"
            letterSpacing="-5.5%"
            fontFamily="VT323"
            textShadow="0 3px #000000"
            color="#D6517D">You must be connected to mint
          </Text>
        )}
      </Box>
    </Flex>
  );
}

export default MainMint;
