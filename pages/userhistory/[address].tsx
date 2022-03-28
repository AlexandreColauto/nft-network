import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  useMoralisWeb3Api,
  useMoralis,
  useMoralisCloudFunction
} from 'react-moralis'
import HistoryTile from '../../src/components/HistoryTile'
import HistoryTileHeader from '../../src/components/HistoryTileHeader'
import axios from 'axios'
import useFetchHistory from '../../src/utils/useFetchHistory'

interface NFT {
  from_address: string
  to_address: string
  metadata: any
  transaction_type: string
  token_address: string
  block_timestamp: string
  token_id: string
}

function Result() {
  const [nftlist, setNFT] = useState<any>()
  const [meta, setMeta] = useState<any>([])
  const Web3Api = useMoralisWeb3Api()
  const router = useRouter()
  const { address } = router.query
  const { enableWeb3 } = useMoralis()
  const fetchHistory = useFetchHistory()

  useEffect(() => {
    fetchMetadata()
  }, [address])

  const fetchMetadata = async () => {
    //const meta = await fetchHistory(address as string)
    enableWeb3()
    if (address) {
      console.log('fetch history')
      setMeta(await fetchHistory(address as string))
    }
  }

  return (
    <div>
      <div className="m-6 p-6 text-white bg-secondary rounded-xl w-min md:w-[885px] min-h-[1200px]">
        <br />
        <div className="">
          <HistoryTileHeader />
          {meta &&
            meta.map((nft: NFT, index: number) => (
              <HistoryTile
                key={index}
                from_address={nft.from_address}
                to_address={nft.to_address}
                metadata={nft.metadata}
                transaction_type={nft.transaction_type}
                token_address={nft.token_address}
                token_id={nft.token_id}
                block_time={nft.block_timestamp}
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Result
