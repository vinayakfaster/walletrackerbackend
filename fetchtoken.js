const { Web3 } = require('web3');
// "Web3.providers.givenProvider" will be set if in an Ethereum supported browser.
var web3 = new Web3(Web3.givenProvider || 'wss://mainnet.infura.io/ws/v3/40d778647310471ea8e99fd4b2039d40')

// Token contract address
const tokenAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';

// Get token holders
web3.eth.getPastLogs({
  address: tokenAddress,
  topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'] // Transfer event topic for ERC-20 tokens
}, (error, logs) => {
  if (!error) {
    // Process logs to get token holders and their balances
    const tokenHolders = logs.map(log => ({
      address: '0x' + log.topics[2].slice(-40), // Extract the address from the log
      balance: web3.utils.hexToNumberString(log.data) // Convert balance from hex to decimal
    }));

    console.log(tokenHolders);
  } else {
    console.error('Error:', error);
  }
});
