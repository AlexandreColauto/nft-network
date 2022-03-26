import React, { useEffect, useState, useRef } from 'react'
import { useMoralis } from 'react-moralis'
import Card from './Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

function Carousel() {
  const [collections, setCollections] = useState([
    { name: '', logo: '', owner: '' }
  ])
  const { Moralis, isAuthenticated, user } = useMoralis()
  const Collections = Moralis.Object.extend('collections')
  const query = new Moralis.Query(Collections)
  const carousel = useRef<HTMLDivElement>(null)
  useEffect(() => {
    fetchVips()
  }, [isAuthenticated])

  async function fetchVips() {
    if (!isAuthenticated) return
    const results = await query.find()
    const _collections = results.map((collection) => {
      return {
        name: collection.attributes.name,
        owner: collection.attributes.owner,
        logo: collection.attributes.image._url
      }
    })
    console.log(_collections)
    setCollections(_collections)
  }

  async function left(e: { preventDefault: () => void }) {
    if (carousel.current) {
      carousel.current.scrollLeft -= 300
    }
  }
  async function right(e: { preventDefault: () => void }) {
    if (carousel.current) {
      console.log(carousel.current)
      carousel.current.scrollLeft += 300
    }
  }
  return (
    <div className="flex ml-4">
      <button onClick={(e) => left(e)} className="text-white ">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div
        className="flex snap-x max-w-[300px] md:max-w-[600px] lg:max-w-[900px] py-2 overflow-x-scroll no-scrollbar scroll-smooth"
        ref={carousel}
      >
        {collections.length > 0 &&
          collections.map((collection, id) => (
            <div key={id} className="shrink-0 snap-center w-[268px] mx-4">
              <Card
                name={collection.name}
                logo={collection.logo}
                owner={collection.owner}
              />
            </div>
          ))}
      </div>
      <button onClick={(e) => right(e)} className="text-white   ">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}

export default Carousel
