let current = 1;

document.getElementById("startBtn")?.addEventListener("click", nextScreen);

function nextScreen() {
  const currentScreen = document.getElementById(`screen-${current}`);
  const next = document.getElementById(`screen-${current + 1}`);

  if (!next) return;

  currentScreen.classList.remove("active");
  next.classList.add("active");
  current++;
}


const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function createHeart() {
  hearts.push({
    x: Math.random() * canvas.width,
    y: canvas.height + 10,
    size: Math.random() * 6 + 4,
    speed: Math.random() * 1 + 0.5
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((h, i) => {
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.beginPath();
    ctx.arc(h.x, h.y, h.size, 0, Math.PI * 2);
    ctx.fill();
    h.y -= h.speed;
    if (h.y < -10) hearts.splice(i, 1);
  });
  requestAnimationFrame(draw);
}

setInterval(createHeart, 300);
draw();
