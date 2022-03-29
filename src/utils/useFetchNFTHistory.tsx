import React from 'react'
import { useMoralisWeb3Api } from 'react-moralis'
import axios from 'axios'

interface Metadata {
  value: string | undefined
  contract_type: string | undefined
  token_address: string | undefined
  token_id: string | undefined
  from_address: string | undefined
  to_address: string | undefined
}

function useFetchHistory() {
  const Web3Api = useMoralisWeb3Api()
  const nullAddress = '0x0000000000000000000000000000000000000000'

  const fetchTokenMetadata = async (address: string) => {
    console.log(address)
    if (!address) return
    const tokenMetadata = await Web3Api.token.getContractNFTTransfers({
      chain: 'polygon',
      address: address,
      limit: 15
    })
    console.log(tokenMetadata)
    if (tokenMetadata.result?.length) {
      const nftList = tokenMetadata.result.map((token) => {
        const _token: Metadata = {
          from_address: token.from_address,
          to_address: token.to_address,
          token_address: token.token_address,
          token_id: token.token_id,
          contract_type: token.contract_type,
          value: token.value
        }
        return _token
      })
      console.log(nftList)
      return nftList
    }
  }

  return fetchTokenMetadata
}

export default useFetchHistory
