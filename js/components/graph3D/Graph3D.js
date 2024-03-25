class Graph3D extends Component {
    constructor(options) {
        super(options);
        const WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20,
            CENTER: new Point(0, 0, -30),
            CAMERA: new Point(0, 0, -50),

        }
        this.graph = new Graph({
            id: 'canvas3D',
            width: 600,
            height: 600,
            WIN,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mousemove: (event) => this.mousemove(event),
                mouseup: () => this.mouseup(),
                mousedown: () => this.mousedown(),
            }
        });

        this.math3D = new Math3D({ WIN });
        this.surfaces = new Surfaces;
        this.scene = this.solarSystem();
        setInterval(() => {
            this.scene.forEach(surface => surface.doAnimation(this.math3D));
            this.renderScene();
        }, 50);
        this.dx = 0;
        this.dy = 0;
        this.canMove = false;
        this.drawPoints = true;
        this.drawEdges = true;
        this.drawPolygons = true;
        this.WIN = WIN;
        this.LIGHT = new Light(-40, 15, 0, 1500);

        this.renderScene();
    }

    mouseup() {
        this.canMove = false;
    }

    mousedown() {
        this.canMove = true;
    }

    wheel(event) {
        event.preventDefault();
        const delta = (event.wheelDelta > 0) ? 0.9 : 1.2;
        const matrix = this.math3D.zoom(delta);
        this.scene.forEach(surface => surface.points.forEach(point => this.math3D.transform(matrix, point)));
        this.graph.clear();
        this.renderScene();
    }

    mousemove(event) {
        if (this.canMove) {
            const gradus = Math.PI / 180 / 4;
            this.scene.forEach(surface =>
                surface.points.forEach(point => {
                    this.math3D.rotateOx(point, (this.dy - event.offsetY) * gradus);
                    this.math3D.rotateOy(point, (this.dx - event.offsetX) * gradus);
                })
            );
            this.graph.clear();
            this.renderScene();
        }
        this.dx = event.offsetX;
        this.dy = event.offsetY;
    }

    addEventListeners() {
        document.getElementById('selectSurface').addEventListener('change', (event) => {
            this.scene = this.surfaces[event.target.value]();
            this.renderScene();
        });

        document.getElementById('drawPoints').addEventListener('click', (event) => {
            this.drawPoints = !!event.target.checked;
            this.renderScene();
        });
        document.getElementById('drawEdges').addEventListener('click', (event) => {
            this.drawEdges = !!event.target.checked;
            this.renderScene();
        });
        document.getElementById('drawPolygons').addEventListener('click', (event) => {
            this.drawPolygons = !!event.target.checked;
            this.renderScene();
        });
    }

    renderScene() {
        this.graph.clear();
        if (this.drawPolygons) {
            const polygons = [];
            this.scene.forEach((surface, index) => {
                this.math3D.callDistance(surface, this.WIN.CAMERA, 'distance');
                this.math3D.callDistance(surface, this.LIGHT, 'lumen');
                surface.polygons.forEach(polygon => {
                    polygon.index = index;
                    polygons.push(polygon);
                });
            });

            this.math3D.sortByArtistAlgorithm(polygons);

            polygons.forEach(polygon => {
                const points = polygon.points.map(index =>
                    new Point(
                        this.math3D.xs(this.scene[polygon.index].points[index]),
                        this.math3D.ys(this.scene[polygon.index].points[index])
                    )
                );
                const lumen = this.math3D.calcIllumination(polygon.lumen, this.LIGHT.lumen);
                let { r, g, b } = polygon.color;
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                this.graph.polygon(points, polygon.rgbToHex(r, g, b));
            });
        }

        if (this.drawPoints) {
            this.scene.forEach(surface =>
                surface.points.forEach(point =>
                    this.graph.point(this.math3D.xs(point), this.math3D.ys(point)))
            );
        }
        if (this.drawEdges) {
            this.scene.forEach(surface => {
                surface.edges.forEach(edge => {
                    const point1 = surface.points[edge.p1];
                    const point2 = surface.points[edge.p2];
                    this.graph.line(
                        this.math3D.xs(point1), this.math3D.ys(point1),
                        this.math3D.xs(point2), this.math3D.ys(point2)
                    );
                });
            });
        }
    }

    solarSystem(){
        const Earth = this.surfaces.sphere();
        Earth.addAnimation('rotateOX', 0.1);
        const Moon = this.surfaces.cube();
        Moon.addAnimation('rotateOX', 0.2);
        Moon.addAnimation('rotateOZ', 0.5);
        return [Earth, Moon];
    }
}

// все поверхности, уметь кастомизировать количество точек, цвет настройки
// уметь двигать и увеличивать источник света
// для сферы и тора уметь задавать центр координат