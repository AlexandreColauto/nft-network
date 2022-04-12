import React, { Component, useEffect } from 'react'
import Logo from './logo.png'
import Image from 'next/image'
import SearchBar from './Search'
import { useMoralis } from 'react-moralis'
import Dropdown from './Dropdown'

const APP_ID = 'w0I1JAJxvmVnwRJ7fFqU4qCgKkmrHpZpVuLSJuoI'
const SERVER_URL = 'https://ib6vmhqcic5f.usemoralis.com:2053/server'

const Header = () => {
  const {
    authenticate,
    isAuthenticated,
    user,
    isWeb3Enabled,
    enableWeb3,
    web3
  } = useMoralis()

  useEffect(() => {
    tryWeb3()
  }, [])

  const tryWeb3 = () => {
    !isWeb3Enabled && !isAuthenticated ? enableWeb3() : null
  }
  async function login() {
    console.log(isAuthenticated)
    console.log(user)
    tryWeb3()
    if (!isAuthenticated) {
      console.log('entrou')
      const user = await authenticate({
        signingMessage: 'Log in using Moralis'
      })
    }
    await authenticate({
      signingMessage: 'Log in using Moralis'
    })
  }

  useEffect(() => {}, [])
  return (
    <>
      <div className="flex justify-between items-center -mt-4 max-w-screen-xl">
        <div className=" md:block md:mx-6 md:">
          <Image src={Logo} alt="Many Worlds - logo" height={130} width={130} />
        </div>
        <SearchBar />
        <Dropdown />
        <button className="mr-10 text-white font-bold " onClick={login}>
          Connect Wallet
        </button>
      </div>
    </>
  )
}

export default Header
