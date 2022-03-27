import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface Props {
  image: string
  collectionName: string
  itemName: string
  token_address: string
  token_id: string
}

function NFTCard(props: Props) {
  const baseURL = 'https://opensea.io/assets/'
  const filterClName = () => {
    const collectionName = props.collectionName
    if (collectionName?.length > 15) {
      setClName(collectionName.substring(0, 15) + '...')
      return
    }
    console.log(collectionName)
    setClName(collectionName)
  }
  useEffect(() => {
    filterClName()
  })
  const [clName, setClName] = useState('')
  return (
    <div className="mb-8">
      <div className="w-44 h-min overflow-hidden border rounded-xl ">
        <div className="h-44 overflow-hidden items-center flex">
          <img src={props.image} alt="NFT Image" className="object-cover " />
        </div>
        <div className="p-2">
          <p className="text-gray-400 font-light">{clName}</p>
          <p>{props.itemName}</p>
          <br />
          <Link href={baseURL + props.token_address + '/' + props.token_id}>
            <button className="flex drop-shadow bg-primary rounded-full p-1 mx-auto">
              Opensea
              <span>
                <img src="/Open_SEA_LOGO.svg" width={25} />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NFTCard
