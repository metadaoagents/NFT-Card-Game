require('babel-register');
require('babel-polyfill');

const HDWalletProvider=require('@truffle/hdwallet-provider');


const privateKeys= ['0x7d9fcf527e5d9e3a1f53624f7f6e']


module.exports = {
  networks: {

    ethTestnet:{
      provider: ()=> new HDWalletProvider(
        privateKeys,
        // 'https://rinkeby.infura.io/v3/275206eb633a43f39b5ea3bbebf79f87'
        'https://rinkeby.infura.io/v3/29e350a5c5b349f2b9809e8f864b8d0b'
        ),
      network_id:4,
      skipDryRun:true
    },

    bscTestnet:{
      provider: ()=> new HDWalletProvider(
        privateKeys,
        'https://data-seed-prebsc-1-s1.binance.org:8545/'
        // 'https://speedy-nodes-nyc.moralis.io/aa7c2acc609ad50757ee9554/avalanche/testnet'
        ),
      network_id:97,
      skipDryRun:true
    },

    bsc:{
      provider: ()=> new HDWalletProvider(
        privateKeys,
        'https://bsc-dataseed.binance.org/'
        ),
      network_id:56,
      skipDryRun:true
    },


    avax:{
      provider: ()=> new HDWalletProvider(
        privateKeys,
        'https://api.avax-test.network/ext/bc/C/rpc'
        ),
      network_id:43113,
      skipDryRun:true
    },




    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
