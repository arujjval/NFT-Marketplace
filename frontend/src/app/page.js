"use client"

import { useState, useEffect, createContext } from  "react"
import { ethers, Contract, parseEther } from "ethers"
import { buyNFT, getListedNFTs } from "../context/api"
import { abi, address } from "@/context/contract"
import { Button } from "antd"
import Topbar from "@/components/Topbar"
import ListNFTs from "@/components/ListNFTs"

export const SignerContext = createContext()

export default function Home() {
  const [signer, setSigner] = useState(null)

  const connectWallet = async () => {
    if(window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = provider.getSigner()

      setSigner(signer)    
    }
    else {
      console.log("Install Metamask")
    }
  }

  return (
    <SignerContext.Provider value={signer}>
      <div>
        <div className="px-20 h-20 w-screen bg-red-100 flex justify-between items-center text-black">
          <div>
            NFT Marketplace
          </div>
          <div>
            <Button>Connect Wallet</Button>
          </div>
        </div>
        <div>
          <ListNFTs />
        </div>
      </div>
    </SignerContext.Provider>
    
  );
}
