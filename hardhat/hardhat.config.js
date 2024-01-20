require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.3",

  networks:{
   
    sepolia:{
      url:process.env.RPC_URL,
      accounts:[process.env.PRIVATE_KEY],
    }

  },

  sourcify: {
    enabled: true
  },

};


