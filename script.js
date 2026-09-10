const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const width = canvas.width;
const height = canvas.height;

// معادلة رسم منحنى القلب
function heartX(t) {
    return 16 * Math.pow(Math.sin(t), 3);
}

function heartY(t) {
    return -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
}

let particles = [];
const numParticles = 320;
const scale = Math.min(width, height) / 40;

for (let i = 0; i < numParticles; i++) {
    let a = (2 * Math.PI * i) / numParticles;
    let x0 = heartX(a) * scale;
    let y0 = heartY(a) * scale;
    
    let L = 0.15 + Math.random() * 0.35;
    let x1 = x0 * (1 - L);
    let y1 = y0 * (1 - L);

    particles.push({ x0, y0, x1, y1, progress: 0 });
}

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2);

    particles.forEach(p => {
        p.progress += 0.02;
        if (p.progress > 1) p.progress = 0;

        let f = p.progress;
        
        // حساب الألوان الوردي والموف مثل الفيديو
        let r = Math.floor(255 * (0.8 + 0.2 * (1 - f)));
        let g = Math.floor(255 * (0.1 * (1 - f)));
        let b = Math.floor(255 * (0.5 + 0.5 * f));
        
        ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.lineWidth = 1.5;

        let currX0 = p.x0;
        let currY0 = p.y0;
        let currX1 = p.x0 + (p.x1 - p.x0) * f;
        let currY1 = p.y0 + (p.y1 - p.y0) * f;

        ctx.beginPath();
        ctx.moveTo(currX0, currY0);
        ctx.lineTo(currX1, currY1);
        ctx.stroke();
    });

    ctx.restore();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
