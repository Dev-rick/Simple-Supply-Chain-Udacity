/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
*/

var HDWalletProvider = require('truffle-hdwallet-provider');
const secrets = require('./migration-secrets');

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: () => new HDWalletProvider(secrets.mnemonic, secrets.ENDPOINT),
      network_id: 4,
      gas : 4500000,
      gasPrice : 10000000000
    },
  },
  compilers: {
    solc: {
      version: "0.5.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
};


/*
1) Open a Terminal window, and make sure you are inside your project directory

2) truffle develop (to run a local ethereum network)

3) compile (to compile your solidity contract files)

4) migrate (to deploy your contract to the locally running ethereum network)

5) truffle migrate --reset --network rinkeby
*/
