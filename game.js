const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let azi = {
    x: 50,
    y: 50,
    size: 20,
    dx: 0,
    dy: 0,
    speed: 5,
};

let deaCells = [];
const cellSize = 10;

function createDeaCells() {
    deaCells = [];
    for (let i = 0; i < 50; i++) {
        let x = Math.random() * (canvas.width - cellSize);
        let y = Math.random() * (canvas.height - cellSize);
        deaCells.push({ x, y });
    }
}

function drawAzi() {
    ctx.beginPath();
    ctx.arc(azi.x, azi.y, azi.size, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

function drawDeaCells() {
    deaCells.forEach(dea => {
        ctx.beginPath();
        ctx.arc(dea.x, dea.y, cellSize, 0, Math.PI * 2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    });
}

function updateAziPosition() {
    azi.x += azi.dx;
    azi.y += azi.dy;

    if (azi.x < azi.size) azi.x = azi.size;
    if (azi.x > canvas.width - azi.size) azi.x = canvas.width - azi.size;
    if (azi.y < azi.size) azi.y = azi.size;
    if (azi.y > canvas.height - azi.size) azi.y = canvas.height - azi.size;
}

function checkDeaCellCollisions() {
    deaCells.forEach((dea, index) => {
        let dx = azi.x - dea.x;
        let dy = azi.y - dea.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < azi.size + cellSize) {
            deaCells.splice(index, 1);
            score++;
            document.getElementById("score").textContent = score;
        }
    });
}

function moveAzi(e) {
    if (e.key === "ArrowUp") {
        azi.dy = -azi.speed;
        azi.dx = 0;
    } else if (e.key === "ArrowDown") {
        azi.dy = azi.speed;
        azi.dx = 0;
    } else if (e.key === "ArrowLeft") {
        azi.dx = -azi.speed;
        azi.dy = 0;
    } else if (e.key === "ArrowRight") {
        azi.dx = azi.speed;
        azi.dy = 0;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAzi();
    drawDeaCells();
    updateAziPosition();
    checkDeaCellCollisions();

    if (deaCells.length === 0) {
        createDeaCells();
    }

    requestAnimationFrame(draw);
}

createDeaCells();
document.addEventListener("keydown", moveAzi);
draw();