import { useMoralisWeb3Api } from 'react-moralis'

function useFetchTokenTransaction() {
  const Web3Api = useMoralisWeb3Api()

  const fetchTokenMetadata = async (address: string, id: string) => {
    console.log(address)
    if (!address) return
    const tokenMetadata = await Web3Api.token.getWalletTokenIdTransfers({
      chain: 'bsc',
      address: address,
      limit: 5,
      token_id: id
    })

    return tokenMetadata.result
  }

  return fetchTokenMetadata
}

export default useFetchTokenTransaction
