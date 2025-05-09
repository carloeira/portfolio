const canvas = document.querySelector('canvas.rain');
const ctx = canvas.getContext('2d');

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

canvas.width = w;
canvas.height = h;

// Caractere Matrix
const chars = 'アァイィウエカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const charArray = chars.split('');
const fontSize = 16;
let columns = Math.floor(w / fontSize);
let drops = Array(columns).fill(1);

// Posição do mouse
let mouseX = -1000;
canvas.addEventListener('mousemove', e => {
  mouseX = e.clientX;
});
canvas.addEventListener('mouseleave', () => {
  mouseX = -1000;
});

// Redimensionamento
window.addEventListener('resize', () => {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  columns = Math.floor(w / fontSize);
  drops = Array(columns).fill(1);
});

function drawMatrix() {
  // Fundo com rastro
  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.fillRect(0, 0, w, h);
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < columns; i++) {
    const text = charArray[Math.floor(Math.random() * charArray.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    // Cálculo do brilho com base na distância horizontal ao mouse
    const dist = Math.abs(mouseX - x);
    const maxDist = 100;
    const brightness = Math.max(0.3, 1 - dist / maxDist);
    const glow = dist < maxDist ? (1 - dist / maxDist) * 15 : 0;

    ctx.fillStyle = `rgba(0, 255, 0, ${brightness})`;
    ctx.shadowColor = '#0f0';
    ctx.shadowBlur = glow;
    ctx.fillText(text, x, y);
    ctx.shadowBlur = 0;

    // Reset aleatório
    if (y > h && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

function loop() {
  drawMatrix();
  requestAnimationFrame(loop);
}

loop();
