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

// Select the like button (if you have one)
let likeButton = document.getElementById('like-btn');

// Select the like count element
let likeCount = document.getElementById('like-count');

// Initial like count (stored in a variable)
let currentLikes = 0;

// Function to increment like count
function incrementLike() {
    currentLikes++;
    likeCount.innerText = currentLikes;
}

// Add click event listener to like button (if applicable)
if (likeButton) {
    likeButton.addEventListener('click', incrementLike);
}

 Local_storage (optional, to_persist_count_across_refreshes)
 localStorage.setItem('likeCount', currentLikes);
 let storedCount = localStorage.getItem('likeCount');
 if (storedCount) {
   currentLikes = parseInt(storedCount);
   likeCount.innerText = currentLikes;
 }
