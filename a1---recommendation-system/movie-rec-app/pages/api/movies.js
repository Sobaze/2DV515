import { fsFileHandler } from '../../utils/fsReadFile'
import fs from 'fs'

export default function handler(req, res) {
  // const result = getMoviesSmall()
    const result = getMoviesLarge()
  res.status(200).json(result)
}

function getMoviesSmall() {
  const movies = fs.readFileSync('./data/movies_example/movies.csv').toString()
  const result = fsFileHandler(movies)
  return result
}

function getMoviesLarge() {
    const movies = fs.readFileSync('./data/movies_large/movies.csv').toString()
    const result = fsFileHandler(movies)
    return result
}