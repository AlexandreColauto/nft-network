import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMoralisWeb3Api, useMoralis } from 'react-moralis'
import NFTCard from '../../src/components/NFTCard'
import axios from 'axios'

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
interface NFT {
  image: string
  collectionName: string
  itemName: string
  token_address: string
  token_id: string
}

function Result() {
  const [metadata, setMetadata] = useState<tokenMetadata>()
  const [nftlist, setNFT] = useState<any>()
  const Web3Api = useMoralisWeb3Api()
  const router = useRouter()
  const { address } = router.query
  const { Moralis } = useMoralis()

  useEffect(() => {
    fetchTokenMetadata(address as string)
  }, [address])

  const fetchTokenMetadata = async (address: string) => {
    console.log(address)
    if (!address) return
    const tokenMetadata = await Web3Api.account.getNFTs({
      chain: 'bsc',
      address: address
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
              collectionName: token.name
            }
            return _nft
          }
        })
      )
      console.log(nftList)
      setNFT(nftList)
    }
  }
  return (
    <div>
      <div className="m-6 p-6 text-white bg-secondary rounded-xl w-min md:w-[885px] min-h-[1200px]">
        <h1>Result for {metadata?.token_address} </h1>
        <br />
        <div className="flex flex-wrap justify-around">
          {nftlist && nftlist.map((nft: NFT) => <NFTCard {...nft} />)}
        </div>
        {/*<span>API response: </span>
        <pre className="break-all">{JSON.stringify(metadata, null, 2)}</pre>
        <span>Metadata :</span>
        <pre className="break-all">{JSON.stringify(nft, null, 2)}</pre>
        <br />
  <img src={nft?.image} width={600} /> */}
      </div>
    </div>
  )
}

export default Result
