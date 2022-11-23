import { euclidean } from "../../algorithms/euclidean"

export async function getAllUsers() {
    const users = await fetch('http://localhost:3000/api/users').then((response) => response.json())
    return users
}
export async function getAllRatings() {
    const ratings = await fetch('http://localhost:3000/api/ratings').then((response) => response.json())
    return ratings
}

export async function getAllMovies() {
    const movies = await fetch('http://localhost:3000/api/movies').then((response) => response.json())
    return movies
}

export async function getUsersRatings() {
    const users = await getAllUsers()
    const ratings = await getAllRatings()
    const userRating = []

    // Looping over each user
    for(const user of users) {
        const movieScore = []
        // Looping over each rating done for mmovies
        for(const rating of ratings) {
            if (rating.UserId == user.UserId) {
                movieScore.push(rating)
            }
        }
        userRating.push({...user, ratings: movieScore})
    }
    return userRating
}
// Getting an movie by its ID
export async function getMovie(movieID) {
    const movies = await getAllMovies()
    for(const movie of movies) {
        if(movieID == movie.MovieId) {
            return movie
        }
    }
}
// Getting an user by its ID 
export async function getAUser( userID ) {
    const userRatings = await getUsersRatings();
    for(const userRating of userRatings) {
        if(userID == userRating.UserId) {
            return userRating
        }
    }
}

// Find a similar user
export async function getUserRec( userID, similarity) {
    const user1 = await getAUser(userID)
    const allUsers = await getAllUsers()
    const ratings = await getAllRatings()

    allUsers.map(us => {
        us.ratings = ratings.filter(ra => ra.UserId === us.UserId)
    })
    
    const restOfUsers = allUsers.filter(us => us.UserId !== user1.UserId)
    const recResult = []

    if (similarity === 'euclidean') {
        for(const user2 of restOfUsers) {
            const euclide = await euclidean(user1, user2, 'user')
            recResult.push({Name: user2.Name, UserId: user2.UserId, score: euclide, ratings: [] })
        }
    }
    // TODO: Implement pearson
    if (similarity === 'pearson') {
        for(const user2 of restOfUsers) {
            // const pear = await pearson()
            
        }
    }
    recResult.sort((a, b ) => b.score - a.score)
    return recResult
}
// Recomend movies to a user
export async function recUserMovies(userID, similarity) {
    const user1 = await getAUser(userID)
    const ratings = await getUsersRatings()

    let userRec = await getUserRec( userID, similarity)
    let usersSimScore = userRec.filter(us => us.score > 0)

    // Only recomend movies user havent seen
    const moviesNotWatched = await notWatchedMovie(user1.UserId)

    usersSimScore = usersSimScore.map(us => {
        const ratingForUser = ratings.find(ar => ar.UserId === us.UserId)

        return {
            ...us,
            ratings: ratingForUser.ratings
        }
    })

    // simScore * rating on each movie == weighted scored
    const recMovie = []
    for(const movieNotWatched of moviesNotWatched) {
        const movie = {
            movieId: movieNotWatched.MovieId,
            title: movieNotWatched.Title,
            score: 0
        }
        let totWeight = 0
        let totSim = 0
            for(const user of usersSimScore) {
                for(const rate of user.ratings) {
                    if(movieNotWatched.MovieId === rate.MovieId) {
                        totWeight += user.score * Number(rate.Rating)
                        totSim += user.score
                    }
                }
            }
            movie.score = totWeight / totSim
            recMovie.push(
                movie
            )
        }
        recMovie.sort((a, b) => b.score - a.score)
       return recMovie
}

export async function notWatchedMovie(userID) {
    const user1 = await getAUser(userID)
    const allRatings = await getAllRatings()
    const allMovies = await getAllMovies()
    const getUsersRating = allRatings.filter(userR => userR.UserId ===user1.UserId)
    
    // set all movies to unwatched
    for(const movie of allMovies) {
        movie.watched = false
    }
    // loop thro users rating and check if they have rated that movie
    for(const rating of getUsersRating) {
        for(const movie of allMovies) {
            if(movie.MovieId === rating.MovieId){
                movie.watched = true
            }
        }
    }
    const unWatchedMovie = allMovies.filter(movie => movie.watched === false)
    return unWatchedMovie
}

// TODO: Implement more for itembased

// export async function getMovieRec(count, movieID, similarity) {
//     const oneMovie = await getMovie(movieID)
//     const allMovies = await getAllMovies()
//     const allRatings = await getAllRatings()

//     allMovies.map(movie => {
//         movie.ratings = allRatings.filter(mov => mov.MovieId === movie.MovieId)
//     })
//     const movie1 = allMovies.find(m => m.MovieId === oneMovie.MovieId)
//     const restOfMovies = allMovies.filter(mov => mov.MovieId !== oneMovie.MovieId)
//     const recMovieResult = []

//     if(similarity === 'euclidean') {
//         for(const movie2 of restOfMovies) {
//             const euclid = await euclidean(movie1, movie2, 'movie')
//             recMovieResult.push({Title: movie2.Title, MovieId: movie2.MovieId, score: euclid})
//         }
//     }
//     recMovieResult.sort((a, b) => b.score - a.score)
//     return recMovieResult.slice(0, count)
// }
