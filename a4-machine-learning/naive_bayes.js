/**
 * @author Jonas Nilsson
 * @version 1.0.0
 * Calculations for naive bayes algorithm
 * Starting point for the algorithm
 * @param {object} nbData - An Object with the data of Iris or Banknotes
 * 
 */

const Naive_Bayes = (nbData) => {
    let naiveBayesData = []
    let testingData = []
    let trainedData = []
    let nbPrediction = []
    let bestResult = []

    naiveBayesData = nbData
    testingData = nbData
    
    trainedData = fit(naiveBayesData)
    
    nbPrediction = predict(naiveBayesData ,trainedData)

    bestResult = get_best(nbPrediction)

    accuracy_score(bestResult, testingData)
    
}

    // Trains the model on input examples X and labels y.
    const fit = (inpExample) => {
        let seperatedData = seperateByClass(inpExample)
        return calcMeanAndStdev(seperatedData)
    }


    /**
     * Classifies examples X and returns a list of predictions.
     * @param {object} x - Object containing the data examples from the naivebaiyes data
     * @param {object} y - Object with the calculated means and stdevs
     * @returns - an object with predictions
     */
    const predict = (x, y) => {
        let predictions = []

        // Loops over all the items in x
        for(const item of x) {
            let predictData = []
            let m = 0
            // Loops over all the classes (Iris is 3 and banknotes is 2)
            let classLength = Object.values(y.mean).length

            for( let n = 0; n < classLength; n++) {
        
                    let className = Object.keys(y.mean[n])[0]
                    let prob = 0.0
            
                    // Loops over all the "lables" and assuming last label is the class name/species name so we dont want last one
                    let dataLabels = Object.values(item).length -1

                    for (let i = 0; i < dataLabels; i++) {

                        let pMean = Object.values(y.mean[m])[0][i]
                        let pStdev = Object.values(y.stdev[m])[0][i]
                        let itemValue = Object.values(item)[i]

                        prob += Math.log((calc_probability(itemValue, pMean, pStdev)))
                    }
                m++
                // Use log-probabilities to avoid underflow
                predictData.push({type: className , prob: Math.exp(prob)})
            }
            predictions.push(predictData)
        }
        return predictions
    }

    const calc_probability = (x, mean, stdev) => {
        let exponent = Math.exp( - (Math.pow( x - mean, 2) / (2 * Math.pow(stdev, 2))))
        return (1 / (Math.sqrt(2 * Math.PI) * stdev)) * exponent
    }

    /**
     * Calculates accuracy score for a list of predictions
     * @param {object} preds - Object with calculated predictions
     * @param {object} y - Object with naivebayes data 
     */
    const accuracy_score = (preds, y) => {
        let correct = 0
        for(let i = 0; i < y.length; i++) {

            // Data from labels except last one which is the class name
            let dataLabelsLength = Object.values(y[i]).length -1

            let classVal = Object.values(y[i])[dataLabelsLength]

            if (classVal === preds[i].type) {
                correct += 1
            }
        }
        console.log('Accuracy: ' + ( (correct / parseFloat(y.length)) * 100.0 ).toFixed(2)  + ' % ' +
        '(' + correct + ' / ' + y.length + ' correctly classified)' )
    }

    //Generates a confusion matrix and returns it as an integer matrix.
    const confusion_matrix = (preds, y) => {
        
    }

    //Runs n-fold cross-validation and returns a list of predictions.
    const crossval_predict = (x, y, folds) => {

    }

    /**
     * 
     * @param {Object} predictions - an object with all the predictions
     * @returns returns the lable with the highest valued prediction
     */
    const get_best = (predictions) => {
        let bestPrediction = []
        
        for(let i = 0; i < predictions.length; i++) {
            let max = 0
            let index = -1

            // loops over types (Irys length is 3 and bank is 2)
            for (let j = 0; j < predictions[i].length; j++) {

                if(predictions[i][j].prob > max || index == -1) {
                    max = predictions[i][j].prob
                    index = j
                }
            }
            bestPrediction.push(predictions[i][index])
        }
        return bestPrediction
    }

    /**
     * 
     * @param {Object} seperatedData - Object with the seperated data examples
     * @returns - an object with the calculated means and stdev values for every item
     */
    const calcMeanAndStdev = (seperatedData) => {
        let everyMean = []
        let everyStdev = []

        for(const sortedClass of Object.entries(seperatedData)) {
            let number1 = 0, number2 = 0, number3 = 0, number4 = 0
            let means = []
            for(let i = 0; i < Object.keys(sortedClass[1]).length; i++) {

                let eachValueInObject = Object.values(sortedClass[1][i])
                //Calculates mean
                // Loop over every label except for last which is usually the class one (atleast we expect it to be)
                for( let j = 0; j < eachValueInObject.length - 1 ; j++) {
                    if (j === 0) {
                        number1 += parseFloat(eachValueInObject[j]) 
                    }
                    if (j === 1) {
                        number2 += parseFloat(eachValueInObject[j]) 
                    }
                    if (j === 2) {
                        number3 += parseFloat(eachValueInObject[j]) 
                    }
                    if (j === 3) {
                        number4 += parseFloat(eachValueInObject[j]) 
                    }
                }
            }
            means.push(
                (number1 / sortedClass[1].length),
                (number2 / sortedClass[1].length),
                (number3 / sortedClass[1].length),
                (number4 / sortedClass[1].length)
            )

            everyMean.push({[sortedClass[0]]: means })
            everyStdev.push({[sortedClass[0]]: calculateStdev(sortedClass[1], means)})
        }
        return { mean: everyMean, stdev: everyStdev }
    }

    /**
     * 
     * @param {Object} sortedClass - Object with the seperated data examples
     * @param {Object} means -containing all the calculated mean values
     * @returns 
     */
    const calculateStdev = (sortedClass, means) => {
        let everyStDev = []
        let variance1 = 0, variance2 = 0, variance3 = 0, variance4 = 0
        for(let i = 0; i < Object.keys(sortedClass).length; i++) {
            
            let eachValueInObject = Object.values(sortedClass[i])

            for (let j = 0; j < eachValueInObject.length - 1; j++) {

                if (j === 0) {
                    variance1 += Math.pow(parseFloat(eachValueInObject[j]) - means[j], 2)
                }
                if (j === 1) {
                    variance2 += Math.pow(parseFloat(eachValueInObject[j]) - means[j], 2)
                }
                if (j === 2) {
                    variance3 += Math.pow(parseFloat(eachValueInObject[j]) - means[j], 2)
                }
                if (j === 3) {
                    variance4 += Math.pow(parseFloat(eachValueInObject[j]) - means[j], 2)
                }
            }
        }
        everyStDev.push(
            (Math.sqrt(variance1 / (sortedClass.length - 1 ))),
            (Math.sqrt(variance2 / (sortedClass.length - 1 ))),
            (Math.sqrt(variance3 / (sortedClass.length - 1 ))),
            (Math.sqrt(variance4 / (sortedClass.length - 1 )))
        )
        return everyStDev
    }

    // https://machinelearningmastery.com/naive-bayes-classifier-scratch-python/
    // Seperate our training data by class
    const seperateByClass = (x) => {
        let seperationList = {}
        
        for (const integersInX in x ) {
            let vector = x[integersInX]

            let class_value = Object.values(vector)[Object.values(vector).length -1]

            if (!seperationList[class_value] ) {
                seperationList[class_value] = []
                seperationList[class_value].push(vector)
            } else {
                seperationList[class_value].push(vector)
            }
        }
        return seperationList
    }


module.exports = Naive_Bayes