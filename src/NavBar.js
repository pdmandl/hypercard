import React from "react";
import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";
import url from "./assets/music/sound.mp3";
import { Box, Flex, Spacer, Button } from "@chakra-ui/react";
import logo from "./assets/background/hyper.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NavBar = ({ accounts, setAccounts }) => {
  const [playing, setPlaying] = useState(false);
  function disconnect() {
    setPlaying(false);
    setAccounts([]);
  }
  const useAudio = (url) => {
    const [audio] = useState(new Audio(url));

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
      playing ? audio.play() : audio.pause();
    }, [playing]);

    useEffect(() => {
      audio.addEventListener("ended", () => setPlaying(false));
      return () => {
        audio.removeEventListener("ended", () => setPlaying(false));
      };
    }, []);

    return [playing, toggle];
  };
  const isConnected = Boolean(accounts[0]);
  const [playing1, toggle] = useAudio(url);

  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      /**
       * TODO: set chain id to mainnet
       */
      if (accounts && network.chainId === 111) {
        setPlaying(true);
        setAccounts(accounts);
      } else {
        toast(
          //"Wrong network selected! You need to be connected to ethereum mainnet in order to mint."
          "Mint has not started yet. Stay tuned..."
        );
      }
    } else {
      toast("You need a metamask wallet installed to mint.");
    }
  }
  return (
    <div>
      <Flex justify="space-between" align="center" padding="30px">
        <Flex justify="space-around" width="30%" padding="10px 70px">
          <img
            src={logo}
            height="100px"
            className="logo"
            style={{ marginTop: "-30px" }}
          ></img>
          <div
            style={{
              marginRight: "10px",
              marginTop: "30px",
              cursor: "pointer",
              fontSize: "11px",
              className: "text",
            }}
          >
            <a
              href="https://twitter.com/hypercardhero"
              target="_blank"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              Twitter
            </a>
          </div>
          <div
            className="onlyDesktop"
            style={{
              marginLeft: "10px",
              marginTop: "30px",
              fontSize: "11px",
              className: "text",
            }}
          >
            <a
              href="https://opensea.io/collection/hypercards-by-hypercard"
              target="_blank"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              Opensea
            </a>
          </div>
        </Flex>
        <Flex justify="space-around" width="20%">
          <Button
            onClick={toggle}
            borderRadius="5px"
            backgroundColor="#55AEEF"
            boxShadow="0px 2px 2px 1px #0F0F0F"
            fontFamily="inherit"
            color="white"
            height="30px"
            fontSize="11px"
            cursor="pointer"
            marginLeft="15px"
            marginTop="5px"
            className="onlyDesktop"
          >
            {playing1 ? "Sound off" : "Sound on"}
          </Button>
          <div className="marginOnPhone">
            {isConnected ? (
              <Box
                marginLeft="15px"
                marginTop="15px"
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
                fontSize="11px"
                height="30px"
                cursor="pointer"
                marginLeft="15px"
                marginTop="5px"
              >
                Connect
              </Button>
            )}
          </div>
        </Flex>
      </Flex>
      <ToastContainer />
    </div>
  );
};
