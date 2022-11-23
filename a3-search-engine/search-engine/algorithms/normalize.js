

export async function normalize(scores, smallIsBetter) {
    // void normalize (double[] scores, bool smallIsBetter)
    if (smallIsBetter) {
        //Smaller values shall be inverted to higher values
        //and scaled between 0 and 1
        //Find min value in the array
        let min_val = scores.reduce((a, b) => {
            return Math.min(a, b)
        })
        //Divide the min value by the score
        //(and avoid division by zero)
        let i = 0
        for (let score of scores) {
            scores[i] = min_val / Math.max(scores[i], 0.00001)
            i++
        }
    }
    else {
        //Higher values shall be scaled between 0 and 1
        //Find max value in the array
        let max_val = scores.reduce((a, b) => {
            return Math.max(a, b)
        })
        //To avoid division by zero
        max_val = Math.max(max_val, 0.00001)
        //When we have a max value, divide all scores by it
        let i = 0
        for (let score of scores) {
            scores[i] = scores[i] / max_val
            i++
        }
    }
}