import { modelName, XY } from '../lib/types.js';
export default {
    setStatus(state, payload) {
        state['status'] = payload;
        return state;
    },
    setTurn(state, payload) {
        state['turn'] = payload;
        return state;
    },
    setBoards(state, payload) {
        var tempState = {};
        tempState.board = [];
        tempState['board'].push(payload[0]);
        tempState['board'].push(payload[1]);
        tempState.axis = 'x';
        state = tempState;
        return state;
    },
    selectAxis(state, payload) {
        state['axis'] = payload;
        return state;
    },
    selectShip(state, payload) {
        state['selection'] = payload;
        return state;
    },
    setShip(state, payload) {
        console.log(payload);
        state.board[0].initialShipPlacement(payload.name, payload.pos, payload.axis);
        return state;
    },
    attackPos(state, payload) {
        state.board[1].receiveAttack(payload);
        return state;
    },
    aiSetShip(state, payload = {}) {
        var shipModels = modelName;
        while (!state.board[1].startGameCondition()) {
            for (const value of Object.values(shipModels)) {
                var positionX = Math.floor(Math.random() * 10);
                var positionY = Math.floor(Math.random() * 10);
                var axis = randAxis();
                function randAxis() {
                    var rand = Math.round(Math.random());
                    if (rand == 0)
                        return XY.x;
                    return XY.y;
                }
                state.board[1].initialShipPlacement(value, { x: positionX, y: positionY }, axis);
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
    aiAttackPos(state, payload = {}) {
        var positionX = Math.floor(Math.random() * 10);
        var positionY = Math.floor(Math.random() * 10);
        var pos = { x: positionX, y: positionY };
        state.board[0].receiveAttack(pos);
        return state;
    }
};
