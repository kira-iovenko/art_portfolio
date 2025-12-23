const track = document.getElementById("carousel");
const container = document.getElementById("carousel-container");
let offset = 0;
let speed = 1;
let isPaused = false;

while (track.scrollWidth < container.offsetWidth * 3) {
  track.innerHTML += track.innerHTML;
}

const setWidth = track.scrollWidth / 2;

container.addEventListener("mouseenter", () => isPaused = true);
container.addEventListener("mouseleave", () => isPaused = false);

function animate() {
  if (!isPaused) {
    offset += speed;
    if (offset >= setWidth) offset -= setWidth;
    track.style.transform = `translateX(-${offset}px)`;
  }
  requestAnimationFrame(animate);
}

animate();
