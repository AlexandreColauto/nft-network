Moralis.Cloud.define("nfthistory", async (request) => {
  const logger = Moralis.Cloud.getLogger();
  const nullAddress = '0x0000000000000000000000000000000000000000';
logger.info('here')
  const tokenMetadata = await Moralis.Web3API.account.getNFTTransfers({
    chain: 'polygon',
    address: request.params.address,
    limit: 2
  });
 if (tokenMetadata.result?.length) {
   
    const nftList = await Promise.all(
      tokenMetadata.result.map(async (token) => {
        const _token = {
          from_address: token.from_address,
          to_address: token.to_address,
          token_address: token.token_address,
          token_id: token.token_id,
          transaction_type: ''
        };
        if (token.from_address == nullAddress) {
          token.transaction_type = 'mint';
        } else if (token.from_address == request.params.address.toLowerCase()) {
          token.transaction_type = 'sell';
        } else if (token.to_address == request.params.address.toLowerCase()) {
          token.transaction_type = 'buy';
        }
        const metadata = await Moralis.Web3API.token.getTokenIdMetadata({
              address: token.token_address,
              token_id:  token.token_id,
              chain: request.params.chain
            });
        token.metadata = metadata;
        logger.info(metadata);
        return token;
      })
    )
    return nftList;
  }
  }
)