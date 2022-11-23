
export function fsFileHandler(file) {
   const max = []
  
   const min = []

    const fileToConvert = file
    let lines = fileToConvert.split("\n")
    let blogs = []
    let headers = lines[0].split("\t")

    let blog = {}
    
    
    for(let i =1; i<lines.length;i++) {
      let obj = {}
      let curLine = lines[i].split("\t")
      
      blog = {
        Blog: curLine[0],
        WordOccurense: []
      }
      for(let j= 1; j < headers.length; j++) {
        let count = parseInt(curLine[j].trim())
        let wordObj = {
          Word: headers[j].trim(),
          Count: count,
          ID: j,
        }
        if(min[j-1] == null || min[j-1] > count) {
          min[j-1] = count
        }
        if(max[j-1] == null || max[j-1] < count) {
          max[j-1] = count
        }
        blog.WordOccurense.push(wordObj)
      }
      blogs.push(blog)
    }
    return {blogs, min, max }
  }
