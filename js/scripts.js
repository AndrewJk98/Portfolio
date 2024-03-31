let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Toggle Navbar Visibility on Menu Icon Click
menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href*=' + id + ']').classList.add('active')
            })
        }
    })
}

// Like Button Functionality
// Select the like button (if you have one)
let likeButton = document.getElementById('like-btn');

// Select the like count element
let likeCount = document.getElementById('like-count');

// Initial like count (stored in a variable)
let currentLikes = 0;

// Flag to track if clicked this session (stored in session storage)
let clickedThisSession = false;

// Function to increment like count
function incrementLike() {
    if (!clickedThisSession) {
        currentLikes++;
        likeCount.innerText = currentLikes;

        // Store like count in local storage (optional)
        localStorage.setItem('likeCount', currentLikes);

        // Set clickedThisSession flag in session storage
        sessionStorage.setItem('clickedLike', true);
        clickedThisSession = true;
    } else {
        //alert("You can only like once per session!");
    }
}

// Add click event listener to like button (if applicable)
if (likeButton) {
    likeButton.addEventListener('click', incrementLike);
}

// Retrieve like count from local storage (optional)
let storedCount = localStorage.getItem('likeCount');
if (storedCount) {
    currentLikes = parseInt(storedCount);
    likeCount.innerText = currentLikes;
}

// Check session storage for clicked flag (optional)
let sessionClicked = sessionStorage.getItem('clickedLike');
if (sessionClicked) {
    clickedThisSession = true; // Prevent further clicks this session
}
