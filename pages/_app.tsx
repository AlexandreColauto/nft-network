import '../styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { MoralisProvider, useMoralis } from 'react-moralis'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const APP_ID = 'w0I1JAJxvmVnwRJ7fFqU4qCgKkmrHpZpVuLSJuoI'
const SERVER_URL = 'https://ib6vmhqcic5f.usemoralis.com:2053/server'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL} initializeOnMount>
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
