"use client"

import { useState, createContext } from  "react"
import { ethers } from "ethers"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

import ListNFTs from "@/components/ListNFTs"

export const SignerContext = createContext()

export default function Home() {
  const [signer, setSigner] = useState(null)
  const router = useRouter()

  const connectWallet = async () => {
    if(window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      await provider.send("eth_requestAccounts", [])
      const signer = await provider.getSigner()
      setSigner(signer) 
    }
    else {
      console.log("Install Metamask")
    }
  }

  return (
    <SignerContext.Provider value={{ signer }}>
      <div className="w-screen h-screen bg-[#0C0C0C] text-[#ECDFCC]">
        <div className="px-20 py-10 w-screen bg-[#3C3D37] flex justify-between items-center text-[#ECDFCC]">
          <div className="font-semibold text-4xl">
            The NFT Marketplace
          </div>
          <div className="flex flex-row justify-between items-center gap-4">
            <Button onClick={() => router.push('/list-nft')}>
              List your NFT
            </Button>
            <Button onClick={connectWallet}>
              {signer? signer.address.slice(0, 7) + '...' 
              + signer.address.slice(38, 42) : "Connect Wallet"}
            </Button>
          </div>
        </div>
        <div className="w-screen flex flex-col items-center">
          <ListNFTs />
        </div>
      </div>
    </SignerContext.Provider>
    
  );
}
