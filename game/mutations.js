export default {

    setStatus(state, payload){

        state['status']= payload

        return state
    },

    setTurn(state, payload){

        state['turn'] = payload
        return state
    },

    setBoards(state, payload){

        state['board']=[];
        state['board'].push(payload[0]);
        state['board'].push(payload[1]);
        state['axis'] = 'x'

        return state;
    },
    
    selectAxis(state, payload){

        state['axis'] = payload
        return state
    },

    selectShip(state, payload){

        state['selection'] = payload
        return state
    },

    setShip(state, payload){

        console.log(payload)
        state.board[0].initialShipPlacement(payload.name, payload.pos, payload.axis)
        return state;
    },

    attackPos(state, payload){

        state.board[1].receiveAttack(payload)
        return state;
    },

    aiSetShip(state, payload = {}){

        var shipModels = ['Carrier', 'Battleship', 'Cruiser', 'Submarine','Destroyer']

        while(!state.board[1].startGameCondition()){

            shipModels.forEach(model => {

                let positionX = Math.floor(Math.random() * 10)
                let positionY = Math.floor(Math.random() * 10)

                state.board[1].initialShipPlacement(model, {x: positionX, y: positionY}, "x") 
            })
        }
        
        return state;

        state.board[1].initialShipPlacement('Carrier', {x: 0, y: 0}, 'x')
        state.board[1].initialShipPlacement('Battleship', {x: 0, y: 4}, 'x')
        state.board[1].initialShipPlacement('Cruiser', {x: 0, y: 3}, 'x')
        state.board[1].initialShipPlacement('Submarine', {x: 0, y: 2}, 'x')
        state.board[1].initialShipPlacement('Destroyer', {x: 0, y: 1}, 'x')

    },

    aiAttackPos(state, payload = {}){
            var positionX = Math.floor(Math.random() * 10)
            var positionY = Math.floor(Math.random() * 10)

            var pos = {x: positionX, y: positionY}
            state.board[0].receiveAttack(pos)
            return state;  
    }
}