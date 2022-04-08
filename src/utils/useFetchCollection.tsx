import React from 'react'
import { useMoralisWeb3Api } from 'react-moralis'
import axios from 'axios'

interface CollectionMetadata {
  token_address: string
  token_id: string
  contract_type: string
  name: string
  symbol: string
}

function useFetchCollection() {
  const Web3Api = useMoralisWeb3Api()

  const fetchTokenMetadata = async (address: string) => {
    if (!address) return
    const tokenMetadata = await Web3Api.token.getAllTokenIds({
      chain: 'bsc',
      address: address,
      limit: 15
    })
    console.log(tokenMetadata)
    if (tokenMetadata.result?.length) {
      const nftList = await Promise.all(
        tokenMetadata.result.map(async (token) => {
          const _nft: CollectionMetadata = {
            name: token.name,
            token_address: token.token_address,
            token_id: token.token_id,
            symbol: token.symbol,
            contract_type: token.contract_type
          }

          return _nft
        })
      )
      console.log(nftList)
      return nftList
    }
  }

  return fetchTokenMetadata
}

export default useFetchCollection
