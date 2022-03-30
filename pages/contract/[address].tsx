import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMoralisWeb3Api, useMoralis } from 'react-moralis'
import NFTHistoryTile from '../../src/components/NFTHistoryTile'
import NFTMetadataTile from '../../src/components/NFTMetadataTile'
import NFTHistoryTileHeader from '../../src/components/NFTHistoryTileHeader'
import NFTMetadataTileHeader from '../../src/components/NFTMetadataTileHeader'
import useFetchCollection from '../../src/utils/useFetchCollection'
import useFetchHistory from '../../src/utils/useFetchNFTHistory'

interface NFT {
  token_address: string
  token_id: string
  nft_type: string
  name: string
  symbol: string
}

interface History {
  value: string
  contract_type: string
  token_address: string
  token_id: string
  from_address: string
  to_address: string
}

function Result() {
  const [meta, setMeta] = useState<any>([])
  const [history, setHistory] = useState<any>([])
  const Web3Api = useMoralisWeb3Api()
  const router = useRouter()
  const { address } = router.query
  const { enableWeb3 } = useMoralis()
  const fetchCollection = useFetchCollection()
  const fetchTransaction = useFetchHistory()
  const [showHistory, setShowHistory] = useState<boolean>(false)

  useEffect(() => {
    fetchMetadata()
    fetchHistory()
  }, [address])

  const fetchMetadata = async () => {
    //const meta = await fetchHistory(address as string)
    if (address) {
      console.log('fetch history')
      setMeta(await fetchCollection(address as string))
    }
  }
  const fetchHistory = async () => {
    //const meta = await fetchHistory(address as string)
    if (address) {
      console.log('fetch history')
      setHistory(await fetchTransaction(address as string))
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
              All NFT&apos;s
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
              Transaction History
            </button>
          </li>
        </ul>

        <br />
        {showHistory ? (
          <>
            <NFTHistoryTileHeader />
            {history &&
              history.map((nft: History, index: number) => (
                <NFTHistoryTile key={index} {...nft} />
              ))}
          </>
        ) : (
          <>
            <NFTMetadataTileHeader />
            {meta &&
              meta.map((nft: NFT, index: number) => (
                <NFTMetadataTile key={index} {...nft} />
              ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Result
