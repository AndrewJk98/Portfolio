const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");

// Change text and gif when the Yes button is clicked
yesBtn.addEventListener("click", () => {
  question.innerHTML = "I knew it";
  gif.src = "https://th.bing.com/th/id/R.e063eca69752c313ba174a3b568d46a9?rik=2gViFG1fRoQ1KQ&riu=http%3a%2f%2fweb.colby.edu%2fcogblog%2ffiles%2f2017%2f04%2ff8c08bf21ca5be2694dbd7c57b2573e9_58254103jpg-i-knew-it-memes_400-400.jpeg&ehk=MyEQcg%2bz6phcWAGNAagxazhj2YPLJemoV5WaK4ymPfc%3d&risl=&pid=ImgRaw&r=0";
  //gif.src = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGI1cW5wMWhpaDF5b3pjdTF0OHZrcHJvaGkzOHJteDhmd245OGRnZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vuw9m5wXviFIQ/giphy.gif";
});

// Make the No button move randomly on hover
noBtn.addEventListener("mouseover", () => {
  const wrapper = document.querySelector(".wrapper");
  const wrapperRect = wrapper.getBoundingClientRect();
  const noBtnRect = noBtn.getBoundingClientRect();

  // Calculate max positions to ensure the button stays within the wrapper
  const maxX = wrapperRect.width - noBtnRect.width;
  const maxY = wrapperRect.height - noBtnRect.height;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
});
