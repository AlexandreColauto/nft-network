import React, { Component } from 'react'
import Logo from './logo.png'
import Image from 'next/image'
import SearchBar from './Search'
import { useMoralis } from 'react-moralis'

const Header = () => {
  const { isAuthenticated, authenticate } = useMoralis()
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
