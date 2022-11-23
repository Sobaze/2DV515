import { Centroid } from "../models/centroids"
import { Cluster } from "../models/cluster"
import {pearson } from '../algorhitms/pearson'
// import {max, min} from '../utils/fsReadFile'
 
export async function kMeans(result) {
    const {blogs, min, max} = result
    let n = 706
    // amount of centroids
    let k = 5

    let centroids = []
    let totalIerations = 3
    
    for(let i = 0; i < k; i++) {
        const c = new Centroid()
        for(let j = 0; j < n; j++) {
            c.setWordCount(
                j, 
                Math.floor(Math.random() * (max[j] - min[j] + 1)+ min[j] )
                )
        }
        centroids.push(c)
    }
     for (let i = 0; i < totalIerations ; i++) {
        for(const c of centroids) {
            c.clearAssignements()
        }

        for( const b of blogs) {
            let dista = Number.MAX_VALUE
            let best = new Centroid()
            for (const c of centroids) {
                let cDist = await pearson(c, b)
                if( cDist < dista) {
                    best = c
                    dista = cDist
                }
            }
            best.assign(b)
        }
        for(const c of centroids) {
            for(let i = 0; i < n ; i++) {
                let avg = 0
                for(const b of c.assignments) {
                    avg += b.WordOccurense[i].Count
                }
                avg /= c.assignments.length
                c.setWordCount(i, avg)
            }
        }
     }
     let filterCentroids = []  
     let i = 0; 
     for(const cen of centroids) {
         i++
         let clusterName = 'Cluster ' + i
         let cluster = {
            Cluster: clusterName,
            Blogs: []
         }
         for(const bl of cen.assignments) {
            cluster.Blogs.push(bl.Blog)
         }
         filterCentroids.push(cluster)
     }
    return filterCentroids
}
