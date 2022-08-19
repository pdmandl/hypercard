import React from "react";
import { Box, Flex, Spacer, Button } from "@chakra-ui/react";
export const NavBar = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]);
  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts) setAccounts(accounts);
    }
  }
  function disconnect() {
    setAccounts([]);
  }
  return (
    <Flex justify="space-between" align="center" padding="30px">
      <Flex justify="space-around" width="30%" padding="10px 70px">
        <div style={{ margin: "10px", cursor: "pointer" }}>
          <a
            href="https://twitter.com/hypercardhero"
            target="_blank"
            style={{ textDecoration: "none", color: "white" }}
          >
            Twitter
          </a>
        </div>
        <div style={{ margin: "10px" }}>Opensea</div>
      </Flex>

      <Flex justify="space-around" width="30%" padding="30px 30px 30px 30px">
        {isConnected ? (
          <Box margin="0 15px" cursor="pointer" onClick={disconnect}>
            Connected
          </Box>
        ) : (
          <Button
            onClick={connectAccount}
            borderRadius="5px"
            backgroundColor="#55AEEF"
            boxShadow="0px 2px 2px 1px #0F0F0F"
            fontFamily="inherit"
            color="white"
            height="30px"
            cursor="pointer"
            margin="0 15px"
          >
            Connect
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
