"use strict";

const imageUrl = 'http://image.tmdb.org/t/p/w500';
const apiKey = 'api_key=2263815fb012ff3af28c7f62dc94e644';
const baseUrl = 'https://api.themoviedb.org/3/';
// popular movies
const popularApiUrl = baseUrl + 'discover/movie?sort_by=popularity.desc&' + apiKey;
// highest rated movies
const higherstRatedMoviesUrl = baseUrl + 'discover/movie/?certification_country=US&certification=R&sort_by=vote_average&' + apiKey;
// popualr kid movies
const kidMovieUrl = baseUrl + 'discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&' + apiKey;
// best drama
const dramaMovieApi = baseUrl + 'discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&' + apiKey;


const genres = document.querySelector('.movie-genres');
const allGenre = document.querySelectorAll('.movie-genre');
const movieContainer = document.querySelector('.movie-container');

const section1 = document.querySelector('.movie-section--1');

const putMovieCard = function(data) {
    data.forEach(el=> {
        const {title, poster_path, popularity, release_date} = el;  
        const div = document.createElement('div');
        div.className = 'movie';
        div.innerHTML = `
        <div class="movie-image">
            <img src="${imageUrl + poster_path}" alt="${title}">
        </div>
        <div class="movie-descr">
            <div class="movie-descr-top">
                <div class="movie-name">
                    <h6>${title}</h6>
                </div>
                <div class="movie-release-date">
                    <p>${release_date.split('-')[0]}</p>
                </div>
            </div>
        <div class="movie-descr-bottom">
            <div class="movie-review">
                <p>${popularity} Review</p>
            </div>
        </div>
        </div>
        `;
        movieContainer.append(div);
    })
}

const fetchMovieData = function(data) {
    fetch(data)
        .then(resp=> resp.json())
        .then(el=> {
            const {results} = el;
            putMovieCard(results);
        })
};

fetchMovieData(popularApiUrl);

genres.addEventListener('click', function(e) {
    allGenre.forEach(el=> el.classList.remove('movie-genre-active'));
    const clicked = e.target;
    if (!clicked.classList.contains('movie-genre')) return;
    movieContainer.innerHTML = '';
    e.preventDefault();
    if (clicked.textContent === 'Highest Rated') {
        fetchMovieData(higherstRatedMoviesUrl);
        clicked.classList.add('movie-genre-active');
    } else if (clicked.textContent === 'Kids') {
        fetchMovieData(kidMovieUrl);
        clicked.classList.add('movie-genre-active');
    } else if (clicked.textContent === 'Drama') {
        fetchMovieData(dramaMovieApi);
        clicked.classList.add('movie-genre-active');
    } else if (clicked.textContent === 'Popular') {
        fetchMovieData(popularApiUrl);
        clicked.classList.add('movie-genre-active');
    }
})


// Make move up button
const moveUpBtnCallBack = function(entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        moveUpBtn.classList.add('visible-btn');
    } else {
        moveUpBtn.classList.remove('visible-btn');
    }
}

const moveUpBtnObserver = new IntersectionObserver(moveUpBtnCallBack, {
    root: null,
    threshold: 0
});

moveUpBtnObserver.observe(section1);