document.getElementById('create-point').addEventListener('click', function() {
    // 创建一个新的点元素
    const newPoint = document.createElement('div');
    newPoint.style.width = "20px";
    newPoint.style.height = "20px";
    newPoint.style.backgroundColor = "blue";
    newPoint.style.position = "absolute";
    newPoint.style.borderRadius = "50%";
    newPoint.style.cursor = "pointer";
    newPoint.style.left = "80px"; // 默认位置
    newPoint.style.top = "80px"; // 默认位置
    newPoint.classList.add('draggable-point'); // 添加类名以便应用样式和选择
    
    document.body.appendChild(newPoint); // 将新点添加到文档中
});

document.addEventListener('mousedown', function(e) {
    const target = e.target;
    if (target.classList.contains('draggable-point')) {
        isDragging = true;
        currentPoint = target; // 更新当前拖动的点
        e.preventDefault();
    }
});

let isDragging = false;
let currentPoint = null; // 当前正在拖动的点

document.addEventListener('mousemove', function(e) {
    if (isDragging && currentPoint) {
        const x = e.clientX;
        const y = e.clientY;
        currentPoint.style.left = x + 'px';
        currentPoint.style.top = y + 'px';
    }
});

document.addEventListener('mouseup', function() {
    isDragging = false;
    currentPoint = null; // 清除当前拖动的点引用
});
