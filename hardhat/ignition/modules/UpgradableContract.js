const ethers = require("hardhat")
const fs = require("fs")
require("dotenv").config({path: "/home/ardakl/web3-javascript-libraries/hardhat/.env"})

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TokenModule = buildModule("Proxy", (m) => {
  const upgradableContract = m.contract("UpgradableContract", [42], {initializer: "initialize"});

  return { upgradableContract };
});

module.exports = TokenModule;

/*

The problem with deploying an upgradable smart contract with the newest version of ethers.js (v^6.0.0) is that it doesn't
allow me to use fallowing piece of code. And I could not find a way to get this done so a little bit of help would be really helpful

async function main () {
    const UpgradableContract = await ethers.contractFactory('UpgradableContract');
    console.log('Deploying upgradableContract...');
    const upgradableContract = await upgrades.deployProxy(UpgradableContract, [42], { initializer: 'store' });
    await UpgradableContract.waitForDeployment();
    console.log('upgradableContract deployed to:', await UpgradableContract.getAddress());
}

main();

*/