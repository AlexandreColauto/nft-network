import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMoralisWeb3Api } from 'react-moralis'

interface tokenMetadata {
  token_address: string
  token_id: string
  contract_type: string
  owner_of: string
  block_number: string
  block_number_minted: string
  token_uri?: string | undefined
  metadata?: string | undefined
  synced_at?: string | undefined
  amount?: string | undefined
  name: string
  symbol: string
}

function result() {
  const [metadata, setMetadate] = useState<tokenMetadata>()
  const [nft, setNFT] = useState<any>()
  const Web3Api = useMoralisWeb3Api()
  const router = useRouter()
  const { address } = router.query

  useEffect(() => {
    fetchTokenMetadata(address)
  }, [address])

  const fetchTokenMetadata = async (address) => {
    console.log(address)
    if (!address) return
    const tokenMetadata = await Web3Api.account.getNFTs({
      chain: 'bsc',
      address: address
    })
    setMetadate(tokenMetadata?.result[0])
    const nftMetadata = JSON.parse(tokenMetadata.result[0].metadata)
    console.log(nftMetadata)
    setNFT(nftMetadata)
  }

  return (
    <div>
      <div className="m-6 p-6 text-white bg-secondary rounded-xl max-w-[88Spx]">
        <h1>Result for {metadata?.token_address} </h1>
        <p>{metadata?.contract_type}</p>
        <p>{metadata?.name}</p>
        <p>{metadata?.symbol}</p>
        <p>{nft?.name}</p>
        <p className="flex-wrap">{nft?.description}</p>
        <img src={nft?.image} width={200} />
      </div>
    </div>
  )
}

export default result
