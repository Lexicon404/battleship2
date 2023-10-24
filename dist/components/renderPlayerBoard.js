import component from "../lib/component.js";
import game from "../game/main.js";
var renderComponent = function (props) {
    console.log("render function triggered");
    console.log(props);
    function obtainClickPosition(e) {
        console.log(e);
        if (!e.target)
            return;
        let payload = {
            x: Number(e.target.dataset.positionx),
            y: Number(e.target.dataset.positiony)
        };
        game.dispatch('clickBoard', payload);
    }
    //Builds player board for ship placement
    var board = document.createElement('div');
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let grid = document.createElement('div');
            grid.setAttribute('data-positionx', `${j}`);
            grid.setAttribute('data-positiony', `${i}`);
            grid.setAttribute('class', `board-grid`);
            board.appendChild(grid);
        }
    }
    if (props.status == 'placingShips') {
        var container = document.getElementById('large-board-container');
        var smallContainer = document.getElementById('small-board-container');
        board.classList.add('board-large');
        board.addEventListener('click', (e) => obtainClickPosition(e));
        board.addEventListener('dragover', (e) => e.preventDefault());
        board.addEventListener('drop', (e) => obtainClickPosition(e));
        if (smallContainer) {
            smallContainer.innerHTML = "";
        }
    }
    else {
        var container = document.getElementById('small-board-container');
        board.classList.remove('board-large');
        board.classList.add('board-small');
        board.removeEventListener('click', (e) => obtainClickPosition(e));
    }
    if (!container)
        return;
    container.innerHTML = '';
    container.appendChild(board);
    //toggle grid class based on props.status
    if (!props.status)
        return;
    if (props.board[0].positionShipPlaced.length > 0) {
        props.board[0].positionShipPlaced.forEach(function (position) {
            let shipOnGrid = container.querySelector(`[data-positionx='${position.x}'][data-positiony='${position.y}']`);
            if (shipOnGrid) {
                shipOnGrid.classList.add('ship-on-grid');
            }
        });
    }
    if (props.board[0].positionAttacked.length > 0) {
        props.board[0].positionAttacked.forEach(function (position) {
            let shipOnGrid = container.querySelector(`[data-positionx='${position.x}'][data-positiony='${position.y}']`);
            if (shipOnGrid) {
                shipOnGrid.classList.add('attack-on-grid');
            }
        });
    }
    if (props.board[0].positionHit.length > 0) {
        props.board[0].positionHit.forEach(function (position) {
            let shipOnGrid = container.querySelector(`[data-positionx='${position.x}'][data-positiony='${position.y}']`);
            if (shipOnGrid) {
                shipOnGrid.classList.add('damage-on-grid');
            }
        });
    }
};
var renderPlayerBoard = component({ game,
    render: renderComponent,
});
export { renderPlayerBoard };
