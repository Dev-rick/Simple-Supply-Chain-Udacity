App = {
    ipfs: null,
    web3Provider: null,
    contracts: {},
    emptyAddress: "",
    sku: 1,
    upc: 1,
    upcInput: 1,
    imageSrc: null,
    imageHash: null,
    imageBuffer: null,
    metamaskAccountID: "0x0",
    ownerID: "0x0",
    originFarmerID: "0x0",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "",
    retailerID: "",
    consumerID: "",
    addressOfContract: "0x0",
    
    init: async function () {
        const IPFSAPI = require('ipfs-api');
        App.ipfs = await new IPFSAPI({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
        console.log(App.TruffleContract);
        /// Setup access to blockchain
        return await App.initWeb3();
    },
    
    readForm: async function () {  
        App.getMetaskAccountID()
        App.upc = $("#upc").val()
        App.upcInput = $("#upcInput").val()
        App.originFarmerID = $("#originFarmerID").val();
        App.originFarmName = $("#originFarmName").val();
        App.originFarmInformation = $("#originFarmInformation").val();
        App.originFarmLatitude = $("#originFarmLatitude").val();
        App.originFarmLongitude = $("#originFarmLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.distributorID = $("#distributorID").val();
        App.retailerID = $("#retailerID").val();
        
        console.log(
            App.upc,
            App.upcInput,
            App.imageHash,
            App.originFarmerID, 
            App.originFarmName, 
            App.originFarmInformation, 
            App.originFarmLatitude, 
            App.originFarmLongitude, 
            App.productNotes, 
            App.productPrice, 
            App.distributorID, 
            App.retailerID
            );
    },
        
    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        
        App.getMetaskAccountID();
        
        return App.initSupplyChain();
    },
    
    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);
        
        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];
        })
        $("#address-of-contract-link").html(`<a href="https://rinkeby.etherscan.io/address/${App.metamaskAccountID}">Visit Contract on Etherscan</a>`)
    },
    
    initSupplyChain: async function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
        });
        
        return App.bindEvents();
    },

    bindEvents: function() {
        $(".click-events").on('click', App.handleButtonClick);
        $("#imageOfItem").on('change', App.handleUpdate);
    },

    
    handleUpdate: async function(event) {
        var processId = parseInt($(event.target).data('id'));
        
        
        App.readForm()
        switch(processId) {
            case 13:
                return await App.settingImageHash(event);
                break;
            }
    },

    handleButtonClick: async function(event) {
        event.preventDefault();
        
        App.getMetaskAccountID();
        
        App.readForm()
        var processId = parseInt($(event.target).data('id'));
        
        
        switch(processId) {
            case 1:
                return await App.harvestItem(event);
                break;
            case 2:
                return await App.processItem(event);
                break;
            case 3:
                return await App.packItem(event);
                break;
            case 4:
                return await App.sellItem(event);
                break;
            case 5:
                return await App.buyItem(event);
                break;
            case 6:
                return await App.shipItem(event);
                break;
            case 7:
                return await App.receiveItem(event);
                break;
            case 8:
                return await App.purchaseItem(event);
                break;
            case 9:
                return await App.fetchData(event);
                break;
            case 10:
                return await App.settingRole(event);
                break;
        }
        
    },

    settingRole: async function(event) {
        const instance = await App.contracts.SupplyChain.deployed();
        await App.readForm();
        if (App.originFarmerID) {
            result = await instance.setFarmer(App.originFarmerID, {from: App.metamaskAccountID});
            console.log(result);
        }
        if (App.distributorID) {
            result = await instance.setDistributor(App.distributorID, {from: App.metamaskAccountID});
            console.log(result);
        }
        if (App.retailerID) {
            result = await instance.setRetailer(App.retailerID, {from: App.metamaskAccountID});
            console.log(result);
        }
        window.alert("Role successfully set");
        return;
    },

    settingImageHash: async function(event) {
        event.stopPropagation()
        event.preventDefault()
        const image = event.target.files[0]
        let reader = await new window.FileReader()
        reader.readAsArrayBuffer(image)
        reader.onloadend = () => this.convertToBuffer(reader)
    },

    //Convert the file to buffer to store on IPFS
    convertToBuffer: async function(reader) {
        //file is converted to a buffer for upload to IPFS
        
        const buffer = await Buffer.from(reader.result);
        //set this buffer-using es6 syntax
        App.imageBuffer = buffer;
        
        this.uploadToIPFS()
    },

    uploadToIPFS: async function() {
        await App.ipfs.add(App.imageBuffer, (err, ipfsHash) => {
            console.log(err,ipfsHash);
            App.imageHash = ipfsHash[0].hash;
            $('#upload-complete').html(`<image alt="image of Item" width="30" src="../images/upload-complete.png"/>`)  
        })
    },

    harvestItem: async function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed();
        await App.readForm();        
        let result;
        try {
            result = await instance.harvestItem(
                App.upcInput,
                App.imageHash, 
                App.metamaskAccountID, 
                App.originFarmInformation, 
                App.originFarmLatitude, 
                App.originFarmLongitude, 
                App.productNotes
                , {from: App.metamaskAccountID}); 
                console.log("Harvested", result);     
        } catch(err) {
            console.log(err.message);
            alert(err.message);
        }
        
    },
        
    processItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed();
        let result;
        try {
            result = await instance.processItem(App.upc, {from: App.metamaskAccountID});
            console.log("Processed", result);
        } 
        catch(err) {
            console.log(err.message);
            alert(err.message);
        }
    },

    packItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed();
        let result;
        try {
            result = await instance.packItem(App.upc, {from: App.metamaskAccountID});
            console.log("Packed", result);
        } 
        catch(err) {
            console.log(err.message);
            alert(err.message);
        }
        
    },

    sellItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed();
        let result;
        try {
            result = await instance.sellItem(App.upc, App.productPrice, {from: App.metamaskAccountID});
            console.log("sellItem", result);
        } 
        catch(err) {
            console.log(err.message);
            alert(err.message);
        }
        
    },

    buyItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed();
        let result;
        try {
            result = await instance.buyItem(App.upc, {from: App.metamaskAccountID});
            console.log("buyItem", result);
        } 
        catch(err) {
            console.log(err.message);
            alert(err.message);
        }
        
    },

    shipItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed();
        let result;
        try {
            result = await instance.shipItem(App.upc, {from: App.metamaskAccountID});
            console.log("shipItem", result);
        } catch(err) {
            console.log(err.message);
            alert(err.message);
        }
        

    },

    receiveItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed();
        let result;
        try {
            result = await instance.receiveItem(App.upc, {from: App.metamaskAccountID});
            console.log("receiveItem", result);
        } catch(err) {
            console.log(err.message);
            alert(err.message);
        }
        
    },

    purchaseItem: async function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed();
        let result;
        try {
            result = await instance.purchaseItem(App.upc, {from: App.metamaskAccountID});
            console.log("purchaseItem", result);
        } catch(err) {
            console.log(err.message);
            alert(err.message);
        }
        
    },

    fetchData: async function() {
        App.upc = $("#upc").val();
        let fetchItemBufferOneResult; 
        let fetchItemBufferTwoResult; 
        let fetchItemBufferThreeResult; 
        let fetchItemBufferImageHashResult; 
        
        try{
            fetchItemBufferOneResult = await this.fetchItemBufferOne();
            fetchItemBufferTwoResult = await this.fetchItemBufferTwo();
            fetchItemBufferThreeResult = await this.fetchItemBufferThree();
            fetchItemBufferImageHashResult = await this.getImageHash();
        } catch(err) {
            console.log(err);
            return;
        }
        let state;
        switch(fetchItemBufferTwoResult[6].toString()) {
            case "0":
                state = "Harvested";
                break;
            case "1":
                state = "Processed";
                break;
            case "2":
                state = "Packed";
                break;
            case "3":
                state = "ForSale";
                break;
            case "4":
                state = "Sold";
                break;
            case "5":
                state = "Shipped";
                break;
            case "6":
                state = "Received";
                break;
            case "7":
                state = "Purchased";
                break;
            }

        $("#itemSKULog").html(fetchItemBufferOneResult[0].toString())
        $("#itemUPCLog").html(fetchItemBufferOneResult[1].toString())
        $("#originFarmerIDLog").html(fetchItemBufferOneResult[2])
        $("#originFarmNameLog").html(fetchItemBufferOneResult[3])
        $("#originFarmInformationLog").html(fetchItemBufferOneResult[4])
        $("#originFarmLatitudeLog").html(fetchItemBufferOneResult[5])
        $("#originFarmLongitudeLog").html(fetchItemBufferOneResult[6])
        $("#ownerIDLog").html(fetchItemBufferTwoResult[2])
        $("#productIDLog").html(fetchItemBufferTwoResult[3].toString())
        $("#productNotesLog").html(fetchItemBufferTwoResult[4])
        $("#productPriceLog").html(fetchItemBufferTwoResult[5].toString())
        $("#statusLog").html(state)
        $("#distributorIDLog").html(fetchItemBufferThreeResult[2])
        $("#retailerIDLog").html(fetchItemBufferThreeResult[3])
        $("#consumerIDLog").html(fetchItemBufferThreeResult[4])
        $("#imageItemLog").html(`<image class="image-of-item" alt="image of Item" width="200" src="https://ipfs.infura.io/ipfs/${fetchItemBufferImageHashResult}"/>`)
    },
    fetchItemBufferOne: async function () {
        ///   event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed();
        return instance.fetchItemBufferOne.call(App.upc)
    },

    fetchItemBufferTwo: async function () {
        ///    event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed();
        return instance.fetchItemBufferTwo.call(App.upc)
    },

    fetchItemBufferThree: async function () {
        ///    event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed();
        return instance.fetchItemBufferThree.call(App.upc)        
    },

    getImageHash: async function (event) {
        ///    event.preventDefault();
        ///    var processId = parseInt($(event.target).data('id'));
        const instance = await App.contracts.SupplyChain.deployed();
        return instance.getImageHash.call(App.upc)
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
                );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
            if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
            console.log(err.message);
        });
        
    }
};
$(function () {
    $(window).load(function () {
        App.init();
    });
});