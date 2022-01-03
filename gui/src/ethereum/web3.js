import Web3 from "web3";
var HDWalletProvider = require("truffle-hdwallet-provider");

const provider = new HDWalletProvider(
  "surround sweet hover behind seek meadow apology recall toilet wrap news debris",
  "http://127.0.0.1:8545"
);

export default new Web3(provider);
