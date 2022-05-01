import React from 'react';
import { Box, Button, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import Facebook from "./assets/social-media-icons/facebook_32x32.png"
import Twitter from "./assets/social-media-icons/twitter_32x32.png"
import Email from "./assets/social-media-icons/email_32x32.png" // turn into Discord

const NavBar = ({accounts, setAccounts}) => {
  const isConnected = Boolean(accounts[0]); // This forcefully turn accounts 0, which is the address of a wallet. It detects if we're connected

  async function connectAccount() {
    if (window.ethereum) { // MetaMask injects window.ethereum
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts); // When we call this function, we are updating the accounts in main App
    }
  }
  return (
    <Flex justify="space-between" align="center" padding="30px">
      {/* Left side - social media icons */}
      <Flex justify="space-around" width="40%" padding="0 75px">
        <Link href="https://facebook.com">
          <Image src={Facebook} boxSize="42px" margin="0 15px" />
        </Link>
        <Link href="https://twitter.com">
          <Image src={Twitter} boxSize="42px" margin="0 15px" />
        </Link>
        <Link href="https://protonmail.com">
          <Image src={Email} boxSize="42px" margin="0 15px" />
        </Link>
      </Flex>

      {/* Right side - Connect button & Sections */}
      <Flex justify="space-around" align="center" width="40%" padding="30px">
        <Box margin="0 15px">About</Box>
        <Spacer />
        <Box margin="0 15px">Team</Box>
        <Spacer />
        <Box margin="0 15px">Mint</Box>
        <Spacer />

        {/* Connect button */}
        {isConnected ? (
          <Box margin="0 15px">Connected</Box>
        ) : (
          <Button
            backgroundColor="#D6517D"
            borderRadius="5px"
            boxShadow="0 2px 2px 1px #0F0F0F"
            color="#FFFFFF"
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
};

export default NavBar;
