const HDWalletProvider = require("truffle-hdwallet-provider");

const secret = "0x846131299a291e1439d571cab792ff914ea71a497503eab17622234bfdf44516";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
      from: "0x228099a04cF7cCc537c815883e09836EA29307bf",
      gas: 6721975,
      gasPrice: 20000000000,
    },
    test: {
      provider: () => new HDWalletProvider(secret, "http://localhost:8545"),
      port: 8545,
      from: "0x606e76510Ea0D34F0C9afc19f56B230839809bb9",
      network_id: "1641221078120",
    },
  },
  compilers: {
    solc: {
      version: "0.4.17", // ex:  "0.4.20". (Default: Truffle's installed solc)
    },
  },
};
