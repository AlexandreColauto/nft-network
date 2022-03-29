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

function NFTHistoryTile() {
  return (
    <div>
      <div>
        <div className="bg-secondary rounded-lg flex text-center justify-around p-2 w-full">
          <div className="mx-2 w-1/5">Token Address</div>
          <div className="mx-2 w-1/5">Token ID</div>
          <div className="mx-2 w-1/5">Name</div>
          <div className="mx-2 w-1/5">Symbol</div>
          <div className="mx-2 w-1/5">Type</div>
        </div>
      </div>
    </div>
  )
}

export default NFTHistoryTile
