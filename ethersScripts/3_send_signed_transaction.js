const { ethers } = require("ethers");

require("dotenv").config()
const infuraKey = process.env.INFURA_API_KEY
const provider = new ethers.JsonRpcProvider(infuraKey)

const account1 = "0xA2Fe4DB02C5907f3e477F7dD5550d8aA4D5081AE" //recipient
const account2 = "0x47447fB5F2Bb45E2c7A0463313D3e5EA2e75e101" //sender

const privateKey = process.env.PRIVATE_KEY_2
const wallet2 = new ethers.Wallet(privateKey, provider) //wallet of account 2


const main = async () => {
    //Show account balances
    const balance1 = await provider.getBalance(account1)
    const balance2 = await provider.getBalance(account2)
    console.log(`BEFORE THE TRANSACTİON\nThe balance of the account1 is ${balance1}\nand the balance of the account2 is ${balance2}`)


    //Send Ether
    const tx = await wallet2.sendTransaction({
        to: account1,
        value: ethers.parseEther("0.02")
    })

    //Wait for transaction to be mined
    await tx.wait()
    console.log(tx,`AFTER THE TRANSACTİON\nThe balance of the account1 is ${balance1}\nand the balance of the account2 is ${balance2}` )

}

main()