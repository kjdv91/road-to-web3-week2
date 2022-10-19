const { ethers } = require("hardhat");
const hre = require("hardhat");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");




// async function getBalance(address){
//     const balanceBigInt = await hre.waffle.provider.getBalance(address);
//     return hre.ethers.utils.formatEther(balanceBigInt);

// }

// //Logs the ether balances for a list addresses
// async function printBalance(addresses){
//     let index =0;
//     for(const address of addresses){
//         console.log(`Address ${index} balance: `, await getBalance(address)  );
//         index++;

//     }

// }

// //logs the memo stored-on-chain from coffee purcharse

async function printMemos(memos){
    for(const memo of memos){
        const timestamp = memo.timestamp;
        const tipper = memo.name;
        const tipperAddress = memo.from;
        const message = memo.message;
        console.log(`At ${timestamp}, ${tipper}, {${tipperAddress}} said: "${message}" `);

    }

}
async function main() {
    //Get example accounts'
    const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();
    //Get the contract deploy

    const BuyCoffee = await hre.ethers.getContractFactory("BuyMeACoffee");
    const coffee = await BuyCoffee.deploy();
    //Deploy Contract
    await coffee.deployed();
    console.log("BuyMeACoffee deployed to", coffee.address);

    

    const contractBalance = await ethers.provider.getBalance(coffee.address);

    
    

    
    //check balances before the coffee purcharses
    
    const tipAddresses = [tipper.address, tipper2.address, tipper3.address ];
    const addressImportants = [owner.address, coffee.address]
    
    const formatOwner = await ethers.provider.getBalance(addressImportants[0]);
     const formatContract = await ethers.provider.getBalance(addressImportants[1]);
   
    
    
    
    
    //console.log("Wallets \n", tipAddresses.toString());  addresses of wallets
    
    let contWalletTips =1;
    for(addressBalance in tipAddresses){
        const addressBalances = await ethers.provider.getBalance(tipAddresses[addressBalance]);
        //I go through the wallets
        console.log("Balance  tipper  #"  + contWalletTips + " " +  tipAddresses[addressBalance].toString()   , addressBalances.toString() + "\n");
        contWalletTips++

    }
    console.log("-----------------------------------------------");
    console.log("Owner's Balance:  " + formatOwner + " ethers");
    console.log("Contract's Balance is:  " + formatContract);

   


    

    console.log("==start ==");
    
   
    // await printBalance(addresses);


    //Buy the owner a few coffess
    const tip = {value: hre.ethers.utils.parseEther("1.0")}; //envio 1 ether
    await coffee.connect(tipper).buyACoffee("Kevin"," You're the best", tip);  //function contract
    await coffee.connect(tipper2).buyACoffee("Janina","Amazing teacher", tip);
    await coffee.connect(tipper3).buyACoffee("Danna"," I love proof", tip);
    
    //check balances after coffee purcharse
    console.log("A bought coffee  ==");


    
    for(addressBalance in tipAddresses){
        const addressBalances = await ethers.provider.getBalance(tipAddresses[addressBalance]);
        //I go through the wallets
        console.log("Balance  tipper  #" + " " +  tipAddresses[addressBalance].toString()   , addressBalances.toString() + "\n");
        

    }
    console.log("-----------------------------------------------");
    console.log("Owner's Balance:  " + formatOwner + " ethers" );
    console.log("Contract's Balance is:  " + formatContract);
    //withdraw funds

    await coffee.connect(owner).withdraw();


    //Read all memos left for the owner
    console.log("Memos");
    const memos = await coffee.getMemos()
    printMemos(memos);



    

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });