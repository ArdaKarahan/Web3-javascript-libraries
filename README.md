The thing with "upload upgradable contract" commit is that it didn't work and I need a little bit of assistance. I shared the details inside the file hardhat/ignition/modules/UpgradableContract.js.
When I try to deploy the contract using -> npx hardhat ignition deploy ignition/modules/UpgradableContract.js --network localhost | I get an error that goes like:

"UpgradableContract takes 0 arguments as parameter for constructor though it has been passed 1"

Can anyone help about it?


!!!!!
RECENT UPDATE
I upgraded the Box contract using openzeppelin's guide successfully. Yet there is still a problem.
I upgraded the Box contract to BoxV2 contract using npx hardhat run because it was in ./scripts file. This one was from openzeppelin's guide.
The problem is I still don't know how to upgrade a smart contract using hardhat's guide (within the ignition module)
If anyone can help about it I would be glad. Thank you.
