import React from "react";
import { Box, Flex } from "@chakra-ui/react";
export const NavBar = ({ accounts, setAccounts }) => {
  return (
    <div>
      <Flex justify="space-between" align="center" padding="30px">
        <Box>
          <a
            href="https://twitter.com/moonblurgs"
            target="_blank"
            rel="noreferrer"
          >
            <button id="home_button"></button>
          </a>
        </Box>
        <Box>
          <a
            href="https://opensea.io/collection/moonblurgs-wtf"
            target="_blank"
            rel="noreferrer"
          >
            <button id="opensea_button"></button>
          </a>
        </Box>
      </Flex>
    </div>
  );
};
