const { ethers } = require("ethers");
require("dotenv").config()

const infuraKey = process.env.INFURA_API_KEY
const provider = new ethers.JsonRpcProvider(infuraKey)

const main = async () => {
    const block = await provider.getBlockNumber()

    console.log(`\nBlock Number: ${block}\n`)

    const blockInfo = await provider.getBlock(block)

    console.log(blockInfo)
}

main()