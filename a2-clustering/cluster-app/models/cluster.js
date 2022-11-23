
// TODO use when starting with hierarchy
export class Cluster {
    constructor(right, left, blog, dist, parent) {
        this.right = right
        this.left = left
        this.blog = blog
        this.distance = dist
        this.parent = parent
    }
}