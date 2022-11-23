
export async function pearson(user1, user2, type) {
    let sum1 = 0
    let sum2 = 0
    let sum1sq = 0
    let sum2sq = 0
    let psum = 0
    let n = 0

    for( const r1 of user1.ratings) {
        for(const r2 of user2.ratings) {
            if(r1 === r2) {
                sum1 += r1.score
                sum2 += r2.score
                sum1sq += Math.pow(r1.score, 2)
                sum2sq += Math.pow(r2.score, 2)
                psum += r1.score * r2.score
                n += 1
            }
        }
    }
    if(n == 0) {
        return 0
    }
    let num = psum - (sum1 * sum2 / n)
    let d1 = (Math.pow(sum1sq - sum1, 2) / n )
    let den 
}