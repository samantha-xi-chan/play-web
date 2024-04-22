let points = []; // 用于存储点的数组
let lines = []; // 用于存储线段的数组
let isDragging = false;
let currentPoint = null; // 当前正在拖动的点

document.getElementById('create-point').addEventListener('click', function() {
    const newPoint = document.createElement('div');
    const pointId = 'point-' + points.length; // 给点分配唯一标识
    newPoint.setAttribute('id', pointId);
    applyPointStyle(newPoint);
    document.body.appendChild(newPoint);

    points.push({id: pointId, element: newPoint, connectedTo: null}); // 添加点到数组

    if (points.length > 1) { // 当存在至少两个点时，创建线段
        const newLine = document.createElement('div');
        newLine.classList.add('line');
        document.body.appendChild(newLine);
        const lastPointIndex = points.length - 1;
        lines.push({from: points[lastPointIndex - 1].id, to: pointId, element: newLine}); // 添加线段到数组
        updateLinePosition(points[lastPointIndex - 1], points[lastPointIndex], newLine); // 更新线段位置
    }
});

document.addEventListener('mousedown', function(e) {
    if (e.target.id.startsWith('point-')) {
        isDragging = true;
        currentPoint = points.find(p => p.id === e.target.id);
        e.preventDefault();
    }
});

document.addEventListener('mousemove', function(e) {
    if (isDragging && currentPoint) {
        const x = e.clientX;
        const y = e.clientY;
        currentPoint.element.style.left = x + 'px';
        currentPoint.element.style.top = y + 'px';

        // 更新与当前点连接的线段的位置
        lines.forEach(line => {
            if (line.from === currentPoint.id || line.to === currentPoint.id) {
                const fromPoint = points.find(p => p.id === line.from);
                const toPoint = points.find(p => p.id === line.to);
                updateLinePosition(fromPoint, toPoint, line.element);
            }
        });

        // 实现磁吸逻辑（简化版）
        points.forEach(point => {
            if (point.id !== currentPoint.id) {
                const dx = Math.abs(point.element.offsetLeft - currentPoint.element.offsetLeft);
                const dy = Math.abs(point.element.offsetTop - currentPoint.element.offsetTop);
                if (dx < 10 && dy < 10) { // 如果两点距离很近，就吸附
                    currentPoint.element.style.left = point.element.style.left;
                    currentPoint.element.style.top = point.element.style.top;
                    updateAllLines(); // 更新所有线段的位置
                }
            }
        });
    }
});

document.addEventListener('mouseup', function() {
    isDragging = false;
    currentPoint = null;
});

function applyPointStyle(point) {
    point.style.width = "20px";
    point.style.height = "20px";
    point.style.backgroundColor = "blue";
    point.style.position = "absolute";
    point.style.borderRadius = "50%";
    point.style.cursor = "pointer";
    point.style.left = "50px";
    point.style.top = "50px";
}

function updateLinePosition(fromPoint, toPoint, line) {
    const startX = fromPoint.element.offsetLeft + 10; // 加10是因为点的中心
    const startY = fromPoint.element.offsetTop + 10;
    const endX = toPoint.element.offsetLeft + 10;
    const endY = toPoint.element.offsetTop + 10;

    const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

    line.style.width = length + 'px';
    line.style.transform = 'rotate(' + angle + 'deg)';
    line.style.transformOrigin = '0 0';
    line.style.position = 'absolute';
    line.style.left = startX + 'px';
    line.style.top = startY + 'px';
}

function updateAllLines() {
    lines.forEach(line => {
        const fromPoint = points.find(p => p.id === line.from);
        const toPoint = points.find(p => p.id === line.to);
        updateLinePosition(fromPoint, toPoint, line.element);
    });
}
