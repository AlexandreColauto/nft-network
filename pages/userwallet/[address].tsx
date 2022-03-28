import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMoralisWeb3Api, useMoralis } from 'react-moralis'
import NFTCard from '../../src/components/NFTCard'
import axios from 'axios'
import useFetchMeta from '../../src/utils/useFetchMeta'
import useFetchHistory from '../../src/utils/useFetchHistory'
import useFetchTransaction from '../../src/utils/useFetchTransaction'
import Link from 'next/link'
import HistoryTile from '../../src/components/HistoryTile'
import HistoryTileHeader from '../../src/components/HistoryTileHeader'

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

function Result() {
  const [metadata, setMetadata] = useState<any>()
  const [nftlist, setNFT] = useState<any>()
  const [showHistory, setShowHistory] = useState<boolean>(false)
  const Web3Api = useMoralisWeb3Api()
  const router = useRouter()
  const { address } = router.query
  const { Moralis } = useMoralis()
  const fetchTokenMetadata = useFetchMeta()
  const fetchHistory = useFetchHistory()
  const fetchTransaction = useFetchTransaction()

  useEffect(() => {
    //fetchNFTMeta()
    //getHistory()
    getTransactions()
  }, [address])

  const fetchNFTMeta = async () => {
    const meta = await fetchTokenMetadata(address as string)
    console.log(meta)
    setNFT(meta)
  }
  const getHistory = async () => {
    if (address) {
      console.log('fetch history')
      //const metadata = await fetchHistory(address as string)
      setMetadata(metadata)
      if (true) {
        console.log(metadata[0].token_address)
        const tokenMetadata = await Web3Api.token.getAllTokenIds({
          chain: 'polygon',
          address: '0x2953399124f0cbb46d2cbacd8a89cf0599974963' //metadata[0].token_address
        })
        console.log(tokenMetadata)
      }
    }
  }
  const getTransactions = async () => {
    const transactions = fetchTransaction(address as string)
    console.log(transactions)
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
              {nftlist && nftlist.map((nft: NFT) => <NFTCard {...nft} />)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Result
