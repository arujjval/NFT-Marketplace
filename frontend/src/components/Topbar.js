import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Topbar = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [connectWallet, setConnectWallet] = useState('');

    return (
    <header className="bg-gray-800 text-white p-4 flex justify-between">
        <div className="text-xl font-bold">NFT Marketplace</div>
        <div>
        {isConnected ? (
            <p className="text-green-500">Connected address: {address}</p>
        ) : (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={connectWallet}>
                Connect Wallet
            </button>   

        )}
        </div>
    </header>
  )
}

export default Topbar