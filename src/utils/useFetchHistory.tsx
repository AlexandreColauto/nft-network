import { useMoralisWeb3Api, useMoralis } from 'react-moralis'

function useFetchHistory() {
  const Web3Api = useMoralisWeb3Api()
  const { Moralis } = useMoralis()
  const nullAddress = '0x0000000000000000000000000000000000000000'

  const fetchTokenMetadata = async (address: string) => {
    const chainId = await Moralis.chainId
    if (!address || !chainId) return
    const tokenMetadata = await Web3Api.account.getNFTTransfers({
      chain: chainId as any,
      address: address,
      limit: 15
    })
    if (tokenMetadata.result?.length) {
      tokenMetadata.result.map((token) => {
        if (token.from_address == nullAddress) {
          token.transaction_type = 'mint'
        } else if (token.from_address == address.toLowerCase()) {
          token.transaction_type = 'sell'
        } else if (token.to_address == address.toLowerCase()) {
          token.transaction_type = 'buy'
        }
      })
      return tokenMetadata.result
    }
  }

  return fetchTokenMetadata
}

export default useFetchHistory
