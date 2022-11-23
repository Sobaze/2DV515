import fs from 'fs'
import path from 'path'


export async function fileHandler() {
    let pages = []

    let db = './data/wikipedia/'
    let dirNames = ['./data/wikipedia/Words/Games', './data/wikipedia/Words/Programming']
    let directories = []
    try {
        for(const dir of dirNames) {
            const file = fs.readdirSync(dir).map(fileName => ({
                fileName,
                directory: dir.slice(23),
            }))
            directories.push(...file)
        }
        
        for await(let dir of directories) {
            const content = fs.readFileSync(
                path.join(db, 'Words', dir.directory, dir.fileName),
                'utf-8'
            )
            let page = {
                url: `wiki/${dir.fileName}`,
                title: dir.fileName,
                type: dir.directory,
                words: []
            }
            for(const word of content.split(' ')) {
                page.words.push(word)
            }
                pages.push(page)
        }
        
        return pages
    } catch (error) {
        console.error(error)
    }
}