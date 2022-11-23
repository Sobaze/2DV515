import { fsFileHandler } from '../../utils/fsReadFile'
import fs from 'fs'
import { kMeans } from '../../algorhitms/kMeans'

export default async function handler(req, res) {
    const result = await getClusterFromKMean()
    res.status(200).json(result)
  }
  
  async function getClusterFromKMean() {
    const blogs = fs.readFileSync('./data/blogdata.txt').toString()
    const result = fsFileHandler(blogs)
    // return the kmeans clusters of all blogs
    const kmean = await kMeans(result)
    return kmean
  }