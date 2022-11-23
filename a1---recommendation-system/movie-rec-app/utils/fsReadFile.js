
// import fs from 'fs'

export function fsFileHandler(file) {
    const fileToConvert = file
    let lines = fileToConvert.split("\n")
    let result = []
    let headers = lines[0].split(";")
    for(let i =1; i<lines.length;i++) {
      let obj = {}
      let curLine = lines[i].split(";")
  
      for(let j= 0; j < headers.length; j++) {
        obj[headers[j]] = curLine[j]
      }
      result.push(obj)
    }
    return result
}
