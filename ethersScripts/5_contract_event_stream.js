const { ethers } = require("ethers");
const fs = require("fs")

require("dotenv").config()
const infuraKey = process.env.INFURA_API_KEY
const provider = new ethers.JsonRpcProvider(infuraKey)

const privateKey = process.env.PRIVATE_KEY2

const account1 = "0xA2Fe4DB02C5907f3e477F7dD5550d8aA4D5081AE" //recipient
const account2 = "0x47447fB5F2Bb45E2c7A0463313D3e5EA2e75e101" //sender

const rawFile = fs.readFileSync("/home/ardakl/nft-project/ethersScripts/5_contract_event_stream.json", "utf8")
const parsedFile = JSON.parse(rawFile)
const ERC20_ABI = parsedFile.abi

const address = '0x347ED05772Dda65d3367A29dD12ba5fE72224961'
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {

    const transferEvents = await contract.queryFilter("Transfer", 6685077, 6685137)
    console.log(transferEvents.length)
}

main()