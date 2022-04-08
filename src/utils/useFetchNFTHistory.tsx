import React from 'react'
import { useMoralisWeb3Api, useMoralis } from 'react-moralis'
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
  const { Moralis } = useMoralis()

  const fetchTokenMetadata = async (address: string) => {
    const chainId = await Moralis.chainId
    if (!address || !chainId) return
    const tokenMetadata = await Web3Api.token.getContractNFTTransfers({
      chain: chainId as any,
      address: address,
      limit: 15
    })
    console.log(tokenMetadata.result)
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
        console.log(_token)
        return _token
      })
      return nftList
    }
  }

  return fetchTokenMetadata
}

export default useFetchHistory
