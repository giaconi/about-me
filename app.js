//animation

const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
const jokeButton = document.querySelector('.joke');
const jokesUrl = 'https://sv443.net/jokeapi/v2/joke/Programming,Spooky';
const mouse = document.querySelector('.cursor');
let joke = '';

tl.to(".text", { y: "0%", duration: 1, stagger: 0.25 });
tl.to(".slider", { y: "-100%", duration: 1.5, delay: 0.5 });
tl.to(".intro", { y: "-100%", duration: 1 }, "-=1");
tl.fromTo("nava", { opacity: 0 }, { opacity: 1, duration: 1 });
tl.fromTo(".bottom", { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.7 }, "-=1");

async function getJokes() {
  try {
    const response = await fetch(jokesUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ..... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    utter();
  } catch (error) {
    console.log('error:', error)
  };
};

function utter() {
  let msg = new SpeechSynthesisUtterance(joke);
  window.speechSynthesis.speak(msg);
};

function toggleButton() {
  jokeButton.disabled = !jokeButton.disabled;
}

function cursorAnimate(e) {
  mouse.style.top = e.pageY + 'px';
  mouse.style.left = e.pageX + 'px';
}
function cursorActive(e) {
  const element = e.target;
  if (element.classList.contains('hover') || element.classList.contains('nav-item')){
    mouse.classList.add('active');
  } else {
    mouse.classList.remove('active');
  }
}

jokeButton.addEventListener('click', getJokes);
window.addEventListener('mousemove', cursorAnimate);
window.addEventListener('mouseover', cursorActive);
