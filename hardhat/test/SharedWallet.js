const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SharedWallet", function () {
    let sharedWallet, owner, addr1, addr2;

    beforeEach(async () => {
        // Get signers
        [owner, addr1, addr2] = await ethers.getSigners();

        // Deploy the contract
        sharedWallet = await ethers.deployContract("SharedWallet");

        // Wait for deployment
        await sharedWallet.waitForDeployment();
    });

    it("Right owner", async () => {
        // Check if the owner is correct
        expect(await sharedWallet.owner()).to.equal(owner.address);
        console.log("Owner address:", owner.address);
    });

    it("Check if address is allowed", async() => {
        const addressToAllow = addr1.address

        await sharedWallet.setAllowed(addressToAllow)

        const [allowedInSolidity, IsAllowed] = await sharedWallet.checkAlloweds(0)

        console.log("Allowed Address in Solidity:", allowedInSolidity);
        console.log("Address to Allow:", addressToAllow);

        expect(allowedInSolidity).to.equal(addressToAllow)
        expect(IsAllowed).to.be.true
    })

    it("Check balance", async() => {
        const balance = await sharedWallet.getBalance(owner)
        expect(balance).to.equal(0)
    })

    it("Should accept deposits", async() => {
        await owner.sendTransaction({
            to: sharedWallet.getAddress(),
            value: ethers.parseEther("5.0")
        });
        
        const balance = await ethers.provider.getBalance(await sharedWallet.getAddress());
        expect(balance).to.equal(ethers.parseEther("5.0"));
    })

    it("Should allow the allowed to withdraw", async() => {
            
        await sharedWallet.setAllowed(addr1.address)

        const amountToDeposit = ethers.parseEther("1.0")

        console.log(await ethers.provider.getBalance(sharedWallet.getAddress()))

        await sharedWallet.connect(addr1).depositMoney({
            value: amountToDeposit
        })

        console.log(await ethers.provider.getBalance(sharedWallet.getAddress()))

        await expect(sharedWallet.connect(addr1).withdrawMoney(addr2.address, ethers.parseEther("0.5")))
        .to.changeEtherBalance(addr2, ethers.parseEther("0.5"))

        console.log(await ethers.provider.getBalance(sharedWallet.getAddress()))
    })

    describe("Check if the allowance functions work properly", () => {
        
        it("Neither owner or allowed", async() => {
            await sharedWallet.setAllowed(addr1.address)

            const amountToDeposit = ethers.parseEther("1.0")

            await expect(sharedWallet.connect(addr2).depositMoney({
                value: amountToDeposit
            })).to.be.revertedWith("You are not the owner and you are not allowed")
        })

        it("setNotAllowed function working", async() => {
            await sharedWallet.setAllowed(addr1.address)

            console.log(await ethers.provider.getBalance(sharedWallet.getAddress()))

            await sharedWallet.connect(addr1).depositMoney({
                value: ethers.parseEther("10.0")
            })

            console.log(await ethers.provider.getBalance(sharedWallet.getAddress()))

            await expect(sharedWallet.connect(addr1).withdrawMoney(addr2, ethers.parseEther("5.0")))
            .to.changeEtherBalance(addr2, ethers.parseEther("5.0"))

            console.log(await ethers.provider.getBalance(sharedWallet.getAddress()))

            await sharedWallet.setNotAllowed(addr1.address)

            await expect(sharedWallet.connect(addr1).depositMoney({
                value: ethers.parseEther("10.0")
            })).to.be.revertedWith("You are not the owner and you are not allowed")
        })
    })
});