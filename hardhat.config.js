require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_API_KEY = `${process.env.ALCHEMY_API_KEY}`;
const SEPOLIA_ACCOUNT_PRIVATE_KEY = `${process.env.SEPOLIA_ACCOUNT_PRIVATE_KEY}`;

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${ALCHEMY_API_KEY}`,
      accounts: [`${SEPOLIA_ACCOUNT_PRIVATE_KEY}`]
    }
  }
};
