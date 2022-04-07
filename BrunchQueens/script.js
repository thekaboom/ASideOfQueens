'use strict';

const togglebar = document.querySelector('.bar');
const toggle = document.querySelector('.toggle');
const menu = document.querySelector('.menu');
const menulinks = document.querySelectorAll('.menu a');

let togglefunc = () => {
  toggle.classList.toggle('open');
  menu.classList.toggle('open');
}

togglebar.onclick = togglefunc;

menulinks.forEach((e) => {
  e.onclick = togglefunc;
});



const VW = window.innerWidth;
const VH = window.innerHeight;

let getContext = (w, h, c) => {
  let canvas = document.createElement("canvas");
  canvas.classList.add('header-canvas');
  document.querySelector('header').appendChild(canvas);
  canvas.width = w || window.innerWidth;
  canvas.height = h || window.innerHeight;
  return canvas.getContext("2d");
}

const ctx = getContext(VW, VH);

class Particle {
  constructor(x,y,radius,opacity) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.radius = 0;
    this.targetRadius = radius;
    this.opacity = 0;
    this.targetOpacity = opacity;
    this.waxing = true;
  }

  move() {
    this.vy -= 0.005;
    this.y += this.vy;

    this.radius += (this.targetRadius - this.radius) / 50;
    this.opacity += (this.targetOpacity - this.opacity) / 50;

    if (this.y < 0) {
      return true;
    } else {
      return false;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.opacity / 100})`;
    ctx.fill();
  }
}

const particles = [];

let update = () => {
  let s = Math.round(Math.random() * 100);
  if (s < 10) {
    let p = new Particle(Math.round(Math.random() * VW), Math.round(Math.random() * VH), Math.ceil(Math.random() * 3), Math.round(Math.random() * 50 + 25));
    particles.push(p);
  }


  let a = [];
  particles.forEach((e) => {
    if (!e.move()) {
      a.push(e);
    }
  })
  particles.length = 0;
  a.forEach((e) => {
    particles.push(e);
  })
}

let draw = () => {
  ctx.clearRect(0,0,VW,VH);

  particles.forEach((e) => {
    e.draw(ctx);
  });
}

let frame = setInterval(() => {
  update();
  draw();
}, 16); // ~60fps