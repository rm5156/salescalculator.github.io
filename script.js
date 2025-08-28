// 売上計算ツール
const priceInput = document.getElementById('price');
const quantityInput = document.getElementById('quantity');
const discountInput = document.getElementById('discount');
const taxInput = document.getElementById('tax');
const result = document.getElementById('result');
const calculateBtn = document.getElementById('calculate');

calculateBtn.addEventListener('click', () => {
    const price = parseFloat(priceInput.value) || 0;
    const quantity = parseFloat(quantityInput.value) || 0;
    const discount = parseFloat(discountInput.value) || 0;
    const tax = parseFloat(taxInput.value) || 0;

    let subtotal = price * quantity;
    subtotal *= (1 - discount / 100);
    const total = subtotal * (1 + tax / 100);

    result.textContent = `合計：${total.toFixed(0)} 円`;
});

// 夜空
const canvas = document.getElementById('sky');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 星
const stars = [];
for(let i=0;i<200;i++){
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random()*1.5 + 0.5,
        brightness: Math.random(),
        delta: Math.random()*0.02 + 0.01,
        color: ['#fff','#ffd','lightblue','#aaffff'][Math.floor(Math.random()*4)]
    });
}

// 三日月
let moonY = 150;
let moonDirection = 1;

function drawMoon() {
    const x = canvas.width - 150;
    moonY += moonDirection * 0.2;
    if(moonY > 170 || moonY < 130) moonDirection *= -1;

    // 三日月本体
    ctx.fillStyle = "#fffacd";
    ctx.beginPath();
    ctx.arc(x, moonY, 50, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.fill();

    // 欠け
    ctx.fillStyle = "#000033";
    ctx.beginPath();
    ctx.arc(x + 15, moonY, 50, 0.5 * Math.PI, 1.5 * Math.PI);
    ctx.fill();

    // 輝き
    const gradient = ctx.createRadialGradient(x, moonY, 0, x, moonY, 70);
    gradient.addColorStop(0, 'rgba(255,255,200,0.4)');
    gradient.addColorStop(1, 'rgba(255,255,200,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, moonY, 70, 0, Math.PI*2);
    ctx.fill();
}

// 流れ星
const shootingStars = [];
function createShootingStar() {
    const x = Math.random() * canvas.width * 0.8;
    const y = Math.random() * canvas.height * 0.5;
    const length = Math.random() * 100 + 50;
    const speed = Math.random() * 8 + 4;
    shootingStars.push({x, y, length, speed});
}

function animate() {
    ctx.fillStyle = "#000033";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // 星
    stars.forEach(star => {
        star.brightness += star.delta;
        if(star.brightness > 1 || star.brightness < 0) star.delta *= -1;
        ctx.fillStyle = `rgba(${parseInt(star.color.slice(1,3),16)},${parseInt(star.color.slice(3,5),16)},${parseInt(star.color.slice(5,7),16)},${star.brightness})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r,0,Math.PI*2);
        ctx.fill();
    });

    drawMoon();

    // 流れ星
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    for(let i=0;i<shootingStars.length;i++){
        const star = shootingStars[i];
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x + star.length, star.y + star.length);
        ctx.stroke();

        star.x += star.speed;
        star.y += star.speed;

        if(star.x > canvas.width || star.y > canvas.height){
            shootingStars.splice(i,1);
            i--;
        }
    }

    if(Math.random() < 0.02) createShootingStar();

    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();

