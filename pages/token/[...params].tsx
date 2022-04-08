import React, { useEffect, useState } from 'react'
import useNFTDetails from '../../src/utils/useNFTDetails'
import type {
  token_metadata,
  transactions
} from '../../src/utils/useNFTDetails'
import Image from 'next/image'
import useShorten from '../../src/utils/useShorten'
import { useMoralis } from 'react-moralis'
import Link from 'next/link'
import { useRouter } from 'next/router'
interface props {
  address: string
  id: number
  contract_type: string
  name: string
  owner_of: string
}

function NFTDetail() {
  const fetchMetadata = useNFTDetails()
  const [metadata, setMetadata] = useState<token_metadata>()
  const [transactions, setTransactions] = useState<transactions[]>()
  const [props, setProps] = useState<props>()
  const shorten = useShorten()
  const { Moralis } = useMoralis()
  const router = useRouter()
  const { params } = router.query

  useEffect(() => {
    formatQuery()
  }, [])

  useEffect(() => {
    getMetadata()
  }, [props])

  const formatQuery = () => {
    console.log(params)
    if (params && typeof params !== 'string' && params.length > 0) {
      const [address, id, contract_type, name, owner_of] = params
      if (
        typeof address === 'string' &&
        typeof owner_of === 'string' &&
        typeof name === 'string' &&
        typeof id === 'string' &&
        typeof contract_type === 'string'
      ) {
        const _id = parseInt(id)

        const props: props = {
          address,
          id: _id,
          contract_type,
          name,
          owner_of
        }
        setProps(props)
      }
    }
  }

  const getMetadata = async () => {
    if (!props) return
    const [_metadata, _transactions] = await fetchMetadata(props)
    if (!_metadata || !_transactions) return
    setMetadata(_metadata)
    setTransactions(_transactions)
  }
  return (
    <div>
      <div>
        <div className="m-6 p-6 text-white bg-secondary  rounded-xl w-min md:w-[885px] min-h-[1200px]">
          {metadata && (
            <div className="flex">
              <div className="w-1/2 pr-10">
                <div className="w-[350px] h-[300px] overflow-hidden flex">
                  <>
                    <img
                      src={metadata.image}
                      className="w-full rounded-3xl object-cover self-auto"
                    />
                  </>
                </div>
              </div>
              <div className="w-1/2 ml-6 border rounded-3xl p-6">
                <p className="text-xl font-bold mb-3">NFT Details</p>
                <hr />
                <table className="mt-3">
                  <tr>
                    <td>
                      <div className="p-1 mr-2 font-bold">Collection: </div>
                    </td>
                    <td>
                      <div> {metadata?.collectionName}</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="p-1 mr-2 font-bold">Name:</div>
                    </td>
                    <td>
                      <div> {metadata?.itemName}</div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="p-1 mr-2 font-bold">Owner:</div>
                    </td>
                    <td>
                      <Link href={`/userwallet/${metadata?.owner_of}`}>
                        <a> {shorten(metadata?.owner_of)}</a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="p-1 mr-2 font-bold">Address:</div>
                    </td>
                    <td>
                      <Link href={`/contract/${metadata?.token_address}`}>
                        <a> {shorten(metadata?.token_address)}</a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="p-1 mr-2 font-bold">Id:</div>
                    </td>
                    <td>
                      <div> {metadata?.token_id}</div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          )}
          <div>
            {transactions && (
              <>
                <div className="mt-20">
                  <div className="w-full  border rounded-3xl p-6">
                    <p className="text-xl font-bold mb-3">Transactions</p>
                    <hr />
                    <table className="mt-3 w-full">
                      <tr>
                        <th>Transaction Hash</th>

                        <th>From address</th>
                        <th>To address</th>
                        <th>Value</th>
                        <th>Block number</th>
                      </tr>
                      {transactions.map((transaction) => (
                        <tr className="text-center">
                          <td>{shorten(transaction.transaction_hash)}</td>
                          <td>{shorten(transaction.from_address)}</td>
                          <td>{shorten(transaction.to_address)}</td>
                          <td>
                            {transaction.value &&
                              Moralis.Units.FromWei(transaction.value)}
                          </td>
                          <td>{transaction.block_number}</td>
                        </tr>
                      ))}
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTDetail
