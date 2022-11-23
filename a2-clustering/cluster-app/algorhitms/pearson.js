
export async function pearson(blogA, blogB) {
    let sumA = 0
    let sumB = 0
    let sumAsq = 0
    let sumBsq = 0
    let pSum = 0
    let n = 706
    // console.log('blog A ' + blogA.getWordCount(0) + '  blogB ' + blogB.WordOccurense[1].Count + ' word ' + blogB.WordOccurense[0].Word)

    for(let i = 0; i < n ; i++) {
        let countA = blogA.getWordCount(i)
        let countB = blogB.WordOccurense[i].Count
        sumA += countA
        sumB += countB
        sumAsq += countA**2
        sumBsq += countB**2
        pSum += countA * countB
    }
    let num = pSum - ((sumA * sumB) / n)
    let den = Math.sqrt(
        (sumAsq- (sumA ** 2) / n ) * (sumBsq - (sumB ** 2) / n )
        )
    return 1 - num / den
}