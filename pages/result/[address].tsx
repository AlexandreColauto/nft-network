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
  const [metadata, setMetadata] = useState<tokenMetadata>()
  const [nft, setNFT] = useState<any>()
  const Web3Api = useMoralisWeb3Api()
  const router = useRouter()
  const { address } = router.query

  useEffect(() => {
    fetchTokenMetadata(address as string)
  }, [address])

  const fetchTokenMetadata = async (address: string) => {
    console.log(address)
    if (!address) return
    const tokenMetadata = Web3Api.account
      .getNFTs({
        chain: 'bsc',
        address: address
      })
      .then((value: any) => {
        const tokenMetadata = value
        setMetadata(tokenMetadata?.result[0])
        const nftMetadata = tokenMetadata.result[0]
          ? JSON.parse(tokenMetadata.result[0]?.metadata)
          : null
        console.log(nftMetadata)
        setNFT(nftMetadata)
      })
  }

  return (
    <div>
      <div className="m-6 p-6 text-white bg-secondary rounded-xl w-[68Spx] min-h-[1200px]">
        <h1>Result for {metadata?.token_address} </h1>
        <br />
        <span>API response: </span>
        <pre className="break-all">{JSON.stringify(metadata, null, 2)}</pre>
        <span>Metadata :</span>
        <pre className="break-all">{JSON.stringify(nft, null, 2)}</pre>
        <br />
        <img src={nft?.image} width={600} />
      </div>
    </div>
  )
}

export default result
