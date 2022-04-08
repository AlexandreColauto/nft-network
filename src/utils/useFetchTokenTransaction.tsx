import { useMoralisWeb3Api, useMoralis } from 'react-moralis'

function useFetchTokenTransaction() {
  const Web3Api = useMoralisWeb3Api()
  const { Moralis } = useMoralis()

  const fetchTokenMetadata = async (address: string, id: string) => {
    const chainId = await Moralis.chainId
    if (!address || !chainId) return
    const tokenMetadata = await Web3Api.token.getWalletTokenIdTransfers({
      chain: chainId as any,
      address: address,
      limit: 5,
      token_id: id
    })

    return tokenMetadata.result
  }

  return fetchTokenMetadata
}

export default useFetchTokenTransaction
