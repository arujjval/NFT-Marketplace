import React, { useState } from 'react'
import { getListedNFTs } from '@/context/api'

const ListNFTs = () => {
    const [NFTs, setNFTs] = useState(null)

    const getNFTs = async () => {
        try {
            const NFTs = await getListedNFTs();
            setNFTs(NFTs)
        } catch (error) {
            console.log(error)
        }   
    }

    return (
    <div>
        
    </div>
    )
}

export default ListNFTs