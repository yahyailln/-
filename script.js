const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// الحروف والرموز المستخدمة في التكشيل
const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[];:=+*#@!$%&';
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);

// تحديد مواضع البداية للأعمدة
let drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * -100);
}

function draw() {
    // رسم طبقة شفافة سوداء لإنشاء تأثير الذيل الخلفي
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0'; // لون النصوص الأخضر
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // إعادة الصعود لأعلى بعد الخروج من الشاشة
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }

    requestAnimationFrame(draw);
}

draw();

// إعادة ضبط الحجم عند تغيير أبعاد النافذة
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100);
    }
});
