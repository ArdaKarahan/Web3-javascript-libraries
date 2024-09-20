const Web3 = require("web3").default
const fs = require("fs")


require("dotenv").config()
const infuraKey = process.env.INFURA_API_KEY
const web3 = new Web3(infuraKey)

const account = "0x47447fB5F2Bb45E2c7A0463313D3e5EA2e75e101"

const privateKey = process.env.PRIVATE_KEY_2

async function sendTransaction() {

    //Build the transaction
    const txCount = await web3.eth.getTransactionCount(account)

    const rawData = await fs.promises.readFile("DeployContract.json", "utf8")
    const parsedData = JSON.parse(rawData)
    const data = parsedData.data

    const txObject = {
        nonce:txCount,
        gas: 1000000,
        gasPrice:web3.utils.toWei("20", "Gwei"),
        data: web3.utils.toHex(data)
    }


    await web3.eth.accounts.signTransaction(txObject, privateKey).then(signedTx => {
        //Sign the transaction
        const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);

        sentTx.on("receipt", receipt => {
            console.log("receipt: ", receipt);
        });

        sentTx.on("error", err => {
            console.log(err.message)
        });
    });

    //Broadcast the Signed transaction
}

sendTransaction()