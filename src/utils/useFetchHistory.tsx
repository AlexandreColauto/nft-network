import React from 'react'
import { useMoralisWeb3Api } from 'react-moralis'
import axios from 'axios'

function useFetchHistory() {
  const Web3Api = useMoralisWeb3Api()
  const nullAddress = '0x0000000000000000000000000000000000000000'

  const fetchTokenMetadata = async (address: string) => {
    console.log(address)
    if (!address) return
    const tokenMetadata = await Web3Api.account.getNFTTransfers({
      chain: 'polygon',
      address: address,
      limit: 2
    })
    if (tokenMetadata.result?.length) {
      const nftList = await Promise.all(
        tokenMetadata.result.map(async (token) => {
          const _token = {
            from_address: token.from_address,
            to_address: token.to_address,
            token_address: token.token_address,
            token_id: token.token_id,
            transaction_type: '',
            block_time: token.block_timestamp
          }
          if (token.from_address == nullAddress) {
            token.transaction_type = 'mint'
          } else if (token.from_address == address.toLowerCase()) {
            token.transaction_type = 'sell'
          } else if (token.to_address == address.toLowerCase()) {
            token.transaction_type = 'buy'
          }
          console.log(token)
          return token
        })
      )
      return tokenMetadata.result
    }
  }

  return fetchTokenMetadata
}

export default useFetchHistory
