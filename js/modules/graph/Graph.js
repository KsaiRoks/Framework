function Graph({ id, width = 300, height = 300, WIN, callbacks = {} }) {
    let canvas;
    if (id) {
        canvas = document.getElementById(id);
    } else {
        canvas = document.createElement('canvas');
        document.querySelector('body').appendChild(canvas);
    }
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    const { wheel, mousemove, mouseleave, mouseup, mousedown } = callbacks;
    canvas.addEventListener('wheel', wheel);
    canvas.addEventListener('mousemove', mousemove);
    canvas.addEventListener('mouseleave', mouseleave);
    canvas.addEventListener('mouseup', mouseup);
    canvas.addEventListener('mousedown', mousedown);
    const PI2 = 2 * Math.PI;

    function xs(x) {
        return (x - WIN.LEFT) / WIN.WIDTH * canvas.width;
    }
    function ys(y) {
        return (WIN.HEIGHT - (y - WIN.BOTTOM)) / WIN.HEIGHT * canvas.height;
    }

    function findDerivative(f, xs) {
        let h = 0.0001;
        let derivative = (func(xs + h) - func(xs - h)) / (2 * h);
        return console.log(derivative);
    }

    this.sx = x => x * WIN.WIDTH / canvas.width;
    this.sy = y => -y * WIN.HEIGHT / canvas.height;

    this.clear = function (color = 'white') {
        context.fillStyle = color;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    this.line = function (x1, y1, x2, y2, color = 'black', width = 1) {
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = width;
        context.moveTo(xs(x1), ys(y1));
        context.lineTo(xs(x2), ys(y2));
        context.stroke();
        context.closePath();
    }

    this.point = function (x, y, color = 'black', size = 2) {
        context.beginPath();
        context.strokeStyle = color;
        context.arc(xs(x), ys(y), size, 0, PI2);
        context.stroke();
        context.closePath();
    }

    this.polygon = function (points, color = '#f805') {
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(xs(points[0].x), ys(points[0].y));
        for (let i = 1; i < points.length; i++) {
            context.lineTo(xs(points[i].x), ys(points[i].y));
        }
        context.lineTo(xs(points[0].x), ys(points[0].y));
        context.closePath();
        context.fill();
    }

    this.text = function () { }
}