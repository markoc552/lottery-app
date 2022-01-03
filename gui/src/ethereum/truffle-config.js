const HDWalletProvider = require("truffle-hdwallet-provider");

const secret = "0xd5c4025e69925fa4e34b7191114c31b90f057cc5365f983d56d660f8b7b1144b";

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
      from: "0x0eFE752fDb45630eE7DFa343C4f9AAB9FB796a9c",
      network_id: "1641241116655",
    },
  },
  compilers: {
    solc: {
      version: "0.4.17", // ex:  "0.4.20". (Default: Truffle's installed solc)
    },
  },
};
