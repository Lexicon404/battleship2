import type {ShipData, State, Fleet, Position, ModelName, xy, PositionArray} from '../lib/types'
import {modelName, XY } from '../lib/types'

export default {

    setStatus(state: State, payload: string){

        state['status']= payload

        return state
    },

    setTurn(state: State, payload: string){

        state['turn'] = payload
        return state
    },

    setBoards(state: State, payload: Array<object>){

        var tempState: any = []
        tempState['board'].push(payload[0]);
        tempState['board'].push(payload[1]);
        tempState['axis'] = 'x'

        state = tempState
        return state;
    },
    
    selectAxis(state: State, payload: xy){

        state['axis'] = payload
        return state
    },

    selectShip(state: State, payload: ModelName){

        state['selection'] = payload
        return state
    },

    setShip(state: State, payload: ShipData){

        console.log(payload)
        state.board[0].initialShipPlacement(payload.name, payload.pos, payload.axis)
        return state;
    },

    attackPos(state: State, payload: Position){

        state.board[1].receiveAttack(payload)
        return state;
    },

    aiSetShip(state: State, payload = {}){

        var shipModels = modelName;

        while(!state.board[1].startGameCondition()){

            for (const value of Object.values(shipModels)){
                var positionX = Math.floor(Math.random() * 10)
                var positionY = Math.floor(Math.random() * 10)
                var axis = randAxis()

                function randAxis(){
                    var rand = Math.round(Math.random())
                    if (rand == 0) return XY.x
                    return XY.y
                }

                state.board[1].initialShipPlacement(value, {x: positionX, y: positionY}, axis) 
            }

            // shipModels.forEach((model) => {
            //     let positionX = Math.floor(Math.random() * 10)
            //     let positionY = Math.floor(Math.random() * 10)

            //     state.board[1].initialShipPlacement(model, {x: positionX, y: positionY}, "x") 
            // })
        }
        
        return state;

        // state.board[1].initialShipPlacement('Carrier', {x: 0, y: 0}, 'x')
        // state.board[1].initialShipPlacement('Battleship', {x: 0, y: 4}, 'x')
        // state.board[1].initialShipPlacement('Cruiser', {x: 0, y: 3}, 'x')
        // state.board[1].initialShipPlacement('Submarine', {x: 0, y: 2}, 'x')
        // state.board[1].initialShipPlacement('Destroyer', {x: 0, y: 1}, 'x')

    },

    aiAttackPos(state: State, payload = {}){
            var positionX = Math.floor(Math.random() * 10)
            var positionY = Math.floor(Math.random() * 10)

            var pos = {x: positionX, y: positionY}
            state.board[0].receiveAttack(pos)
            return state;  
    }
}