Template.prototype.graph3DTemplate = () => `
    <label for="drawPoints">Нарисовать точки</label>
    <input type='checkbox' id='drawPoints' checked> 
    <label for="drawEdges">Нарисовать рёбра</label>
    <input type='checkbox' id='drawEdges' checked>
    <select id = 'selectSurface'>
        <option value="cube">Куб</option>
        <option value="thor">Бублик</option>
        <option value="sphere">Шар</option>
        <option value="ellipsoid">Эллипсоид</option>
    </select> 
    <canvas id='canvas3D'></canvas>
`;