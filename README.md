# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system. Additionally a Seller can mark an item as Shipped, and similarly a Buyer can mark an item as Received.

**10.04.2019 - UPDATE:** The Farmer can/must include a picture of the good which will be stored on the IPFS server using the infura API. The Hash of the image will be included in the struct of the good.

**10.05.2019 - UPDATE:**  It now includes the usage of access control which means that the owner of the contract has first to set the different roles (Farmer, Distributor, Retailer), and only these addresses can now execute their respective functions:

* Farmer can only: HARVEST, PROCESS, PACK, SELL

* Distributor can only: BUY, SHIP

* Retailer can only: RECEIVE

**CURRENT:** live version of contract: [ETHERSCAN](https://rinkeby.etherscan.io/address/0x33cb39Ba7E4a9818d03abB9211c966520c7f04a8)

**OTHER UPDATES COMING SOON**

## Getting Started

These instructions will get you a copy of the supply chain and lets you run the client on the local machine and deploys your own supply chain contract to the love test network rinkeby.

### Prerequisites

Please make sure you've enabled [MetaMask extension](https://metamask.io/) in your browser and [gulp](https://gulpjs.com/) installed.

### Installing and Using the Supply Chain Contract for Yourself on the RINKEBY TESTNETWORK

1. Clone this repository:

    ```bash
    $ git clone https://github.com/Userrick/Simple-Supply-Chain-Udacity
    ```

2. Install all requisite npm packages (as listed in ```package.json```):

    ```bash
    $ npm install
    ```

3. Create a new file in the project folder with the name **migration-secrets.js**:

    ```bash
    $ touch migration-secrets.js
    ```

4. Copy the following into it:

    ```javascript
    const secrets = {
        mnemonic: "YOUR-SEED-WORDS-FROM-METAMASK-ACCOUNT",
        ENDPOINT: "YOUR-INFURA-ENDPOINT_KEY"
    }

    module.exports = secrets;
    ```

5. Follow [this guide](https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-Reveal-Your-Seed-Phrase) to reveal your seed words from your METAMASK account. 

    a) **Be sure to be on the rinkeby testnetwork**

    b) Copy your seed words from your METAMASK into the respective marked section of the **secrets-migration.js** file


6. Visit the [infura website](https://www.infura.io) 

    a) login or create account

    b) create a new project 

    c) COPY the endpoint from the project to clipboard

    ![alt text][INFURA-key]

    [INFURA-key]: https://github.com/Userrick/Simple-Supply-Chain-Udacity/tutorial-images/INFURA-key.PNG "INFURA-key"

    d) PASTE it into the **secrets-migration.js** file

7. Now launch your personal supply chain to the network by following these commands:

    ```bash
    $ truffle compile

    $ truffle migrate --reset --network rinkeby
    ```

8. Now launch the client by the following command:

    ```bash
    $ npm run dev
    ```

    In your browser, you should now be able to connect it via METAMASK on the rinkeby test network and be able to use it

    **If you encounter some issues let me know!**

    **Enjoy!**

### Running the Tests

1. Install ganache-cli

    ```
    $ npm install -g ganache-cli
    ```

2. Open a seperate terminal window and run ganache-cli:

    ```
    ganache-cli -m "spirit supply whale amount human item harsh scare congress discover talent hamster"
    ```

3. Run the tests:

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

Starter code was provided by [Udacity](https://github.com/udacity/nd1309-Project-6b-Example-Template)


## Acknowledgments

* Solidity
* Truffle
* IPFS
