function useShorten() {
  const shorten = (address?: string) => {
    if (!address) return ''
    return (
      address.substring(0, 4) + '...' + address.substring(address.length - 4)
    )
  }
  return shorten
}

export default useShorten
