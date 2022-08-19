import React from "react";
import { Box, Flex, Spacer, Button } from "@chakra-ui/react";
import logo from "./assets/background/hyper.png";

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
        <img src={logo} height="100px" style={{ marginTop: "-30px" }}></img>
        <div
          style={{
            marginRight: "10px",
            marginTop: "30px",
            cursor: "pointer",
            fontSize: "11px",
          }}
        >
          <a
            href="https://twitter.com/hypercardhero"
            target="_blank"
            style={{ textDecoration: "none", color: "white" }}
          >
            Twitter
          </a>
        </div>
        <div
          style={{ marginLeft: "10px", marginTop: "30px", fontSize: "11px" }}
        >
          Opensea
        </div>
      </Flex>
      <Flex justify="space-around" width="20%">
        {isConnected ? (
          <Box
            marginLeft="15px"
            marginTop="3px"
            cursor="pointer"
            fontSize="11px"
            onClick={disconnect}
          >
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
            marginLeft="15px"
            marginTop="5px"
          >
            Connect
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
