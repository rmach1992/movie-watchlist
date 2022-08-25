let idArray = []
//Setting array as the data from local storage, if there is no data then set array as an empty string
let watchListArray = JSON.parse(localStorage.getItem('myWatchList'))
if (watchListArray === null) {
    watchListArray = []
}

//Event listener for the functions that need to run when search is clicked
document.getElementById('search-form').addEventListener('click', function() {
    const search = document.getElementById('search-value').value
    if (search) {
    fetch(`https://www.omdbapi.com/?apikey=9b4197e2&s=${search}`)
        .then (response => response.json())
        .then (data => {
            clearResults()
            getID(data.Search)
            getMovieInfo(idArray)
        })
    }
    else document.getElementById('container').innerHTML = `
    <p id="invalid-Search">Unable to find what you're looking for. Please try another search.</p>`
})

//Get the imdb ID from the data that is fetched and put it into an array
function getID(id) {
    for (let i = 0; i < id.length; i++) {
        idArray.push(id[i].imdbID)
    }
}

//Get the data of each movie from the arrays of imdb IDs
function getMovieInfo (movieArray) {
    movieArray.map(id => {
        fetch(`https://www.omdbapi.com/?apikey=9b4197e2&i=${id}`)
            .then (response => response.json())
            .then (data => renderMovies(data))
    })
}

//Display each movie result
function renderMovies(movieList) {
    document.getElementById('container').innerHTML += [movieList].map(movie => {
        return `<div class="movie-container">
                    <img src="${movie.Poster}" id="movie-poster">
                    <div class="movie-info">
                        <div class="movie-main"><h3>${movie.Title}</h3> <span>⭐ ${movie.imdbRating}</span></div>
                        <div class="movie-details">
                            <div>${movie.Runtime}</div> 
                            <div>${movie.Genre}</div>
                            <button class="watchlist-btn" onclick="addWatchlist('${movie.imdbID}')"><img src="images/plus.png"> Watchlist</button>
                        </div>
                        <p class="plot">${movie.Plot}</p>
                    </div>
                </div>
                `
    })
}

//Clear the results of the search everytime Search is clicked
function clearResults() {
    document.getElementById('container').innerHTML = ""
    document.getElementById('container').classList.remove('default')
    idArray = []
}

//Adds each imdb ID to an array and stores in localStorage
function addWatchlist(movieID) {
    if (watchListArray.includes(movieID)) {
        alert('You already added this movie!')
    }
    else watchListArray.push(movieID)
    localStorage.setItem("myWatchList", JSON.stringify(watchListArray))
}
