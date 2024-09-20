const {ethers} = require("ethers")
const fs = require("fs")

require("dotenv").config()
const infuraKey = process.env.INFURA_API_KEY
const provider = new ethers.JsonRpcProvider(infuraKey)

const account1 = "0xA2Fe4DB02C5907f3e477F7dD5550d8aA4D5081AE" //recipient
const account2 = "0x47447fB5F2Bb45E2c7A0463313D3e5EA2e75e101" //sender

const privateKey = process.env.PRIVATE_KEY_2 //private key of account2
const wallet2 = new ethers.Wallet(privateKey, provider) //wallet of account2

const contractAddress = "0xb37061012dE022f2Bf58cc8bb55976b82EDFAfe3"
const rawFile = fs.readFileSync("/home/ardakl/nft-project/ethersScripts/4_write_contract.json", "utf-8")
const parsedFile = JSON.parse(rawFile)
const ERC20_ABI = parsedFile.abi

const contract = new ethers.Contract(contractAddress, ERC20_ABI, wallet2)

const main = async () => {
    const contractWithWallet = contract.connect(wallet2)

    const tx = await contractWithWallet.transfer(account1, ethers.parseEther("0.3"))
    await tx.wait()
    
    console.log(tx)
}

main()