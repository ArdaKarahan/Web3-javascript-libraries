const Web3 = require("web3").default

require("dotenv").config()
const infuraKey = process.env.INFURA_API_KEY
const web3 = new Web3(infuraKey)

const _ = web3.utils._
console.log(_)