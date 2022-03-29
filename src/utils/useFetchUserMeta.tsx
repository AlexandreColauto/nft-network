import React from 'react'
import { useMoralisWeb3Api } from 'react-moralis'
import axios from 'axios'

function useFetchMeta() {
  const Web3Api = useMoralisWeb3Api()

  const fetchTokenMetadata = async (address: string) => {
    console.log(address)
    if (!address) return
    const tokenMetadata = await Web3Api.account.getNFTs({
      chain: 'bsc',
      address: address,
      limit: 12
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
              token_id: token.token_id
            }
            return _nft
          } catch (e) {
            console.log(e)
            const _nft = {
              image: '/No-Image-Placeholder.svg',
              itemName: 'No Name Avaliable',
              collectionName: token.name,
              token_address: token.token_address,
              token_id: token.token_id
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
