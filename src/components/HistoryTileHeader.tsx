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

interface Props {
  from_address: string
  to_address: string
  metadata: any
  transaction_type: string
  token_address: string
  block_time: string
  token_id: string
}

function HistoryTile() {
  return (
    <div>
      <div>
        <div className="bg-secondary rounded-lg flex text-center justify-around p-2 w-full">
          <div className="w-1/5">
            <p>Type</p>
          </div>
          <div className="mx-2 w-1/5">Token Address</div>
          <div className="mx-2 w-1/5">From Address</div>
          <div className="mx-2 w-1/5">To Address</div>
          <div className="mx-2 w-1/5">Days</div>
        </div>
      </div>
    </div>
  )
}

export default HistoryTile
