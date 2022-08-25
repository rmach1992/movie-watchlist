//Set watchList to data from localStorage
let watchList = JSON.parse(localStorage.getItem('myWatchList'))

//If watchList is empty, display default, otherwise use array to get movie info
if (watchList.length > 0) {
    getMovieInfo(watchList)
}
else emptyWatchlist()

//Use array of ids to get movie info
function getMovieInfo (movieArray) {
    movieArray.map(id => {
        fetch(`https://www.omdbapi.com/?apikey=9b4197e2&i=${id}`)
            .then (response => response.json())
            .then (data => renderMovies(data))
    })
}

//Display movie results
function renderMovies(movieList) {
    document.getElementById('watchlist-container').innerHTML += [movieList].map(movie => {
        return `<div class="movie-container">
                    <img src="${movie.Poster}" id="movie-poster">
                    <div class="movie-info">
                        <div class="movie-main"><h3>${movie.Title}</h3> <span>⭐ ${movie.imdbRating}</span></div>
                        <div class="movie-details">
                            <div>${movie.Runtime}</div> 
                            <div>${movie.Genre}</div>
                            <button class="watchlist-btn" onclick="removeWatchlist('${movie.imdbID}')"><img src="images/remove.png"> Remove</button>
                        </div>
                        <p class="plot">${movie.Plot}</p>
                    </div>
                </div>
                `
    })
}

//Removes movies from watchlist and clear from localStorage
function removeWatchlist(ID) {
    const index = watchList.indexOf(ID)
    if (index > -1) {
        watchList.splice(index, 1)
        document.getElementById('watchlist-container').innerHTML = ""
        getMovieInfo(watchList)
        localStorage.setItem("myWatchList", JSON.stringify(watchList))
    }
    emptyWatchlist()
}

//If watchlist is empty, display default
function emptyWatchlist() {
    if (watchList.length === 0) {
        document.getElementById('watchlist-container').innerHTML = `
        <p>Your watchlist is looking a little empty...</p>
        <button id="add-movies" onclick="location.href = 'index.html'"><img src="images/plus.png"> Let's add some movies!</button>`
        document.getElementById('watchlist-container').classList.add('default')
    }
}