const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
setupCanvas();

const width = canvas.width;
const height = canvas.height;

// معادلة رسم منحنى القلب
function heartX(t) {
    return 16 * Math.pow(Math.sin(t), 3);
}

function heartY(t) {
    return -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
}

// إعداد النقاط
const numParticles = 400;
const scale = Math.min(width, height) / 45;
let particles = [];

for (let i = 0; i < numParticles; i++) {
    let a = (2 * Math.PI * i) / numParticles;
    let x0 = heartX(a) * scale;
    let y0 = heartY(a) * scale - 40; // رفعه قليلاً للأعلى لترك مساحة للنص

    let L = 0.2 + Math.random() * 0.4;
    let x1 = x0 * (1 - L);
    let y1 = y0 * (1 - L);

    particles.push({ x0, y0, x1, y1, drawn: false });
}

let currentIndex = 0;
let textIndex = 0;
const textToDraw = "I LOVE YOU";
let isHeartFinished = false;

function animate() {
    // رسم الخلفية السوداء الشفافة للحفاظ على التأثير المتوهج
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // 1. رسم خطوط القلب تدريجياً خطوة بخطوة
    if (currentIndex < particles.length) {
        // رسم 3 خطوط في كل إطار لسرعة متناسقة وممتعة
        for (let k = 0; k < 3 && currentIndex < particles.length; k++) {
            let p = particles[currentIndex];
            
            let r = Math.floor(255);
            let g = Math.floor(20 + Math.random() * 80);
            let b = Math.floor(140 + Math.random() * 115);

            ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(p.x0, p.y0);
            ctx.lineTo(p.x1, p.y1);
            ctx.stroke();

            currentIndex++;
        }
    } else {
        isHeartFinished = true;
    }

    // 2. كِتابة النص "I LOVE YOU" حرف بحرف بعد اكتمال القلب
    if (isHeartFinished) {
        ctx.font = 'bold 42px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ff007f';
        ctx.fillStyle = '#ff3399';

        let currentText = textToDraw.substring(0, Math.floor(textIndex));
        ctx.fillText(currentText, 0, (Math.min(canvas.width, canvas.height) / 2) - 60);

        if (textIndex < textToDraw.length) {
            textIndex += 0.05; // سرعة كتابة الحروف
        }
    }

    ctx.restore();
    requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
    setupCanvas();
});
