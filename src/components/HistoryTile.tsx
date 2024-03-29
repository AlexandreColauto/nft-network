import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useMoralisWeb3Api, useMoralis } from 'react-moralis'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCartShopping,
  faMoneyBill,
  faCirclePlus
} from '@fortawesome/free-solid-svg-icons'
import ERC721 from '../utils/ERC721ABI.json'
import Link from 'next/link'

interface Props {
  from_address: string
  to_address: string
  metadata: any
  transaction_type: string
  token_address: string
  block_time: string
  token_id: string
}

function HistoryTile(props: Props) {
  const [type, setType] = useState({ text: '', icon: faCartShopping })
  const [days, setDate] = useState('')
  const [addresses, setAddresses] = useState({
    from_address: props.from_address,
    to_address: props.to_address,
    token_address: props.token_address
  })
  const {
    user,
    Moralis,
    web3,
    isWeb3EnableLoading,
    isWeb3Enabled,
    enableWeb3
  } = useMoralis()

  useEffect(() => {
    typeFilter()
    beautifyAddresses()
    defineDate()
  }, [])

  const typeFilter = () => {
    switch (props.transaction_type) {
      case 'buy':
        setType({
          text: 'Buy',
          icon: faCartShopping
        })
        break
      case 'sell':
        setType({
          text: 'Sell',
          icon: faMoneyBill
        })
        break
      case 'mint':
        setType({
          text: 'Mint',
          icon: faCirclePlus
        })
        break
    }
  }

  const beautifyAddresses = () => {
    if (!user) return
    const _address = {
      from_address: shorten(addresses.from_address),
      to_address: shorten(addresses.to_address),
      token_address: shorten(addresses.token_address)
    }
    setAddresses(_address)
  }

  const shorten = (_address: string) => {
    if (user && _address === user.attributes.ethAddress.toLowerCase()) {
      return 'You'
    } else {
      return (
        _address.substring(0, 4) +
        '...' +
        _address.substring(_address.length - 4)
      )
    }
  }

  const defineDate = () => {
    const date = new Date(props.block_time)
    const days = Math.floor(
      (new Date().getTime() - date.getTime()) / (1000 * 3600 * 24)
    )
    console.log(days)
    if (days > 1) {
      setDate(days + 'Days')
    }
    if (days == 1) {
      setDate(days + 'Day')
    }
    if (days == 0) {
      setDate('Less than a day')
    }
  }

  return (
    <div>
      <div>
        <div className="bg-secondary rounded-lg font-light flex text-center justify-around p-2 w-full text-slate-100 hover:drop-shadow">
          <div className=" w-1/5">
            <FontAwesomeIcon icon={type.icon} className="text-gray-500 mx-2" />
            {type.text}
          </div>
          <Link href={`/contract/${props.token_address}`}>
            <div className="mx-2 w-1/5 hover:underline hover:drop-shadow hover:cursor-pointer">
              {addresses.token_address}
            </div>
          </Link>
          <div className="mx-2 w-1/5">{addresses.from_address}</div>
          <div className="mx-2 w-1/5">{addresses.to_address}</div>
          <div className="mx-2 w-1/5">{days}</div>
        </div>
      </div>
    </div>
  )
}

export default HistoryTile
