let moviesList = [];
const baseURL = 'http://www.omdbapi.com/?apikey=588857ab';

window.onload = () => {
    const lastSearch = localStorage.getItem('lastSearch');
    if (lastSearch) {
        document.getElementById('searchInput').value = lastSearch;
        fetchData(lastSearch);
    } else {
        fetchData('days');
    }
};

async function fetchData(input) {
    try {
        const res = await fetch(`${baseURL}&s=${input}`);
        const data = await res.json();
        moviesList = data.Search || [];
        displayProducts(moviesList);
        localStorage.setItem('lastSearch', input);
    } catch (err) {
        console.log(err);
    }
}

function displayProducts(movies) {
    const parentDiv = document.querySelector('.parent');
    parentDiv.innerHTML = '';

    movies.forEach(movie => {
        const childDiv = document.createElement('div');
        childDiv.className = 'box';
        childDiv.innerHTML = `
            <div class="img"><img src="${movie.Poster}" alt="movie poster"></div>
            <div>
                <h3 onclick="showMovieDetails('${movie.imdbID}')" class="movie-title">${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
                <p>Type: ${movie.Type}</p>
            </div>`;
        parentDiv.appendChild(childDiv);
    });
}

async function showMovieDetails(imdbID) {
    try {
        const res = await fetch(`${baseURL}&i=${imdbID}`);
        const movie = await res.json();
        
        document.getElementById('movieList').style.display = 'none';
        const detailView = document.getElementById('movieDetail');
        detailView.style.display = 'block';
        
        document.getElementById('detailContent').innerHTML = `
            <div class="detail-container">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="movie-info">
                <h2>${movie.Title}</h2>
                <p><strong>Year:</strong> ${movie.Year}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Directed by:</strong> ${movie.Director}</p>
                 <p><strong>Written by:</strong> ${movie.Writer}</p>
                 <p><strong>Runtime:</strong> ${movie.Runtime}</p>
                 <p><strong>Cast:</strong> ${movie.Actors}</p>
                <p><strong>Plot:</strong> ${movie.Plot}</p>

                <p><strong><span style="color:green">IMDB </span>Score: </strong>${movie.imdbRating}</p>
                 <p><strong><span style="color:green">Metacritic </span>Score: </strong>${movie.Metascore}</p>
            </div>
            </div>
        `;
        
        localStorage.setItem('lastViewedMovie', imdbID);
    } catch (err) {
        console.log(err);
    }
}

function backToList() {
    document.getElementById('movieDetail').style.display = 'none';
    document.getElementById('movieList').style.display = 'grid';
}

function searchMovies() {
    const searchTerm = document.getElementById('searchInput').value;
    fetchData(searchTerm);
}

document.getElementById('yearSort').addEventListener('change', sortMovies);

function sortMovies() {
    const sortOrder = document.getElementById('yearSort').value;
    if (sortOrder) {
        const sortedMovies = [...moviesList].sort((a, b) => {
            return sortOrder === 'asc' ? 
                parseInt(a.Year) - parseInt(b.Year) : 
                parseInt(b.Year) - parseInt(a.Year);
        });
        displayProducts(sortedMovies);
    }
}

