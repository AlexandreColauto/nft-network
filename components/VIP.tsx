import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward } from '@fortawesome/free-solid-svg-icons'
function VIP() {
  const [vips, setVips] = useState([{ name: '', address: '' }])
  const { Moralis, isAuthenticated, user } = useMoralis()
  const VIP = Moralis.Object.extend('vip')
  const query = new Moralis.Query(VIP)

  useEffect(() => {
    fetchVips()
  }, [isAuthenticated])

  async function fetchVips() {
    if (!isAuthenticated) return
    const results = await query.find()
    const _vips = results.map((vips) => {
      return {
        name: vips.attributes.name,
        address: vips.attributes.address
      }
    })
    console.log(_vips)
    setVips(_vips)
  }

  return (
    <div>
      <aside className="w-64 ml-7 mb-8 " aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded-xl dark:bg-secondary">
          <ul className="space-y-2">
            <li>
              <Link href="vips">
                <div className="flex items-center p-2 text-base cursor-pointer font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <FontAwesomeIcon
                    icon={faAward}
                    className="text-gray-500 ml-1"
                  />
                  <span className="ml-3">VIPS</span>
                </div>
              </Link>
            </li>
            <li>
              {vips.length > 0 &&
                vips.map((vip, id) => (
                  <div
                    key={id}
                    className="flex items-center cursor-pointer p-2 text-sm ml-4 font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {vip.name}
                  </div>
                ))}
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default VIP
