import React, { Component, useEffect } from 'react'
import Logo from './logo.png'
import Image from 'next/image'
import SearchBar from './Search'
import { useMoralis } from 'react-moralis'

const APP_ID = 'w0I1JAJxvmVnwRJ7fFqU4qCgKkmrHpZpVuLSJuoI'
const SERVER_URL = 'https://ib6vmhqcic5f.usemoralis.com:2053/server'

const Header = () => {
  const { Moralis, authenticate, enableWeb3 } = useMoralis()
  useEffect(() => {
    Moralis.start({ serverUrl: SERVER_URL, appId: APP_ID })
    enableWeb3()
    console.log('enabled')
  }, [])

  useEffect(() => {}, [])
  return (
    <>
      <div className="flex justify-between items-center -mt-4 max-w-screen-xl">
        <div className=" md:block md:mx-6 md:">
          <Image src={Logo} alt="Many Worlds - logo" height={130} width={130} />
        </div>
        <SearchBar />
        <button
          className="mr-10 text-white font-bold "
          onClick={() => authenticate()}
        >
          Connect Wallet
        </button>
      </div>
    </>
  )
}

export default Header
