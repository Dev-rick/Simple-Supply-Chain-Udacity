# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system. Additionally a Seller can mark an item as Shipped, and similarly a Buyer can mark an item as Received.

## Contract Address

SupplyChain.sol: [ETHERSCAN](https://rinkeby.etherscan.io/address/0x33cb39Ba7E4a9818d03abB9211c966520c7f04a8)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please make sure you've already enabled MetaMask extension in your browser and gulp installed.

```
Give examples (to be clarified)
```

### Installing

A step by step series of examples that tell you have to get a development env running

Clone this repository:

```
git clone https://github.com/
```

Install all requisite npm packages (as listed in ```package.json```):

```
npm install
```

Launch Application locally and open your browser at localhost:3000:

```
npm run dev
```

In your browser, you can now connect to the contract and be able to use it

Please be aware that Error handling is still under development and will be updated soon.


Enjoy!

### Running the Tests

Install ganache-cli

Open a seperate terminal window and run:

```
ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
```

then:

```
truffle test
```


## Built With

* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
* [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
to make the web faster, safer, and more open. Is used via the API of INFURA ipfs.infurs.io to save the image.
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier. 
* [Gulp](https://gulpjs.com/) - Is used as building tool for e.g. to minify, convert ES6 to ES5, etc 
* [truffle-hdwallet-provider](https://github.com/trufflesuite/truffle-hdwallet-provider) - HD Wallet-enabled Web3 provider. Use it to sign transactions for addresses derived from a 12-word mnemonic.
* [NODE + NPM](https://github.com/nodejs/node) 

## Version Used

* Truffle v5.0.17 (core: 5.0.16)
* Solidity v0.5.0 (solc-js)
* Node v10.15.3
* Web3.js v1.0.0-beta.37

## Authors

Starter code was provided by [Udacity]https://github.com/udacity/nd1309-Project-6b-Example-Template


## Acknowledgments

* Solidity
* Truffle
* IPFS
