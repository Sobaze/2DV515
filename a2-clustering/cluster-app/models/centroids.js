
export class Centroid{
    constructor() {
        this.assignments = []
        this.wordCount = []
    }

    getWordCount = (i) => {
        return this.wordCount[i]
    } 
    
    setWordCount = (i, number) => {
        this.wordCount[i] = number
    }

    assign = (blog) => {
        this.assignments.push(blog)
    }

    getAssignments = () => {
        return this.assignments
    }

    clearAssignements = () => {
        this.assignments = []
    }
}