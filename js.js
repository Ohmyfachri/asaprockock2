var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var numhearts = 300; // Jumlah hati
var hearts = [];
var speed = 1;
var centerx = canvas.width / 2;
var centery = canvas.height / 2;

// Membuat array hati
for (var i = 0; i < numhearts; i++) {
    hearts[i] = new Heart();
}

function Heart() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.z = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 2; // Ukuran hati bervariasi
    this.color = `hsla(${Math.random() * 360}, 100%, 60%, 0.8)`; // Warna random

    this.move = function () {
        this.z += speed;
        if (this.z >= canvas.height) {
            this.z = 0;
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
    };

    this.show = function () {
        var x, y, s;
        x = (this.x - centerx) * (canvas.width / this.z);
        x = x + centerx;
        y = (this.y - centery) * (canvas.width / this.z);
        y = y + centery;
        s = this.size * (canvas.width / this.z); // Skala hati

        drawHeart(x, y, s, this.color);
    };
}

// Fungsi menggambar hati
function drawHeart(x, y, size, color) {
    context.fillStyle = "#ff0000";
    context.beginPath();
    context.moveTo(x, y + size / 4);
    
    // Kurva kiri hati
    context.bezierCurveTo(x - size, y - size, x - size * 2, y + size / 2, x, y + size);
    
    // Kurva kanan hati
    context.bezierCurveTo(x + size * 2, y + size / 2, x + size, y - size, x, y + size / 4);
    
    context.fill();
}

// Fungsi utama animasi
var bgImage = new Image();
bgImage.src = "bc.png"; // Ganti dengan path gambar PNG kamu

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Hapus frame sebelumnya

    // Gambar background setelah gambar selesai dimuat
    context.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    for (var i = 0; i < numhearts; i++) {
        hearts[i].show();
        hearts[i].move();
    }

    requestAnimationFrame(draw);
}

    requestAnimationFrame(draw);


// Memulai animasi
draw();
