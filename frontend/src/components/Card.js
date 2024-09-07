import { buyNFT, deListNFT } from '@/context/api'
import { formatEther } from 'ethers'
import { SignerContext } from '@/app/page'
import { useContext } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
  

const NftCard = ({ nft }) => {
    const name = nft[0]
    const nftAddress = nft[1]
    const price = BigInt(nft[2])
    const nftId = nft[3]
    const seller = nft[4]

    const { signer } = useContext(SignerContext)

    const buyThisNFT = async () => {
        try {
            await buyNFT(nftId, signer)
            boughtPopup();
        }
        catch (error) {
            console.log(error)
        }
    }

    const deListThisNFT = async () => {
        try {
            await deListNFT(nftId, signer)
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='text-black flex flex-col md:w-80'>
            <Card className='bg-[#ECDFCC]'>
                <CardHeader>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>
                        <div>seller: {seller.slice(0, 5) + '...' +  seller.slice(38, 42)}</div>
                    </CardDescription>
                </CardHeader>
                <CardContent className='flex flex-col gap-5'>
                    <div>Price: <p className='font-bold text-xl'>{formatEther(price)} ether</p></div>
                    <div className='flex flex-row justify-between'>
                        <Button className='bg-blue-500 hover:bg-blue-700 text-white 
                            font-bold py-2 px-4 rounded' onClick={buyThisNFT}>
                            Buy {name}
                        </Button>

                        {signer && signer.address == seller && 
                            <Button className='bg-red-500 hover:bg-red-700 text-white 
                                font-bold py-2 px-4 rounded' onClick={deListThisNFT}>
                                DeList
                            </Button>
                        }  
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default NftCard