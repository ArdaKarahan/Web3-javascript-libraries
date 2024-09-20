const { error } = require("console")
const ethers = require("ethers")
const fs = require("fs")
require("dotenv").config()

const privateKey = process.env.PRIVATE_KEY_2
const InfuraKey = process.env.INFURA_API_KEY

const provider = new ethers.JsonRpcProvider(InfuraKey)

const wallet = new ethers.Wallet(privateKey, provider)

const rawFile = fs.readFileSync("7_deploy_contract.json")
const parsedFile = JSON.parse(rawFile)
const abi = parsedFile.abi
const bytecode = parsedFile.bytecode

const contractAddress = "0xB098aE7ddc405A6a6F891693e00c8B9895e1a93f"

const main = async() => {
    const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet)

    console.log("Deploying...")

    const contract = await contractFactory.deploy()

    contract.waitForDeployment()

    console.log("contract deployed at: ", contractAddress)
}

main().catch((error) => {
    console.log(error)
})