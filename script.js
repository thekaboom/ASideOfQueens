var canvas = document.getElementById('SideQueens');
var ctx = canvas.getContext('2d');
var particles = [];
var particleCount = 280;

for (var i = 0; i < particleCount; i++) {
  particles.push(new particle());
}

function particle() {
  this.x = Math.random() * canvas.width;
  this.y = canvas.height + Math.random() * 300;
  this.speed = 1 + Math.random();
  this.radius = Math.random() * 3;
  this.opacity = (Math.random() * 100) / 1000;
}

function loop() {
  requestAnimationFrame(loop);
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'lighter';
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,255,' + p.opacity + ')';
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
    ctx.fill();
    p.y -= p.speed;
    if (p.y <= -10)
      particles[i] = new particle();
  }
}
loop();

const editable = document.querySelector('.changing-text');

const words = [
  'BRUNCH',
  'MIMOSAS',
  'EVENTS',
  'PARTIES',
  'DINNER',
  'CONCERTS',
  'MUSICALS',
  'LUNCH',
];
const animationTimeInms = 15;
const delayInms = 1000;

function close(index) {
  editable.textContent = words[index % words.length];
  const interval = setInterval(function() {
    const text = editable.textContent;
    if (!text) {
      clearInterval(interval);
      setTimeout(function() {
        open(++index);
      }, 100);
    }
    editable.textContent = text.slice(0, -1);
  }, animationTimeInms);
}

function open(index) {
  const initialText = words[index % words.length];
  let i = 1;
  editable.textContent = '';
  const interval = setInterval(function() {
    const text = editable.textContent;
    console.log(text.length === initialText.length);
    if (text.length === initialText.length) {
      clearInterval(interval);
      setTimeout(function() {
        close(index);
      }, delayInms);
    }
    editable.textContent = initialText.slice(0, i++);
  }, animationTimeInms);
}

function writeWords() {
  const i = 0;
  open(i);
}

writeWords();