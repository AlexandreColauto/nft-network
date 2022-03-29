import React from 'react'
import { useMoralisWeb3Api } from 'react-moralis'
import axios from 'axios'

function useFetchHistory() {
  const Web3Api = useMoralisWeb3Api()
  const nullAddress = '0x0000000000000000000000000000000000000000'

  const fetchTokenMetadata = async (address: string) => {
    if (!address) return
    const tokenMetadata = await Web3Api.account.getNFTTransfers({
      chain: 'bsc',
      address: address,
      limit: 15
    })
    if (tokenMetadata.result?.length) {
      tokenMetadata.result.map((token) => {
        if (token.from_address == nullAddress) {
          token.transaction_type = 'mint'
        } else if (token.from_address == address.toLowerCase()) {
          token.transaction_type = 'sell'
        } else if (token.to_address == address.toLowerCase()) {
          token.transaction_type = 'buy'
        }
      })
      return tokenMetadata.result
    }
  }

  return fetchTokenMetadata
}

export default useFetchHistory
