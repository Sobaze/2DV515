

export async function euclidean(user1, user2, type) {
    let sim = 0
    let n = 0
    let inv = 0

    for(const r1 of user1.ratings) {
        for(const r2 of user2.ratings) {
            if(type === 'user')
            if( r1.MovieId == r2.MovieId) {
                sim += Math.pow(r1.Rating - r2.Rating, 2)
                n += 1
            }

            if(type === 'movie') {
                if(r1.UserId === r2.UserId) {
                    sim += Math.pow(r1.Rating - r2.Rating, 2)
                    n += 1
                }
            }
        }
    }
    if (n == 0) {
        return 0
    } 
    inv += 1 / (1 + sim)
    return inv
}