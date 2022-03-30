import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMoralisWeb3Api, useMoralis } from 'react-moralis'
import NFTCard from '../src/components/NFTCard'
import axios from 'axios'
import useFetchMeta from '../src/utils/useFetchUserMeta'
import useFetchHistory from '../src/utils/useFetchHistory'
import useFetchTransaction from '../src/utils/useFetchTransaction'
import Link from 'next/link'
import HistoryTile from '../src/components/HistoryTile'
import HistoryTileHeader from '../src/components/HistoryTileHeader'
import { NextPage } from 'next'

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
interface history {
  from_address: string
  to_address: string
  metadata: any
  transaction_type: string
  token_address: string
  block_timestamp: string
  token_id: string
}
const Home: NextPage = () => {
  const [metadata, setMetadata] = useState<any>()
  const [nftlist, setNFT] = useState<any>()
  const [showHistory, setShowHistory] = useState<boolean>(false)
  const Web3Api = useMoralisWeb3Api()
  const router = useRouter()
  const { Moralis, enableWeb3, user } = useMoralis()
  const fetchTokenMetadata = useFetchMeta()
  const fetchHistory = useFetchHistory()
  const address = user?.attributes.ethAddress
  console.log(address)
  useEffect(() => {
    fetchNFTMeta()
    getHistory()
  }, [address])
  useEffect(() => {
    enableWeb3()
  }, [])
  const fetchNFTMeta = async () => {
    console.log(address)
    if (!address) return
    const meta = await fetchTokenMetadata(address as string)
    console.log(meta)
    setNFT(meta)
  }
  const getHistory = async () => {
    if (address) {
      console.log('fetch history')
      const metadata = await fetchHistory(address as string)
      setMetadata(metadata)
    }
  }

  return (
    <div>
      <div className="m-6 p-6 text-white bg-secondary  rounded-xl w-min md:w-[885px] min-h-[1200px]">
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
          <li className="mr-2">
            <button
              className={
                `inline-block p-4 rounded-t-lg bg-secondary ` +
                (showHistory
                  ? 'dark:hover:bg-gray-800 dark:hover:text-gray-300  '
                  : 'active dark:bg-gray-800 dark:text-blue-500')
              }
              onClick={() => setShowHistory(false)}
            >
              NFT on Hand
            </button>
          </li>
          <li className="mr-2">
            <button
              className={
                `inline-block p-4 rounded-t-lg ` +
                (!showHistory
                  ? 'dark:hover:bg-gray-800 dark:hover:text-gray-300  '
                  : 'active dark:bg-gray-800 dark:text-blue-500')
              }
              onClick={() => setShowHistory(true)}
            >
              History
            </button>
          </li>
        </ul>

        <br />
        {showHistory ? (
          <>
            <HistoryTileHeader />
            {metadata &&
              metadata.map((nft: history, index: number) => (
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
          </>
        ) : (
          <>
            <div className="flex flex-wrap justify-around">
              {nftlist &&
                nftlist.map((nft: NFT, index: number) => (
                  <NFTCard key={index} {...nft} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
