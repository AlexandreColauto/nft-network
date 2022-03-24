import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <div className="bg-[#232323] shadow-[0_0_6px_0_rgba(255,255,255,0.4)]  mt-8">
      <div className="flex justify-between px-20 pt-10 text-white">
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
          <li>Item 4</li>
        </ul>
        <div>
          <FontAwesomeIcon icon={faTwitter} className="mx-5" />
          <FontAwesomeIcon icon={faInstagram} />
        </div>
      </div>
    </div>
  )
}

export default Footer
