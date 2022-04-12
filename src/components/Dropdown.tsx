import React, { useState } from 'react'
import { useMoralis, useChain } from 'react-moralis'
import {
  AvaxLogo,
  PolygonLogo,
  BSCLogo,
  ETHLogo,
  FantomLogo
} from './ChainLogos'

function Dropdown() {
  const [show, setShow] = useState(false)
  const { switchNetwork, chainId, chain } = useChain()
  const { isAuthenticated } = useMoralis()
  const changeChain = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const chainId = e.currentTarget.value
    console.log(chainId)
    await switchNetwork(chainId)
  }
  return (
    <div className="mr-6">
      <button
        id="dropdownDefault"
        onClick={() => setShow(!show)}
        className="text-white bg-violet-700 hover:bg-violet-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Chain
        <svg
          className="ml-2 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {show && isAuthenticated && (
        <div
          id="dropdown"
          className="absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefault"
          >
            <li>
              <button
                value={'0x1'}
                className="py-1 px-4 text-sm text-gray-700 dark:text-gray-200 flex"
                onClick={changeChain}
              >
                <ETHLogo />
                <span className="ml-1">ETH</span>
              </button>
            </li>

            <li>
              <button
                value={'0x38'}
                className="py-1 px-4 text-sm text-gray-700 dark:text-gray-200 flex"
                onClick={changeChain}
              >
                <BSCLogo />
                <span className="ml-1">BSC</span>
              </button>
            </li>

            <li>
              <button
                value={'0x89'}
                className="py-1 px-4 text-sm text-gray-700 dark:text-gray-200 flex"
                onClick={changeChain}
              >
                <PolygonLogo />
                <span className="ml-1">Polygon</span>
              </button>
            </li>

            <li>
              <button
                value={'0xa86a'}
                className="py-1 px-4 text-sm text-gray-700 dark:text-gray-200 flex"
                onClick={changeChain}
              >
                <AvaxLogo />
                <span className="ml-1">Avax</span>
              </button>
            </li>

            <li>
              <button
                value={'0xfa'}
                className="py-1 px-4 text-sm text-gray-700 dark:text-gray-200 flex"
                onClick={changeChain}
              >
                <FantomLogo />
                <span className="ml-1">Fantom</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Dropdown
