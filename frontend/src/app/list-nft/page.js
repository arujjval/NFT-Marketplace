import { useContext } from 'react' 
import { getListedNFTs } from '@/context/api'
import { SignerContext } from '@/app/page'

const page = () => {
    const signer = useContext(SignerContext)
    const signer = 
    

    return (
        <div>
            <button onClick={() => getListedNFTs}>button</button>
        </div>
    )
}

export default page