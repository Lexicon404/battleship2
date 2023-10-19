import component from "../lib/component.js";
import game from "../game/main.js";
import type {State} from "../lib/types"


var renderComponent = function(props: State){
    console.log("render function triggered")
    console.log(props)
    
    //Builds player board for ship placement
    var container = document.getElementById('player-board');

    if (!container) return;

    var board = document.createElement('div');

    board.setAttribute('class', 'board');
    for (let i=9; i>=0; i--){
        for (let j=0; j<10; j++){
        let grid = document.createElement('div')
        grid.setAttribute('data-positionx', `${j}`)
        grid.setAttribute('data-positiony', `${i}`)
        grid.setAttribute('class', `board-grid`)
        board.appendChild(grid)
        }
    }

    container.innerHTML = ''
    container.appendChild(board)

    if (props.status !== 'placingShips'){
        container.classList.remove('board-large')
        container.classList.remove('board')
        container.classList.add('board-small')
    } else {
        container.classList.remove('board-small')
        container.classList.add('board-large')
    }

    //add eventlisteners to monitor board clicks
    board.addEventListener('click', (e) => {   
        console.log(e) 
        if (!e.target) return;

        let payload = {
        x: Number((e.target as HTMLElement).dataset.positionx),
        y: Number((e.target as HTMLElement).dataset.positiony)
        }
        game.dispatch('clickBoard', payload)
    })

    //toggle grid class based on props.status

    if(!props.status) return


    if(props.board[0].positionShipPlaced.length>0){
        props.board[0].positionShipPlaced.forEach(function(position){
            let shipOnGrid = (container as HTMLElement).querySelector(`[data-positionx='${position.x}'][data-positiony='${position.y}']`)
            if(shipOnGrid){
                shipOnGrid.classList.add('ship-on-grid')
            }
        })
    }

    if(props.board[0].positionAttacked.length>0){
        props.board[0].positionAttacked.forEach(function(position){
            let shipOnGrid = (container as HTMLElement).querySelector(`[data-positionx='${position.x}'][data-positiony='${position.y}']`)
            if(shipOnGrid){
                shipOnGrid.classList.add('attack-on-grid')
        }
        })
    }

    if(props.board[0].positionHit.length>0){
        props.board[0].positionHit.forEach(function(position){
            let shipOnGrid = (container as HTMLElement).querySelector(`[data-positionx='${position.x}'][data-positiony='${position.y}']`)
            if(shipOnGrid){
                shipOnGrid.classList.add('damage-on-grid')
            }
        })
    }
    
}




var renderPlayerBoard = component({game, 
    render: renderComponent, 
})

export {renderPlayerBoard}