import React, { Component } from 'react'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'
import VIP from './VIP'
import DonationWallets from './Donations'

export default class Layout extends Component<Record<string, unknown>> {
  constructor(props: Record<string, unknown>) {
    super(props)
  }
  render() {
    return (
      <>
        <div className="bg-primary h-full w-max">
          <Header />
          <div className="flex">
            <div>
              <Sidebar />
              <VIP />
              <DonationWallets />
            </div>
            <div className="h-screen bg-primary">{this.props.children}</div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}
