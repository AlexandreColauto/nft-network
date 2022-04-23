import { useMoralisWeb3Api, useMoralis } from 'react-moralis'
import axios from 'axios'

function useFetchMeta() {
  const Web3Api = useMoralisWeb3Api()
  const { Moralis } = useMoralis()

  const fetchTokenMetadata = async (
    address: string,
    offset: number,
    chainId: string
  ) => {
    console.log(address + offset + chainId)
    if (!address || !chainId) return
    const tokenMetadata = await Web3Api.account.getNFTs({
      chain: chainId as any,
      address: address,
      limit: 500,
      offset: offset * 500
    })
    console.log(tokenMetadata.result)
    if (tokenMetadata.result?.length) {
      const nftList = await Promise.all(
        tokenMetadata.result.map(async (token) => {
          try {
            const metadata = token.token_uri
              ? await axios.get(token.token_uri)
              : { data: null }
            if (!metadata.data.image || !metadata.data.name)
              throw new Error('could not find the metada')
            const _nft = {
              image: metadata.data.image,
              itemName: metadata.data.name,
              collectionName: token.name,
              token_address: token.token_address,
              token_id: token.token_id,
              chain_id: chainId
            }
            return _nft
          } catch (e) {
            console.log(e)
            const _nft = {
              image: '/IMAGEMNDISPONIVEL.png',
              itemName: 'No Name Avaliable',
              collectionName: token.name,
              token_address: token.token_address,
              token_id: token.token_id,
              chain_id: chainId
            }
            return _nft
          }
        })
      )
      console.log(nftList)
      return nftList
    }
  }

  return fetchTokenMetadata
}

export default useFetchMeta
