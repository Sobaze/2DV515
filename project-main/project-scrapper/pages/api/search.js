
import { query } from "../../algorithms/query"
import { fileHandler } from '../../utils/fileHandler'

export default async function handler(req, res, props) {
    let word
    if( req.query.q !== null) {
        word = req.query.q
    }
    const result = await getQueryResult(word)
    res.status(200).json(result)
  }
  
  async function getQueryResult(word) {
    const pages = await fileHandler()
    const q = await query(pages, word)
    return q
  }