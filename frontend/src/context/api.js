import { abi, address } from './contract';
import { ethers, Contract } from 'ethers';

const url = "https://sepolia.infura.io/v3/17a9750b036a4aa7924d123e0deeabd0"

export const connectWallet = async () => {
    if(window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = await provider.getSigner()
        return signer
    }
    else {
        console.log("Install Metamask")
    }
}

export const getNFT = async (id) => {
        const provider = new ethers.JsonRpcProvider(url)
        const contract = new Contract(address, abi, provider)
        const nft = await contract.getNFT(id)
        return nft
}

export const buyNFT = async (id, signer) => {
    try{
        console.log(signer)
        const contract = new Contract(address, abi, signer)
        const nft = await getNFT(id);
        const price = BigInt(nft.price)
        const listingPrice = BigInt(20000000000000000)
        const totalPrice = price + listingPrice;
        console.log("price: " + price + " listingPrice: " + listingPrice + " totalPrice: " + totalPrice)
        const tx = await contract.buyNFT(id, { value: totalPrice });
        await tx.wait();
        console.log("NFT " + id + " bought by address: " + account)
    }
    catch (error) {
        console.log(error)
    }
}

export const listNFT = async (name, NFTaddress, price, signer) => {
    try{
        const contract = new Contract(address, abi, signer)
        const tx = await contract.listItem(name, NFTaddress, price);
        await tx.wait();
        console.log("NFT " + name + " address: " + address + 
            " has been listed with price: " + price) 
    }
    catch (error) {
        console.log(error)
    }
}

export const deListNFT = async (id, signer) => {
    try{
        const contract = new Contract(address, abi, signer)
        const tx = await contract.deListNFT(id);
        await tx.wait();
        console.log("NFT id: " + id + " has been de-listed") 
    }
    catch (error) {
        console.log(error)
    }
}

export const getListedNFTs = async () => {
    try {
        const provider = new ethers.JsonRpcProvider(url)
        const contract = new Contract(address, abi, provider)
        const nfts = await contract.getListedNFTs()
        console.log(nfts)
        return nfts
    } catch (error) {
        console.log(error)
    } 
}

