const {ethers} = require("ethers")
require("dotenv").config()
const infuraKey = process.env.INFURA_API_KEY

const provider = new ethers.JsonRpcProvider(infuraKey)

const main = async () => {
    const balance = await provider.getBalance("0x47447fB5F2Bb45E2c7A0463313D3e5EA2e75e101")
    console.log(`This acount has a balance of ${ethers.utils.formatEther(balance)}`)
}

main()