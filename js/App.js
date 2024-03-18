class App extends Component {
    constructor(props) {
        super(props);
        this.header = new Header({
            id: 'header',
            parent: this.id,
            template: template.headerTemplate,
            callbacks: {
                showPage: (name) => this.showPage(name)
            }
        });

        this.calc = new Calc({
            id: 'calc',
            parent: this.id,
            template: template.calcTemplate
        });

        this.essay = new Essay({
            id: 'essay',
            parent: this.id,
            template: template.essayTemplate
        });

        this.game = new Game({
            id: 'game',
            parent: this.id,
            template: template.gameTemplate
        });

        this.graph2D = new Graph2D({
            id: 'graph2D',
            parent: this.id,
            template: template.graph2DTemplate
        });

        this.graph3D = new Graph3D({
            id: 'graph3D',
            parent: this.id,
            template: template.graph3DTemplate
        });

        this.target = new Target({
            id: 'target',
            parent: this.id,
            template: template.targetTemplate
        });

        this.showPage('header');
    }

    showPage(name) {
        this.calc.hide(); 
        this.essay.hide();
        this.game.hide();
        this.graph2D.hide();
        this.graph3D.hide();
        this.target.hide();
        if (this[name]?.show) {
            this[name].show();
        }
    }
}