const track = document.getElementById("carousel");
const container = document.getElementById("carousel-container");
if (track && container) {
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
}

const images = document.querySelectorAll(".art-image");
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

images.forEach(img => observer.observe(img));

const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
const panel = canvas.parentElement;

let particles = [];
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

function resizeCanvas() {
    canvas.width = panel.offsetWidth;
    canvas.height = panel.offsetHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

panel.addEventListener("mousemove", (e) => {
    const rect = panel.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

panel.addEventListener("mouseleave", () => {
    mouse.x = canvas.width / 2;
    mouse.y = canvas.height / 2;
});

const PARTICLE_COUNT = 60;
const MAX_RADIUS = 3;
const SPEED = 0.3;
const MOUSE_REACH = 150;
const MOUSE_FACTOR = 0.08;

for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * MAX_RADIUS + 1,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, MOUSE_REACH - dist) / MOUSE_REACH;

        const offsetX = dx * influence * MOUSE_FACTOR;
        const offsetY = dy * influence * MOUSE_FACTOR;

        ctx.beginPath();
        ctx.arc(
            p.x - offsetX,
            p.y - offsetY,
            p.r,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = "rgba(95, 95, 255, 0.38)";
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();