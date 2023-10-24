import component from "../lib/component.js";
import game from "../game/main.js";
import { modelName } from "../lib/types.js";
import type {State, Fleet, ModelName, xy} from "../lib/types"

type objectWithStringKey = {[key: string]: any}


function createShipButton(name: ModelName, fleetArray: Fleet = []){
    var button = document.createElement('button')
    button.setAttribute('id', `set${name}`)
    button.setAttribute('type', 'button')
    button.textContent = name
    button.addEventListener('click', ()=> {
        game.dispatch('selectShip', `${name}`)
    });

    if (fleetArray){
        var ifExist = fleetArray.find(ship => ship.model == name)
        console.log({fleetArray} )
        if (ifExist){
            button.setAttribute("disabled", "")
        }    
    }

    return button;
}

function createOrientationButton(currentAxis: xy){
    var button = document.createElement('button')
    button.setAttribute('id', 'orientation')

    if (currentAxis === 'x'){
        button.textContent = 'Horizontal';
        button.addEventListener('click', ()=>{
            game.dispatch('selectAxis', 'y');
        })
    } else if (currentAxis === 'y'){
        button.textContent = 'Vertical';
        button.addEventListener('click', ()=>{
            game.dispatch('selectAxis', 'x');
        })
    }

    return button
}

function createSelectionDisplay(shipName: ModelName, axis: xy){
    var display = document.createElement('div');
    display.setAttribute('id', 'shipDisplay');
    display.setAttribute('draggable', 'true');

    if (axis === 'y'){
        display.setAttribute('class', 'shipDisplay-vertical')
    }

    var shipModels = [
        { name: 'Carrier', size: 5 },
        { name: 'Battleship', size: 4 },
        { name: 'Cruiser', size: 3 },
        { name: 'Submarine', size: 3 },
        { name: 'Destroyer', size: 2 }];
    
        var shipSizeObj: objectWithStringKey = shipModels.reduce((prev, cur)=>{
            let result = {[cur.name] : cur.size};
            return Object.assign(prev, result)
        },{})
    
    var shipLength = shipSizeObj[shipName]

    for (let i=0; i < shipLength; i++ ){
        display.appendChild(document.createElement('div'))
    }
    return display
}


var renderComponent = function (props: State){
    var container = document.getElementById('controls');
    if (!container) return;
    container.innerHTML = ''
    for (const values of Object.values(modelName)){
        if (container && props.board && props.board[0] && props.board[0].playerFleet){
            container.appendChild(createShipButton(values, props.board[0].playerFleet))
        } else if (container){
            container.appendChild(createShipButton(values))
        }
    }
    container.appendChild(createOrientationButton(props.axis))
    container.appendChild(createSelectionDisplay(props.selection, props.axis))
}

var renderControl = component({ game,
    render: renderComponent,
});

export { renderControl };


