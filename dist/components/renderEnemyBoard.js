import component from "../lib/component.js";
import game from "../game/main.js";
var renderComponent = function (props) {
    console.log("render function triggered");
    console.log(props);
    if (props.status == 'placingShips' || props.status == '')
        return;
    //Builds enemy board for ship placement
    var board = document.createElement('div');
    var container = document.getElementById('large-board-container');
    board.setAttribute('class', 'board-large');
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let grid = document.createElement('div');
            grid.setAttribute('data-positionx', `${j}`);
            grid.setAttribute('data-positiony', `${i}`);
            grid.setAttribute('class', `board-grid`);
            board.appendChild(grid);
        }
    }
    if (!container)
        return;
    container.innerHTML = '';
    container.appendChild(board);
    //add eventlisteners to monitor board clicks
    board.addEventListener('click', (e) => {
        console.log(e);
        let payload = {
            x: Number(e.target.dataset.positionx),
            y: Number(e.target.dataset.positiony)
        };
        game.dispatch('clickBoard', payload);
    });
    //toggle grid class based on props.status
    if (!props.status)
        return;
    //uncomment this block to show enemy ships on board;
    // if(props.board[1].positionShipPlaced.length>0){
    //     props.board[1].positionShipPlaced.forEach(function(position){
    //         let shipOnGrid = (container as HTMLElement).querySelector(`[data-positionx='${position.x}'][data-positiony='${position.y}']`)
    //         if(shipOnGrid){
    //             shipOnGrid.classList.add('ship-on-grid')
    //         }
    //     })
    // }
    if (props.board[1].positionAttacked.length > 0) {
        props.board[1].positionAttacked.forEach(function (position) {
            let shipOnGrid = container.querySelector(`[data-positionx='${position.x}'][data-positiony='${position.y}']`);
            if (shipOnGrid) {
                shipOnGrid.classList.add('attack-on-grid');
            }
        });
    }
    if (props.board[1].positionHit.length > 0) {
        props.board[1].positionHit.forEach(function (position) {
            let shipOnGrid = container.querySelector(`[data-positionx='${position.x}'][data-positiony='${position.y}']`);
            if (shipOnGrid) {
                shipOnGrid.classList.add('damage-on-grid');
            }
        });
    }
};
var renderEnemyBoard = component({ game,
    render: renderComponent,
});
export { renderEnemyBoard };
