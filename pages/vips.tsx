import React, { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import NFTCard from '../src/components/NFTCard'
import NFTMetadataTile from '../src/components/NFTMetadataTile'
import NFTMetadataTileHeader from '../src/components/NFTMetadataTileHeader'
import useFetchMeta from '../src/utils/useFetchUserMeta'
interface NFT {
  image: string
  collectionName: string
  itemName: string
  token_address: string
  token_id: string
}
function Vips() {
  const fetchTokenMetadata = useFetchMeta()
  const [nftlist, setNFT] = useState<any>()

  const { web3 } = useMoralis()

  const address = '0x84a06352a0FcA910E9495305a2776Aa677543a27'

  useEffect(() => {
    fetchMetadata()
    filterNFTs()
  }, [web3])

  const filterNFTs = () => {
    if (!nftlist) return
    const _nftlist = nftlist.filter((nft: { image: any }) => {
      return nft.image !== '/No-Image-Placeholder.svg'
    })
    console.log(_nftlist)
    setNFT(_nftlist)
  }
  const fetchMetadata = async () => {
    //const meta = await fetchHistory(address as string)
    if (web3) {
      console.log('fetch history')
      const metadata = await fetchTokenMetadata(address as string)
      const _nftlist = metadata?.filter((nft: { image: any }) => {
        return nft.image !== '/No-Image-Placeholder.svg'
      })
      setNFT(_nftlist)
    }
  }
  return (
    <div>
      <div className="m-6 p-6 text-white bg-secondary  rounded-xl w-min md:w-[885px] min-h-[1200px]">
        <>
          <div className="flex flex-wrap justify-around">
            {nftlist &&
              nftlist.map((nft: NFT, index: number) => (
                <NFTCard key={index} {...nft} />
              ))}
          </div>
        </>
      </div>
    </div>
  )
}

export default Vips
