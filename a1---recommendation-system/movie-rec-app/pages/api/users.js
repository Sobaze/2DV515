// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { fsFileHandler } from '../../utils/fsReadFile'
import fs from 'fs'

export default function handler(req, res) {
  // const result = getUsersSmall()
  const result = getUsersLarge()
  res.status(200).json(result)
}

function getUsersSmall() {
  const users = fs.readFileSync('./data/movies_example/users.csv').toString()
  const result = fsFileHandler(users)
  return result
}

function getUsersLarge() {
  const users = fs.readFileSync('./data/movies_large/users.csv').toString()
  const result = fsFileHandler(users)
  return result
}