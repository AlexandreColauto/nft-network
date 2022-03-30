import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface Props {
  value: string
  contract_type: string
  token_address: string
  token_id: string
  from_address: string
  to_address: string
}

function NFTHistoryTile(props: Props) {
  const [addresses, setAddresses] = useState({
    token_address: props.token_address,
    token_id: props.token_id,
    from_address: props.from_address,
    to_address: props.to_address
  })

  useEffect(() => {
    beautifyAddresses()
  }, [])

  const beautifyAddresses = () => {
    const _address = {
      token_address: shorten(addresses.token_address),
      from_address: shorten(addresses.from_address),
      to_address: shorten(addresses.to_address),

      token_id:
        addresses.token_id.length > 10
          ? shorten(addresses.token_id)
          : addresses.token_id
    }
    setAddresses(_address)
  }

  const shorten = (_address: string) => {
    if (!_address) return ''
    return (
      _address.substring(0, 4) + '...' + _address.substring(_address.length - 4)
    )
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
          <div className="mx-2 w-1/5">{addresses.token_id}</div>
          <div className="mx-2 w-1/5">{addresses.from_address}</div>
          <div className="mx-2 w-1/5">{addresses.to_address}</div>
          <div className="mx-2 w-1/5">{props.value}</div>
          <div className="mx-2 w-1/5">{props.contract_type}</div>
        </div>
      </div>
    </div>
  )
}

export default NFTHistoryTile
