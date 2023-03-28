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




const getClickedGenre = document.querySelector('.section-2-top-right-movie-ganre');
const allUpcomingMovieLinkGenres = document.querySelectorAll('.section-2-gemre-item');
const upComingMovieWrapper = document.querySelector('.upcoming-movie-wrapper');

const currentActiveUser = document.querySelector('.section-4-left-customers');
const activeUserNum = document.querySelector('.active-user-num');

const section1 = document.getElementById('section--1');







const upcomingMovieCard = function(data) {
    data.forEach(el=> {
        const {poster_path, original_title, popularity, release_date} = el;
        const div = document.createElement('div');
        div.classList.add('swiper-slide');
        div.innerHTML = `
        <div class="swiper-slide upcoming-movie-slide">
            <div class="movie-image">
                <img src="${imageUrl + poster_path}" alt="">
            </div>
            <div class="movie-info">
                <div class="movie-info-top">
                    <div class="movie-name">
                        <h4>${original_title}</h4>
                    </div>
                    <div class="movie-release-date">
                        <p>${release_date.split('-')[0]}</p>
                    </div>
                </div>
                <div class="movie-info-bottom">
                    <div class="movie-popularity">
                        <p>${popularity} Review</p>
                    </div>
                </div>
            </div>
        </div>
        `
        upComingMovieWrapper.append(div);
    })
}

const fetchUpcomingMovie = function(data) {
    const arr = [];
    fetch(data)
        .then(resp=> resp.json())
        .then(el=> {
            const {results} = el;
            for (let i = 1; i < 9; i++) {
                arr.push(results[i]);
            }
            upcomingMovieCard(arr);
        })
};


getClickedGenre.addEventListener('click', function(e) {
    e.preventDefault();
    upComingMovieWrapper.innerHTML = '';
    allUpcomingMovieLinkGenres.forEach(el=> el.classList.remove('section-2-genre-active'));
    const clicked = e.target;
    if (!clicked.classList.contains('section-2-gemre-item')) return;
    if (clicked.textContent === 'highest Rated') {
        fetchUpcomingMovie(higherstRatedMoviesUrl);
        clicked.classList.add('section-2-genre-active');
    } else if (clicked.textContent === 'Kids') {
        fetchUpcomingMovie(kidMovieUrl);
        clicked.classList.add('section-2-genre-active');
    } else if (clicked.textContent === 'Drama') {
        fetchUpcomingMovie(dramaMovieApi);
        clicked.classList.add('section-2-genre-active');
    } else if (clicked.textContent === 'Popular') {
        fetchUpcomingMovie(popularApiUrl);
        clicked.classList.add('section-2-genre-active');
    }
});

fetchUpcomingMovie(popularApiUrl);

// Upcoming movie swiper js
var swiper = new Swiper(".upcoming-movie-swiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,

    breakpoints: {
        430: {
            width: 300,
            slidesPerView: 1,
        },

        631: {
            width: 400,
            slidesPerView: 1,
        },
        1501: {
            width: 1000,
            slidesPerView: 2
        }
    }
});


// Increase current active customers
let interval = 2000;

const activeCustomerCallBack = function(entries, observer) {
    const [entry] = entries;
    if (entry.isIntersecting) {
        let startValue = 0;
        const endValue = parseInt(activeUserNum.dataset.value);
        const duration = Math.floor(interval / endValue);
        const counter = setInterval(()=> {
            startValue += 1;
            activeUserNum.textContent = startValue;
            if (startValue === endValue) {
                clearInterval(counter);
            }
        }, duration)
        observer.unobserve(currentActiveUser);
    }

};

const activeCustomerObserver = new IntersectionObserver(activeCustomerCallBack, {
    root: null,
    threshold: 0,
});

activeCustomerObserver.observe(currentActiveUser);


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