'use client'

import { useState } from 'react' 
import { listNFT } from '@/context/api'
import { connectWallet } from '@/context/api'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

const page = () => {
    const [signer, setSigner] = useState(null)
    const router = useRouter()

    const connect = async () => {
        const signer = await connectWallet()
        setSigner(signer)
        console.log(signer)
    }

    const [name, setName] = useState('')
    const [address, setAddress] = useState(null)
    const [price, setPrice] = useState(0)


    const listThisNFT = async () => {
        try {
            await listNFT(name, address, price, signer)
            router.push('/')
        }
        catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className='w-screen flex flex-col items-center'>
            <div className='md:w-[1200px] flex flex-col gap-5 justify-center items-center py-20 px-10'>
                <div className='flex flex-col gap-4 p-5 border rounded-md'>
                    <h1 className='font-bold text-xl'>Requirements for the NFT to be deployed</h1>
                    <div className='flex flex-col gap-2'>
                        <div>
                            NFT contract should be a valid NFT minting contract, which should be extending an ERC20
                            or ERC721 contract.
                        </div>
                        <div>
                            The Contract should have a mint function with an address parameter, which should be able to mint the NFTs
                            and transfer to the address. Here's an example of the mint function:<br/>
                            <div className='bg-yellow-100 font-semibold inline-block'>'function mint(address _to) external payable;'</div>
                        </div>
                        <div>
                            It is advisable to not have additional payment requirements in the mint function. You can
                            set price here at the marketplace. 
                            The ETH from the buyer will be transferred to the seller's address automatically.
                        </div>
                        <div className='flex flex-col items-center gap-2 pt-5'>
                            Connect your wallet to continue.
                            
                            <Button onClick={connect} className='w-32'>
                                {signer? signer.address.slice(0, 7) + '...' 
                                + signer.address.slice(38, 42) : "Connect Wallet"}
                            </Button>
                        </div>
                    </div>
                </div>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>List NFT</CardTitle>
                        <CardDescription>Fill out the required details carefully about your NFT.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                            <Input id="name" placeholder="Name of the NFT" autoComplete='off' onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                            <Input id="name" placeholder="Address of the NFT" autoComplete='off' onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                            <Input id="name" placeholder="Price to be set (in wei)" autoComplete='off' onChange={(e) => setPrice(e.target.value)}/>
                            </div>
                        </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button onClick={listThisNFT}>List NFT</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
        
    )
}

export default page