import React from 'react';

export const Topbar = () => {
    const connectThisWallet = () => {
        
    }

    return (
        <header className="bg-gray-800 text-white p-4 flex justify-between">
            <div className="px-20 h-20 w-screen bg-red-100 flex justify-between items-center text-black">
            <div>
                NFT Marketplace
            </div>
            <div>
                <Button onClick={connectThisWallet}>
                {signer? signer.address.slice(0, 7) + '...' 
                + signer.address.slice(38, 42) : "Connect Wallet"}
                </Button>
            </div>
            </div>
        </header>
    )
}
