import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useMoralisWeb3Api, useMoralis } from 'react-moralis'
import NFTCard from '../src/components/NFTCardIndex'
import useFetchMeta from '../src/utils/useFetchIndexMeta'
import useFetchHistory from '../src/utils/useFetchHistory'
import HistoryTile from '../src/components/HistoryTile'
import HistoryTileHeader from '../src/components/HistoryTileHeader'
import { NextPage } from 'next'
import InfiniteScroll from 'react-infinite-scroll-component'

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
  chain_id: string
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
  const [nftbatch, setBatch] = useState<any>()
  const [showHistory, setShowHistory] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [chain, setChain] = useState('')
  const Web3Api = useMoralisWeb3Api()
  const router = useRouter()
  const { Moralis, enableWeb3, user, isAuthenticated } = useMoralis()
  const fetchTokenMetadata = useFetchMeta()
  const fetchHistory = useFetchHistory()
  const address = user?.attributes.ethAddress
  const chainId = Moralis.chainId
  const chainList = {
    ETH: '0x1',
    BSC: '0x38',
    Polygon: '0x89',
    Avax: '0xa86a',
    Fantom: '0xfa'
  }

  useEffect(() => {
    fetchNFTMeta()
    getHistory()
  }, [isAuthenticated, chainId])

  useEffect(() => {
    enableWeb3()
  }, [])

  useEffect(() => {
    fetchMoreData()
  }, [chain])

  useEffect(() => {
    loadNextBatch()
  }, [nftlist])

  const fetchNFTMeta = async () => {
    console.log(address)
    if (!address || !chainId) return
    setChain(chainId)
    const meta = await fetchTokenMetadata(address as string, 0, chainId)
    console.log(meta)
    if (!meta) nextChain(chainId)
    setNFT(meta)
  }
  const getHistory = async () => {
    if (address && !metadata) {
      console.log('fetch history')
      const metadata = await fetchHistory(address as string)
      setMetadata(metadata)
    }
  }
  const fetchMoreData = async () => {
    console.log(address)
    if (!address || !chainId) return
    const meta = await fetchTokenMetadata(address as string, offset, chain)
    if (meta?.length == 500) {
      setOffset(offset + 1)
    }

    const newNFTS = nftlist ? nftlist.concat(meta) : meta
    console.log(newNFTS)
    if (!newNFTS) {
      nextChain(chain)
    } else {
      setNFT(newNFTS)
      return newNFTS
    }
  }
  const loadNextBatch = () => {
    if (!nftlist) return
    console.log('new Batch!')
    const _batch = nftlist.slice(0, page * 20)
    if (_batch.length != nftlist.length) {
      setBatch(_batch)
      console.log(_batch)
      setPage(page + 1)
    } else {
      if (nftlist.length < 500) {
        nextChain(chain)
      } else {
        fetchMoreData()
      }
    }
  }
  const nextChain = (_chain: string) => {
    console.log('next chain' + _chain)
    if (hasMore)
      switch (_chain) {
        case '0xfa':
          if (chainId !== chainList.ETH) {
            setChain(chainList.ETH)
            console.log('mudou pra ETH')
            break
          } else {
            setHasMore(false)
            break
          }
        case '0x1':
          if (chainId !== chainList.BSC) {
            setChain(chainList.BSC)
            console.log('mudou pra bsc')
            break
          } else {
            setHasMore(false)
            break
          }
        case '0x38':
          if (chainId !== chainList.Polygon) {
            setChain(chainList.Polygon)
            console.log('mudou pra Polygon')
            break
          } else {
            setHasMore(false)
            break
          }
        case '0x89':
          if (chainId !== chainList.Avax) {
            setChain(chainList.Avax)
            console.log('mudou pra Avax')
            break
          } else {
            setHasMore(false)
            break
          }
        case '0xa86a':
          if (chainId !== chainList.Fantom) {
            console.log('mudou pra Fantom')
            setChain(chainList.Fantom)
            break
          } else {
            setHasMore(false)
            break
          }
        default:
          if (chainId) setChain(chainId)
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
            {' '}
            {nftbatch && (
              <InfiniteScroll
                dataLength={nftbatch.length}
                next={loadNextBatch}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                height={1200}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <div className="flex flex-wrap justify-around">
                  {nftbatch &&
                    nftbatch.map((nft: NFT, index: number) => (
                      <NFTCard key={index} {...nft} />
                    ))}
                </div>
              </InfiniteScroll>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Home
