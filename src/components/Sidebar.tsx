import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'
function Sidebar() {
  return (
    <div>
      <aside className="w-64 ml-7 mb-8" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-secondary text-white rounded-xl dark:bg-secondary">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FontAwesomeIcon icon={faBook} className="text-gray-500 ml-1" />
                <span className="ml-3">Documentation</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img src="/Open_SEA_LOGO.svg" className="w-6 fill-white" />

                <span className="flex-1 ml-3 whitespace-nowrap">OpenSea</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
