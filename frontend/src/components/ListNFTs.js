import React, { useState, useEffect } from 'react'
import { getListedNFTs } from '@/context/api'
import Card from './Card'

const ListNFTs = () => {
    const [NFTs, setNFTs] = useState(null)

    const getNFTs = async () => {
        try {
            const NFTs = await getListedNFTs();
            setNFTs(NFTs)
            console.log(NFTs)
        } catch (error) {
            console.log(error)
        }   
    }

    useEffect(() => {
        getNFTs()
    }, [])

    return (
    <div className='md:w-[1200px] flex flex-col gap-10 py-10 px-10'>
        <div className='w-full font-bold text-4xl text-left'>Listed NFTs</div>
        {NFTs && NFTs.map((nft, index) => (
            nft[5] && <Card key={index} nft={nft} />
        ))}
    </div>
    )
}

export default ListNFTs