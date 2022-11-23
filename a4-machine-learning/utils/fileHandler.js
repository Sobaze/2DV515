const csvParser = require('csv-parser')
const fs = require('fs')

const irisPath = './Data/Iris/iris.csv'
const banknotePath = './Data/Banknote/banknote_authentication.csv'


const banksetReader = async () => {
    return new Promise((resolve, reject) => {
        let banknoteList = []
        try {
            fs.createReadStream(banknotePath)
                .on('error', (err) => {
                    reject(Error('Problem occured when gathering banknote data'))
                })
                .pipe(csvParser({ separator: ',' }))
                .on('data', (row) => {
                    banknoteList.push(row)
                })
                .on('end', () => {
                    resolve(banknoteList)
                })
        } catch (error) {
            console.log('error in try catch')
        }
    })
}

const irisReader = async () => {
    return new Promise((resolve, reject) => {
        let irisList = []
        try {
            fs.createReadStream(irisPath)
                .on('error', (err) => {
                    reject(Error('Problem occured when gathering iris data'))
                })
                .pipe(csvParser({ separator: ',' }))
                .on('data', (row) => {
                    irisList.push(row)
                })
                .on('end', () => {
                    // console.log(banknoteList)
                    resolve(irisList)
                })
        } catch (error) {
            console.log('error in try catch')
        }
    })
}
module.exports = {
    banksetReader,
    irisReader
} 
