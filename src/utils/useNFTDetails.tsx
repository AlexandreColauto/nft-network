import { useMoralis } from 'react-moralis'
import NFTAbi1155 from './ERC1155ABI.json'
import NFTAbi721 from './ERC721ABI.json'
import axios from 'axios'
import useFetchTokenTransaction from './useFetchTokenTransaction'

interface props {
  address: string
  id: number
  name: string
  owner_of: string
  contract_type: string
}

interface token_metadata {
  image: string
  itemName: string
  collectionName: string
  token_address: string
  token_id: number
  owner_of: string
}

interface transactions {
  token_address: string
  token_id: string
  from_address?: string | undefined
  to_address: string
  value?: string | undefined
  amount?: string | undefined
  contract_type: string
  block_number: string
  block_timestamp: string
  block_hash: string
  transaction_hash: string
  transaction_type?: string | undefined
  transaction_index?: string | undefined
  log_index: number
  operator?: string | undefined
}

function useNFTDetails() {
  const { Moralis, web3 } = useMoralis()
  const getTransactionInfo = useFetchTokenTransaction()

  const fetchMetadata = async (
    token: props
  ): Promise<[token_metadata, transactions[]] | []> => {
    const { address, id, contract_type } = token
    const ethers = Moralis.web3Library
    if (!web3) return []
    let URI
    if (contract_type === 'ERC1155') {
      const nftContract = new ethers.Contract(address, NFTAbi1155, web3)
      const uri = await nftContract.uri(id)
      console.log(uri)
      URI = uri
    }
    if (contract_type === 'ERC721') {
      const _nftContract = new ethers.Contract(address, NFTAbi721, web3)
      const _uri = await _nftContract.tokenURI(id)
      console.log(_uri)
      URI = _uri
    }
    const token_metadata = await getURIInfo(URI, token)
    const transactions = await getTransactionInfo(address, id.toString())
    console.log(token_metadata)
    console.log(transactions)
    if (!transactions || !token_metadata) return []
    return [token_metadata, transactions]
  }

  const getURIInfo = async (URI: string, token: props) => {
    try {
      const metadata = await axios.get(URI)
      if (!metadata.data.image || !metadata.data.name)
        throw new Error('could not find the metada')
      const _nft = {
        image: metadata.data.image,
        itemName: metadata.data.name,
        collectionName: token.name,
        token_address: token.address,
        token_id: token.id,
        owner_of: token.owner_of
      }
      return _nft
    } catch (e) {
      console.log(e)
      const _nft = {
        image: '/IMAGEMNDISPONIVEL.png',
        itemName: 'No Name Avaliable',
        collectionName: token.name,
        token_address: token.address,
        token_id: token.id,
        owner_of: token.owner_of
      }
      return _nft
    }
  }

  return fetchMetadata
}
export type { token_metadata, transactions }

export default useNFTDetails
