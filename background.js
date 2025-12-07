const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let spheres = [];

// Colors from CSS variables (hardcoded here for JS access)
const colors = [
    'rgba(255, 103, 100, 0.6)', // Red-ish
    'rgba(100, 110, 255, 0.6)', // Blue-ish
    'rgba(100, 255, 100, 0.6)',  // Green-ish
    'rgba(117, 39, 153, 0.6)', // Red-ish
    'rgba(243, 43, 193, 0.6)', // Blue-ish
    'rgba(232, 191, 43, 0.6)'  // Green-ish
];

class Sphere {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        // Random velocity
        this.dx = (Math.random() - 0.5) * 4;
        this.dy = (Math.random() - 0.5) * 4;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        // Apply blur effect directly on the context for this shape
        ctx.filter = 'blur(80px)';
        ctx.fill();
        ctx.filter = 'none'; // Reset filter
        ctx.closePath();
    }

    update() {
        // Bounce off walls (with some buffer for the radius)
        if (this.x + this.radius > width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

function init() {
    resize();
    spheres = [];
    // Create 3 spheres as before, or more if desired. Sticking to 3 for now to match design.
    // Randomize initial positions slightly
    spheres.push(new Sphere(width * 0.2, height * 0.2, 200, colors[0]));
    spheres.push(new Sphere(width * 0.8, height * 0.8, 150, colors[1]));
    spheres.push(new Sphere(width * 0.5, height * 0.5, 100, colors[2]));
    spheres.push(new Sphere(width * 0.2, height * 0.2, 200, colors[3]));
    spheres.push(new Sphere(width * 0.8, height * 0.8, 150, colors[4]));
    spheres.push(new Sphere(width * 0.5, height * 0.5, 100, colors[5]));
}

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);

    spheres.forEach(sphere => sphere.update());
}

window.addEventListener('resize', resize);

init();
animate();
