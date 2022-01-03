var FactorySBA = artifacts.require("Lottery")


module.exports = async function(deployer) {
  await deployer.deploy(FactorySBA);
};
