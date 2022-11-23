// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const cheerio = require ('cheerio')
const request = require ('request')
const axios = require('axios')
const fs = require('fs')

export default function handler(req, res) {
  const status = startScrape()
  res.status(200).json(status)
}

async function startScrape() {
  let pageName = 'Abraham_Lincoln'
  let maxScrapes = 200
  scrapPage(pageName, maxScrapes)
  return 'Done'
}

const scrapPage = async(pageName, maxScrapes) => {
    let allLinksScraped = []
    let linksToSave = []
    let visitedPage = new Set()
    let timeIncrease = 0
    if (maxScrapes >= 0) {
      setTimeout(async function() {

      try{
              const url = `https://en.wikipedia.org/wiki/${pageName}`
              
              //TODO :  if Title has  word/word it bugs ex. Antartica/Macquarie
              const writeLinks = fs.createWriteStream(`./data/Links/${pageName}`)
              const writeWords = fs.createWriteStream(`./data/Words/${pageName}`)
              const writeHTML = fs.createWriteStream(`./data/htmlFiles/${pageName}.html `)

              const response = await axios.get(url)
              const $ = cheerio.load(response.data)
    
              await writeWordsAndHtml($, writeWords, writeHTML)
    
              $('#bodyContent #mw-content-text').find('a').each((i, el) => {
                  let allLinks = $(el).attr('href')
                  if (typeof allLinks !== 'undefined' && allLinks !== null ) {

                       allLinksScraped.push(allLinks)
                  }
                        
                })
                    // Writing all the links from page
                  for(const links of allLinksScraped) {
                      if(typeof links !== 'undefined' && links !== null
                        && links.includes('/wiki/') 
                        && !links.includes('.')
                        && !links.includes(':') 
                        && !links.includes('(identifier)')
                        && !links.includes('ISO/') ){
                          linksToSave.push(links)
                          writeLinks.write(`${links} \n`)
                      } 
                    }
                    visitedPage.add(pageName)
                    pageName = await getNewPageName(linksToSave)

                    if(visitedPage.has(pageName)) {
                      pageName = await getNewPageName(linksToSave)
                    }
                    
                    maxScrapes--
                    timeIncrease++
                    
                allLinksScraped = []
                linksToSave = []
           
            console.log('loopar kvar ' + maxScrapes);
        } catch (e) {
            console.error(e)
        }
        scrapPage(pageName, maxScrapes)
    },
    Math.floor(Math.random() * 10) * 100)
    }
    if(maxScrapes <= 0) {
      scrapingComplete()
    }
}

const writeWordsAndHtml= async ($, writeWords, writeHTML) => {

  const allHTML = $.html()
  writeHTML.write(allHTML)

  //Getting Title
  let title = $('#firstHeading').text()

// Getting all text on site
  const allText = $('#bodyContent #mw-content-text').text()
  // all spaces
  .replace(/\s\s+/g, '')
  .replace(/[".,()[\]]/g, ' ')
  .replace(/[^a-zA-Z0-9 ]/g, ' ')
  writeWords.write(title +' ' + allText)
}
const scrapingComplete = () => {
    console.log("Scraping of 200 pages is done");
}

const getNewPageName = async (linksToSave) => {
  let newPageName
  do {
    let getRandomIndex = Math.floor(Math.random() * linksToSave.length-1)
    newPageName = linksToSave[getRandomIndex]
  } while(typeof newPageName === 'undefined' ) 
  return newPageName.slice(6)
}
