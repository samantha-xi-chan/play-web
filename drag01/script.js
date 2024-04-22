// 获取可拖动点的DOM元素
const point = document.getElementById('draggable-point');

let isDragging = false;

point.addEventListener('mousedown', function(e) {
    // 当鼠标按下时，标记开始拖动
    isDragging = true;
    // 防止拖动时发生页面选择等默认行为
    e.preventDefault();
});

document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        // 计算点的新位置
        const x = e.clientX;
        const y = e.clientY;
        // 更新点的位置
        point.style.left = x + 'px';
        point.style.top = y + 'px';
    }
});

document.addEventListener('mouseup', function() {
    // 当鼠标松开时，标记停止拖动
    isDragging = false;
});

