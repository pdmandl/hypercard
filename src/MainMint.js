import { useState, useEffect } from "react";
import { ethers, BigNumber } from "ethers";

import moonblurgs from "./moonblurgs.json";
import { Flex } from "@chakra-ui/react";

const moonblurgsAddress = "0x5e550f60Bc59a225540d40D550860c11ec552902";

export const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const [totalSupply, setTotalSupply] = useState(0);

  const isConnected = Boolean(accounts[0]);
  const isSoldOut = Boolean(totalSupply < 7833);
  async function connectAccount() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts) setAccounts(accounts);
    }
  }
  async function getTotalSupply() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        moonblurgsAddress,
        moonblurgs.abi,
        signer
      );
      try {
        const response = await contract.totalSupply();
        setTotalSupply(response.toNumber());
      } catch (e) {
        console.log("error: ", e);
      }
    }
  }
  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        moonblurgsAddress,
        moonblurgs.abi,
        signer
      );
      try {
        const response = await contract.publicSaleMint(
          BigNumber.from(mintAmount),
          { value: ethers.utils.parseEther(String(0)) }
        );
        console.log("response: ", response);
      } catch (e) {
        console.log("error: ", e);
      }
    }
  }
  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };
  const handleIncrement = () => {
    if (mintAmount >= 20) return;
    setMintAmount(mintAmount + 1);
  };
  getTotalSupply();
  return (
    <div>
      {isConnected ? (
        isSoldOut ? (
          <div>
            <Flex justify="space-evenly" align="center">
              <b>{totalSupply} SAVENED</b>
            </Flex>
            <Flex justify="space-evenly" align="center">
              <button onClick={handleDecrement} id="minus_button"></button>
              <b id="amount_input">{mintAmount}</b>
              <button onClick={handleIncrement} id="plus_button"></button>
            </Flex>
            <button onClick={handleMint} id="mint_button"></button>
          </div>
        ) : (
          <button id="sold_button"></button>
        )
      ) : (
        <div>
          <button onClick={connectAccount} id="connect_button"></button>
        </div>
      )}
    </div>
  );
};
