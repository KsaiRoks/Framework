class Header extends Component {
    addEventListeners() {
        document.getElementById('showCalc').addEventListener('click', () => this.callbacks.showPage('calc'));
        document.getElementById('showEssay').addEventListener('click', () => this.callbacks.showPage('essay'));
        document.getElementById('showGame').addEventListener('click', () => this.callbacks.showPage('game'));
        document.getElementById('show2D').addEventListener('click', () => this.callbacks.showPage('graph2D'));
        document.getElementById('show2D').addEventListener('click', () => document.body.style.backgroundColor = 'rgb(130 130 130)');
        document.getElementById('show3D').addEventListener('click', () => this.callbacks.showPage('graph3D'));
        document.getElementById('show3D').addEventListener('click', () => document.body.style.backgroundColor = 'rgb(84 96 115)');
        document.getElementById('showTarget').addEventListener('click', () => this.callbacks.showPage('target'));
    }
}