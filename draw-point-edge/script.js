// script.js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let lastPoint = null;

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const point = { x, y };

    drawPoint(point);
    if (lastPoint) {
        connectPoints(lastPoint, point);
    }
    lastPoint = point;
});

function drawPoint(point) {
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    ctx.fill();
}

function connectPoints(point1, point2) {
    ctx.strokeStyle = '#f00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
}

let currentColor = '#000000';
let lineWidth = 2;

document.getElementById('colorPicker').addEventListener('change', function(event) {
    currentColor = event.target.value;
});

document.getElementById('lineWidth').addEventListener('input', function(event) {
    lineWidth = event.target.value;
});

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    lastPoint = null; // 清空后重置上一个点
}

// 修改drawPoint函数和connectPoints函数
function drawPoint(point) {
    ctx.fillStyle = currentColor;
    ctx.beginPath();
    ctx.arc(point.x, point.y, lineWidth, 0, 2 * Math.PI);
    ctx.fill();
}

function connectPoints(point1, point2) {
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
}
