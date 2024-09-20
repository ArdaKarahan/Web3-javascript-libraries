const Web3 = require("web3").default
const fs = require("fs")

const infuraKey = process.env.INFURA_API_KEY
const web3 = new Web3(infuraKey)

//Get the abi array from the json file
const rawData = fs.readFileSync("ListenEvents.json", "utf8")
const parsedData = JSON.parse(rawData)
const abiArray = parsedData.abiArray

//Get the contract address
const contractAddress = "0x9a39dC447d97b261595de0B41a7fD4fe8A8c7443"

//deploy the smart contract instance
const contract = new web3.eth.Contract(abiArray, contractAddress);

//listen the events
contract.getPastEvents('allEvents', {
    fromBlock: 6648629,
    toBlock: 'latest'
}, (events) => { console.log(events.length); })
.then((events) => {
    console.log(events)
})