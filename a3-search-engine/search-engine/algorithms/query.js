import { normalize } from "./normalize"

export async function query(allPages, query) {
    let result = []
    const pages = allPages
    let qr = query
    let score = 0
    let content = 0

    let location = 0
    let pageRank = 0

    let scores = {
        content: [],
        location: []
    }
    // Calculate score for each page in the pages database
    let i = 0
    for (const page of pages) {
        scores.content[i] = await getWordFrequency(page, qr)
        scores.location[i] = await getLocationScore(page, qr)
        i++
    }
    // //Normalize scores
    normalize(scores.content, false)
    normalize(scores.location, true)
   
    let k = 0
    for (const page of pages) {
        //Calculate sum of weighted scores
        content = scores.content[k]
        location = 0.8 * scores.location[k]
        // score = scores.content[k] + (0.8 * scores.location)
        score = scores.content[k]
        score = Math.round((score + Number.EPSILON) * 100 ) / 100
        result.push({ 
            page, 
            score,
            content,
            location,
            pageRank
        })
            k++
    }
    //Sort result list with highest score first
    result.sort((b, a) => (a.score - b.score )) 

    //Return result
    return result.slice(0, 5)
}

// TODO : Implement it so it fully works, not working as it should
async function getLocationScore(page, qr) {
    let query = qr
    let score = 0
    let qws = query.split(' ')

    let i = 0
    for(const q of qws) {
        let found = false
        for(const word of page.words) {
            if (word === q) {
                score += i + 1
                found = true
            }
        }
        if(!found) {
            score += 100000
        }
    }
    return score
}

// will return a score representing the amount of words
async function getWordFrequency(page, qr) {
    let score = 0
    let query = qr
    let qws = query.split(' ')

    for (const q of qws) {
        for(const word of page.words) {
            if(word === q) {
                score++
            }
        }
    }
    return score

}


