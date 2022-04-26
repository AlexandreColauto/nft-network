import Moralis from 'moralis/types'
import React, { useEffect, useState } from 'react'
import { useMoralis, useMoralisCloudFunction } from 'react-moralis'
import ToastSuccess from './ToastSuccess'
import { useRouter } from 'next/router'

function LoginEmail() {
  const [email, setEmail] = useState('')
  const [password, setPassworld] = useState('')
  const { Moralis, isAuthenticated, logout, user } = useMoralis()
  const [emailUser, setEmailUser] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const { fetch } = useMoralisCloudFunction('cleanUser', { autoFetch: false })

  useEffect(() => {
    checkEmailUser()
  }, [user])

  const login = async (e: any) => {
    e.preventDefault()

    try {
      const emailUser = await Moralis.User.logIn(email, password)
      setEmailUser(!!emailUser)
      console.log(emailUser)
      if (!isSuccess) {
        setIsSuccess(true)
        router.reload()
        setTimeout(function () {
          setIsSuccess(false)
        }, 5000)
      }
    } catch (error: any) {
      // Show the error message somewhere and let the user try again.
      console.log('Error: ' + error.code + ' ' + error.message)
    }
  }

  const checkEmailUser = () => {
    if (!user) return
    if (user.attributes.email) {
      setEmailUser(true)
      linkAccount()
      console.log(user.attributes.email)
    } else {
      setEmailUser(false)
    }
  }
  const linkAccount = () => {
    console.log('Moralis event')
    Moralis.onAccountChanged(async (account) => {
      console.log('ACCOUNT CHANGED', account)
      console.log(emailUser)
      if (!account) {
        console.log('no account')
        await Moralis.User.logOut()
      } else {
        const confirmed = confirm('Link this address to your account?')
        if (confirmed) {
          try {
            cleanDB(account)
            const user = await Moralis.link(account)
            if (!isSuccess) {
              setIsSuccess(true)
              setTimeout(function () {
                setIsSuccess(false)
              }, 5000)
            }
          } catch (e) {
            console.log(e)
          }
        }
      }
    })
  }

  const cleanDB = async (account: string) => {
    fetch({
      params: { address: account },
      onSuccess: (data) => console.log(data)
    })
  }

  const emailLogout = () => {
    logout()
    setEmailUser(false)
  }

  return (
    <div>
      <div className="m-6 p-6 text-white bg-secondary flex flex-col justify-center items-center h-4/12 rounded-xl w-min md:w-[885px] min-h-[800px]">
        {emailUser ? (
          <>
            <p className="text-4xl mb-8">Already logged in</p>
            <button
              className="text-white my-4 bg-violet-700 hover:bg-violet-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={emailLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <p className="text-4xl mb-8">Login using email</p>
            <form onSubmit={login}>
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
                onClick={login}
              >
                {' '}
                login
              </button>
            </form>
            <p className="w-6/12 mt-36">
              After login, you can link your address just by switch them in your
              metamask, then a promp will ask you to link. Once the address is
              linked you cannot use the metamask login with that account, the
              address will be tied to the email.
            </p>
          </>
        )}
      </div>
      {isSuccess && <ToastSuccess isOpen={true} toggle={setIsSuccess} />}
    </div>
  )
}

export default LoginEmail
