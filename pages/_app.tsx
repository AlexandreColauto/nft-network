import '../styles/globals.css'
import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Layout from '../src/components/Layout'
import { MoralisProvider, useMoralis } from 'react-moralis'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const APP_ID = process.env.NEXT_PUBLIC_APP_ID
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

function MyApp({ Component, pageProps }: AppProps) {
  if (!APP_ID || !SERVER_URL) return
  return (
    <React.StrictMode>
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <div className="bg-[#110B3A] bg-cover">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </MoralisProvider>
    </React.StrictMode>
  )
}

export default MyApp
