const hamburgerIcon = document.querySelector('.hamburger-icon');
const navbar = document.querySelector('.navbar');
const closeBtn = document.querySelector('.close-navbar');

const moveUpBtn = document.querySelector('.move-up-button');

const selectLanguage = document.querySelector('.languages');

// language select change
selectLanguage.addEventListener('change', function() {
    selectLanguage.style.outline = 'none';
})

// Toggle navbar
hamburgerIcon.addEventListener('click', function() {
    navbar.classList.add('active');
    closeBtn.classList.add('active');
});

closeBtn.addEventListener('click', function() {
    navbar.classList.remove('active');
    closeBtn.classList.remove('active');
})






// click to move up btn
moveUpBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});