const { ethers } = require("ethers");
const fs = require("fs")
require("dotenv").config()
const infuraKey = process.env.INFURA_API_KEY

const provider = new ethers.JsonRpcProvider(infuraKey)


const file = fs.readFileSync("/home/ardakl/nft-project/ethersScripts/2_read_smart_contract.json", "utf-8")
const parsedFile = JSON.parse(file)
ERC20_ABI = parsedFile.abi

const address = '0x2e5221B0f855Be4ea5Cefffb8311EED0563B6e87'
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const name = await contract.name()
    const symbol = await contract.symbol()

    console.log(`\nReading from ${address}\n`)
    console.log(`Name: ${name}\n`)
    console.log(`Symbol: ${symbol}\n`)
}

main()