import { Cluster } from "./kMeans";

// TODO: implement merge when starting with hierarchy

export function merge(clusterA, clusterB, distance) {
    n = 706
    
    const clusterP = new Cluster(right, left, blog, dist, parent)
    
    clusterP.left = B
    clusterP.right = A

    A.parent = clusterP
    B.parent = clusterP

    let countB = 0
    let countA = 0
    const bP = new Blog()
    for(let i = 0; i < n; i++) {
        countA = clusterA.blog.wordCount[i]
        countB = clusterB.blog.wordCount[i]

        count = (countA + countB) / 2
        //push into the wordCount ?
        bP.blog.wordCount[i] = count 
    }

    //push into the blog
    clusterP.blog = bP
    clusterP.distance = distance

    return clusterP
    // average word count for each word from blog A and B
    // for (const wordC of blogA) 
    //     for( const wordCo of blogB)
    //          bp.wordCount += ((wordC + wordCo) / 2)
    
}