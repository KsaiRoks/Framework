Surfaces.prototype.cube = () => {

    return new Surface([
        new Point(10, 10, 10),
        new Point(10, -10, 10),
        new Point(-10, -10, 10),
        new Point(-10, 10, 10),

        new Point(10, 10, -10),
        new Point(10, -10, -10),
        new Point(-10, -10, -10),
        new Point(-10, 10, -10),
    ], [
        new Edge(0, 1),
        new Edge(0, 3),
        new Edge(0, 4),
        new Edge(1, 2),
        new Edge(1, 5),
        new Edge(2, 3),
        new Edge(2, 6),
        new Edge(3, 7),
        new Edge(4, 5),
        new Edge(4, 7),
        new Edge(5, 6),
        new Edge(6, 7)
    ], [
        new Polygon([0, 1, 2, 3], '#ff0000'),
        new Polygon([4, 5, 6, 7], '#008000'),
        new Polygon([1, 2, 6, 5], '#FFFF00'),
        new Polygon([0, 1, 5, 4], '#BF40BF'),
        new Polygon([2, 6, 7, 3], '#088F8F'),
        new Polygon([0, 3, 7, 4], '#ffa500')
    ]);
}
// все поверхности (куб бублик элипсоид сфера и бутылка) заполнить полигонами, для каждой фигуры выбирать цвет полигонов
//* на сцене рисовать несколько фигур
//** корректно уметь рисовать несколько фигур
//*** для каждой фигуры определять её настройки чтобы задавать (радиус, количество точек, центр координат)