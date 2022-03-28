import React from 'react'
import { useMoralisWeb3Api } from 'react-moralis'
import axios from 'axios'

function useFetchTransaction() {
  const Web3Api = useMoralisWeb3Api()
  const nullAddress = '0x0000000000000000000000000000000000000000'

  const fetchTokenMetadata = async (address: string) => {
    console.log(address)
    if (!address) return
    const tokenMetadata = await Web3Api.account.getTokenTransfers({
      chain: 'polygon',
      address: address,
      limit: 10
    })
    console.log(tokenMetadata)

    return tokenMetadata.result
  }

  return fetchTokenMetadata
}

export default useFetchTransaction
