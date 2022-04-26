import Moralis from 'moralis/types'
import React, { useEffect, useState } from 'react'
import { useMoralis, useMoralisCloudFunction } from 'react-moralis'

function SignupEmail() {
  const [email, setEmail] = useState('')
  const [password, setPassworld] = useState('')
  const [emailUser, setEmailUser] = useState(false)
  const { Moralis, isAuthenticated, web3, logout, user } = useMoralis()

  const handleSubmit = async (e: any) => {
    const _user = new Moralis.User()
    e.preventDefault()
    console.log(email)
    console.log(password)
    _user.set('username', email)
    _user.set('email', email)
    _user.set('password', password)

    try {
      await _user.signUp()
      alert('User signed up')
      setEmailUser(true)
    } catch (error: any) {
      // Show the error message somewhere and let the user try again.
      alert('Error: ' + error.code + ' ' + error.message)
    }
  }

  return (
    <div>
      <div className="m-6 p-6 text-white bg-secondary flex flex-col justify-center items-center h-4/12 rounded-xl w-min md:w-[885px] min-h-[600px]">
        <>
          <p className="text-4xl mb-8">Singup using email</p>
          <form onSubmit={handleSubmit}>
            <input
              className="border-2 mt-2 min-w-50 border-violet-700 bg-[#1A192A]/60 mr-auto h-10 px-5 pr-16 rounded-xl text-md focus:outline-none"
              type="text"
              value={email}
              placeholder="Enter your email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />

            <input
              type="password"
              value={password}
              className="border-2 mb-2 mt-1 min-w-50 border-violet-700 bg-[#1A192A]/60 mr-auto h-10 px-5 pr-16 rounded-xl text-md focus:outline-none"
              placeholder="Enter your password"
              onChange={(e) => setPassworld(e.target.value)}
            />
            <br />
            <button
              className="text-white my-4 bg-violet-700 hover:bg-violet-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="submit"
            >
              Create account
            </button>
          </form>
        </>
      </div>
    </div>
  )
}

export default SignupEmail
