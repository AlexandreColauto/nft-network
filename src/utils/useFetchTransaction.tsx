import React from 'react'
import { useMoralisWeb3Api, useMoralis } from 'react-moralis'
import axios from 'axios'

function useFetchTransaction() {
  const Web3Api = useMoralisWeb3Api()
  const nullAddress = '0x0000000000000000000000000000000000000000'
  const { Moralis } = useMoralis()

  const fetchTokenMetadata = async (address: string) => {
    const chainId = await Moralis.chainId
    console.log(address)
    if (!address || !chainId) return
    const tokenMetadata = await Web3Api.account.getTokenTransfers({
      chain: chainId as any,
      address: address,
      limit: 15
    })
    console.log(tokenMetadata)

    return tokenMetadata.result
  }

  return fetchTokenMetadata
}

export default useFetchTransaction
