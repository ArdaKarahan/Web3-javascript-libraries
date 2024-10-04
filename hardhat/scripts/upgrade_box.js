// scripts/upgrade_box.js
const { ethers, upgrades } = require('hardhat');

async function main () {
  const BoxV2 = await ethers.getContractFactory('BoxV2');
  console.log('Upgrading Box...');
  await upgrades.upgradeProxy('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', BoxV2);
  console.log('Box upgraded');
}

main();