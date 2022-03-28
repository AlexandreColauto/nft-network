import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons'

function Donations() {
  const [wallets, setWallets] = useState([''])
  const { Moralis, isAuthenticated, user } = useMoralis()
  const DonationWallets = Moralis.Object.extend('donationWallets')
  const query = new Moralis.Query(DonationWallets)
  let counter = 1

  useEffect(() => {
    fetchWallets()
  }, [isAuthenticated])

  async function fetchWallets() {
    if (!isAuthenticated) return
    const results = await query.find()
    const _wallets = results.map((wallet) => {
      const address = wallet.attributes.address
      return (
        address.substring(0, 4) + '...' + address.substring(address.length - 4)
      )
    })
    setWallets(_wallets)
  }

  return (
    <div>
      <aside className="w-64 ml-7 " aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded-xl dark:bg-secondary">
          <ul className="space-y-2">
            <li>
              <Link href="vips">
                <div className="flex items-center p-2 text-base cursor-pointer font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <FontAwesomeIcon
                    icon={faHandHoldingDollar}
                    className="text-gray-500 ml-1"
                  />
                  <span className="ml-3">Donation Wallets</span>
                </div>
              </Link>
            </li>
            <li>
              {wallets.length > 0 &&
                wallets.map((wallet, id) => (
                  <div
                    key={id}
                    className="flex items-center cursor-pointer p-2 text-sm ml-4 font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {wallet}
                  </div>
                ))}
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Donations
