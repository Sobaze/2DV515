const dataHandler = require('./utils/fileHandler')
const naiveBaiye = require ('./naive_bayes')
const main = {}

main.run = async () => {

    const trainBankSet = await dataHandler.banksetReader()

    const trainIrisSet = await dataHandler.irisReader()
    // Bank part
    let bankNaiveBaiyes = naiveBaiye(trainBankSet)
    
    // Iris part
    let irisNaiveBaiyes = naiveBaiye(trainIrisSet)
    
    
}

main.run()