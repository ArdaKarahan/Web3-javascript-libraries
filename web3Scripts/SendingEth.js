const Web3 = require("web3").default

require('dotenv').config();
const infuraKey = process.env.INFURA_API_KEY
const web3 = new Web3(infuraKey)

const account1 = "0xA2Fe4DB02C5907f3e477F7dD5550d8aA4D5081AE"
const account2 = "0x47447fB5F2Bb45E2c7A0463313D3e5EA2e75e101"

const privateKey1 = process.env.PRIVATE_KEY_1
const privateKey2 = process.env.PRIVATE_KEY_2

//Check the account balances
web3.eth.getBalance(account1).then(bal => {
    console.log(web3.utils.fromWei(bal, "ether"))
})

web3.eth.getBalance(account2).then(bal => {
    console.log(web3.utils.fromWei(bal, "ether"))
})

async function sendTransaction() {

    //Build the transaction
    const txCount = await web3.eth.getTransactionCount(account1)

    const txObject = {
        nonce:txCount,
        to:account2,
        value: web3.utils.toWei("50000000", "Gwei"),
        gas: 21000,
        gasPrice:web3.utils.toWei("50", "Gwei")
    }


    await web3.eth.accounts.signTransaction(txObject, privateKey1).then(signedTx => {
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

//Check the account balances again
web3.eth.getBalance(account1).then(bal => {
    console.log(web3.utils.fromWei(bal, "ether"))
})

web3.eth.getBalance(account2).then(bal => {
    console.log(web3.utils.fromWei(bal, "ether"))
})
