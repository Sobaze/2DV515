import fs from 'fs'
import path from 'path'


export async function fileHandler() {
    let pages = []

    let db = './data/'
    let dirNames = ['./data/Words']
    let directories = []
    try {
        for(const dir of dirNames) {
            const file = fs.readdirSync(dir).map(fileName => ({
                fileName,
                directory: dir.slice(7),
            }))
            directories.push(...file)
        }
        
        for await(let dir of directories) {
            const content = fs.readFileSync(
                path.join(db, dir.directory, dir.fileName),
                'utf-8'
            )
            let page = {
                url: `${dir.fileName}`,
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