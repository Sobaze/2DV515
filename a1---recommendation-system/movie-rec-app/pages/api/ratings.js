
import { fsFileHandler } from '../../utils/fsReadFile'
import fs from 'fs'

export default function handler(req, res) {
  // const result = getRatingsSmall()
  const result = getRatingsLarge()
  res.status(200).json(result)
}

function getRatingsSmall() {
  const ratings = fs.readFileSync('./data/movies_example/ratings.csv').toString()
    const result = fsFileHandler(ratings)
    return result
}

function getRatingsLarge() {
  const ratings = fs.readFileSync('./data/movies_large/ratings.csv').toString()
  const result = fsFileHandler(ratings)
  return result
}