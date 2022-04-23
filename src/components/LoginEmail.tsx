import Moralis from 'moralis/types'
import React, { useState } from 'react'
import { useMoralis } from 'react-moralis'

function LoginEmail() {
  const [email, setEmail] = useState('')
  const [passworld, setPassworld] = useState('')
  const { Moralis, isAuthenticated, web3, user } = useMoralis()
  const [emailUser, setEmailUSer] = useState<Moralis.User>()
  const handleSubmit = async (e: any) => {
    const _user = new Moralis.User()
    e.preventDefault()
    console.log(email)
    console.log(passworld)
    _user.set('username', email)
    _user.set('email', email)
    _user.set('password', passworld)

    try {
      await _user.signUp()
      console.log(_user)
      alert('User signed up')
    } catch (error: any) {
      // Show the error message somewhere and let the user try again.
      alert('Error: ' + error.code + ' ' + error.message)
    }
  }
  const login = async (e: any) => {
    try {
      await Moralis.User.logOut()

      const emailUser = await Moralis.User.logIn(email, passworld)
      // Do stuff after successful login.
      console.log(emailUser.get('sessionToken'))
      //Moralis.User.become(emailUser.get('sessionToken'))
      if (!user) return
      console.log(user)
      const accounts = user.get('accounts')
      if (accounts && accounts.length > 0) {
        Moralis.link(accounts[0])
      }
    } catch (error: any) {
      // Show the error message somewhere and let the user try again.
      console.log('Error: ' + error.code + ' ' + error.message)
    }
  }

  const handle = async (e: any) => {
    console.log(Moralis.User.current()?.get('email'))
    console.log(Moralis.User.current())
    console.log(user)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          placeholder="Enter your email address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={passworld}
          placeholder="Enter your passworld"
          onChange={(e) => setPassworld(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button type="submit" onClick={handleSubmit} className="bg-white">
        {' '}
        submit
      </button>
      <button type="submit" onClick={login} className="bg-white">
        {' '}
        login
      </button>
      <button onClick={handle} className="bg-white">
        {' '}
        VERIFY
      </button>
    </div>
  )
}

export default LoginEmail
