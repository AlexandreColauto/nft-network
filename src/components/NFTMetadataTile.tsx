import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useShorten from '../utils/useShorten'

interface Props {
  token_address: string
  token_id: string
  contract_type: string
  name: string
  symbol: string
  owner_of: string
}

function NFTHistoryTile(props: Props) {
  const [addresses, setAddresses] = useState({
    token_address: props.token_address,
    token_id: props.token_id
  })
  const shorten = useShorten()

  useEffect(() => {
    beautifyAddresses()
  }, [])

  const beautifyAddresses = () => {
    const _address = {
      token_address: shorten(addresses.token_address),
      token_id:
        addresses.token_id.length > 10
          ? shorten(addresses.token_id)
          : addresses.token_id
    }
    console.log(_address)
    setAddresses(_address)
  }

  return (
    <div>
      <div>
        <div className="bg-secondary rounded-lg font-light flex text-center justify-around p-2 w-full text-slate-100 hover:drop-shadow">
          <Link href={`/contract/${props.token_address}`}>
            <div className="mx-2 w-1/5 hover:underline hover:drop-shadow hover:cursor-pointer">
              {addresses.token_address}
            </div>
          </Link>
          <Link
            href={`/token/${props.token_address}/${props.token_id}/${props.contract_type}/${props.name}/${props.owner_of}`}
          >
            <div className="mx-2 w-1/5 hover:underline hover:drop-shadow hover:cursor-pointer">
              {addresses.token_id}
            </div>
          </Link>
          <div className="mx-2 w-1/5">{props.name}</div>
          <div className="mx-2 w-1/5">{props.symbol}</div>
          <div className="mx-2 w-1/5">{props.contract_type}</div>
        </div>
      </div>
    </div>
  )
}

export default NFTHistoryTile
