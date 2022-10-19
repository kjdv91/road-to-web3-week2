require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-ethers");
require("dotenv/config")


const ALCHEMY_URL = process.env.ALCHEMY_URL;
const GOERLI_KEY = process.env.PRIVATE_KEY;


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.4",

  networks:{
    goerli:{
      url: ALCHEMY_URL,
      accounts:[GOERLI_KEY],
    }
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
