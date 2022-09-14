import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ethers, BigNumber } from "ethers";
import { Box, Flex, Text, Button, Input } from "@chakra-ui/react";
import Hypercard from "./hypercard.json";

const moonblurgsAddress = "0x5F980617746DBA251D6260E6Be0Eab7298377b22";

export const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const [totalSupply, setTotalSupply] = useState(0);

  const isConnected = Boolean(accounts[0]);
  const isSoldOut = Boolean(true);
  async function getTotalSupply() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        moonblurgsAddress,
        Hypercard.abi,
        signer
      );
      try {
        const response = await contract.totalSupply();
        setTotalSupply(response.toNumber());
      } catch (e) {
        toast(e.error.message);
      }
    }
  }
  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        moonblurgsAddress,
        Hypercard.abi,
        signer
      );
      try {
        const response = await contract.publicSaleMint(
          BigNumber.from(mintAmount),
          { value: ethers.utils.parseEther(String(0)) }
        );
        console.log(response);
        toast(
          `Successfully minted ${mintAmount} item${mintAmount > 1 ? "s" : ""}.`
        );
      } catch (e) {
        toast(e.error.message);
      }
    }
  }
  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };
  const handleIncrement = () => {
    if (mintAmount >= 2) return;
    setMintAmount(mintAmount + 1);
  };
  getTotalSupply();
  return (
    <div>
      <Flex justify="center" align="center" height="100vh" marginBottom="250px">
        <Box width="520px">
          <div>
            <Text
              fontSize="35px"
              textShadow="0 5px #0F0F0F"
              fontFamily="inherit"
            >
              HyperCards by Hypercard
            </Text>
            <Text
              fontSize="20px"
              textShadow="0 2px 2px #0F0F0F"
              fontFamily="VT323"
            >
              A collection of 999 HyperCards on the Ethereum Blockchain. Holding
              a HyperCard will grant you access to pre-sale and whitelist spots
              for all our upcoming projects.
            </Text>
          </div>
          {isConnected ? (
            isSoldOut ? (
              <div style={{ marginBottom: "100px" }}>
                <Flex justify="space-evenly" align="center">
                  <Text
                    fontSize="30px"
                    textShadow="0 5px #0F0F0F"
                    fontFamily="VT323"
                  >
                    {totalSupply} / 999 HyperCards Minted
                  </Text>
                </Flex>
                <Flex justify="space-evenly" align="center">
                  <Button
                    onClick={handleDecrement}
                    borderRadius="5px"
                    backgroundColor="#55AEEF"
                    boxShadow="0px 2px 2px 1px #0F0F0F"
                    fontFamily="inherit"
                    color="white"
                    cursor="pointer"
                    margin="0 15px"
                  >
                    -
                  </Button>
                  <Input
                    readOnly
                    fontFamily="inherit"
                    width="40px"
                    height="30px"
                    textAlign="center"
                    paddingLeft="19px"
                    marginTop="10px"
                    type="number"
                    value={mintAmount}
                  />
                  <Button
                    onClick={handleIncrement}
                    borderRadius="5px"
                    backgroundColor="#55AEEF"
                    boxShadow="0px 2px 2px 1px #0F0F0F"
                    fontFamily="inherit"
                    color="white"
                    cursor="pointer"
                    margin="0 15px"
                  >
                    +
                  </Button>
                </Flex>
                <Flex justify="space-evenly" align="center">
                  <Button
                    onClick={handleMint}
                    borderRadius="5px"
                    backgroundColor="#55AEEF"
                    boxShadow="0px 2px 2px 1px #0F0F0F"
                    fontFamily="inherit"
                    color="white"
                    height="30px"
                    cursor="pointer"
                    marginTop="15px"
                  >
                    Mint
                  </Button>
                </Flex>
              </div>
            ) : (
              <Text
                fontSize="30px"
                textShadow="0 2px 2px #0F0F0F"
                fontFamily="VT323"
              >
                HyperCards are all minted out. Grab one on Opensea!
              </Text>
            )
          ) : (
            <div style={{ marginBottom: "100px" }}>
              <Text
                fontSize="30px"
                textShadow="0 2px 2px #0F0F0F"
                fontFamily="VT323"
              >
                You need to connect your wallet, to mint a HyperCard.
              </Text>
            </div>
          )}
          <div className="attribution-block" style={{ fontSize: "5px" }}></div>{" "}
        </Box>
      </Flex>
      <ToastContainer />
    </div>
  );
};
