import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useMoralis, useChain } from 'react-moralis'

interface Props {
  image: string
  collectionName: string
  itemName: string
  token_address: string
  token_id: string
  chain_id?: string
}

function NFTCard(props: Props) {
  const [baseURL, setBaseURL] = useState('')
  const { chain_id } = props
  const filterClName = () => {
    const collectionName = props.collectionName
    if (collectionName?.length > 15) {
      setClName(collectionName.substring(0, 15) + '...')
      return
    }
    setClName(collectionName)
  }
  useEffect(() => {
    filterClName()
    openSeaURL()
  }, [])

  const openSeaURL = () => {
    if (chain_id == '0x1') {
      setBaseURL('https://opensea.io/assets/')
    }
    if (chain_id == '0x89') {
      setBaseURL('https://opensea.io/assets/matic/')
    }
  }
  const [clName, setClName] = useState('')
  return (
    <div className="mb-8">
      <div className="w-44 h-min overflow-hidden border rounded-xl ">
        <Link href={`/contract/${props.token_address}`}>
          <div className="h-44 overflow-hidden items-center flex">
            <img
              src={props.image}
              alt="NFT Image"
              className="object-cover -mt-1"
            />
          </div>
        </Link>
        <div className="p-2">
          <p className="text-gray-400 font-light">{clName}</p>
          <p className="h-10">{props.itemName}</p>
          {!baseURL && <br />}
          {baseURL && (
            <div>
              <Link href={baseURL + props.token_address + '/' + props.token_id}>
                <button className="flex drop-shadow bg-primary rounded-full p-1 mx-auto mb-2">
                  Opensea
                  <span>
                    <img src="/Open_SEA_LOGO.svg" width={25} />
                  </span>
                </button>
              </Link>
            </div>
          )}
          <button className="flex drop-shadow bg-secondary border border-violet-700 rounded-full p-2 mx-auto">
            <span className="text-sm"> Donate NFT </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NFTCard
