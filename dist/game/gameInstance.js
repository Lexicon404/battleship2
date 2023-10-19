import Board from "./gameboardFactory.js";
import PubSub from "../lib/pubsub.js";
export default function Game(params) {
    var actions = params.actions || {};
    var mutations = params.mutations || {};
    var state = {};
    var events = PubSub();
    var publicAPI = {
        actions,
        events,
        dispatch,
        commit,
    };
    state = new Proxy((state || {}), {
        set: function (state, key, value) {
            state[key] = value;
            events.publish('stateChange', state);
            console.log('events publishing');
            console.log(Object.values(state));
            return true;
        }
    });
    return publicAPI;
    function dispatch(userAction, payload) {
        var stateInstance = state;
        switch (userAction) {
            case 'newGameButton':
                actions['setStatus'](this, '');
                actions['setBoards'](this, [Board(), Board()]);
                actions['setStatus'](this, 'placingShips');
                actions['setTurn'](this, 'player');
                break;
            case 'selectAxis':
                if (stateInstance.status == 'placingShips') {
                    actions['selectAxis'](this, payload);
                }
                ;
                break;
            case 'selectShip':
                if (stateInstance.status == 'placingShips') {
                    actions['selectShip'](this, payload);
                }
                ;
                break;
            case 'clickBoard':
                console.log(`User clicked board:`);
                console.log(payload);
                if (stateInstance.status == 'placingShips' && stateInstance.selection) {
                    let data = Object.assign({ name: stateInstance.selection, axis: stateInstance.axis, pos: payload });
                    actions['setShip'](this, data);
                    if (stateInstance.board[0].startGameCondition()) {
                        actions['aiSetShip'](this);
                        actions['setStatus'](this, 'battling');
                        actions['setTurn'](this, 'player');
                        actions['selectShip'](this, '');
                    }
                    break;
                }
                ;
                if (stateInstance.status == 'battling' && stateInstance.turn == 'player') {
                    actions['attackPos'](this, payload);
                    actions['setTurn'](this, 'enemy');
                    if (stateInstance.board[1].checkWinCondition()) {
                        console.log('Checking win condition');
                        console.log('Game Over: You WON!');
                        actions['setStatus'](this, 'gameOver');
                        actions['setTurn'](this, '');
                    }
                }
                if (stateInstance.status == 'battling' && stateInstance.turn == 'enemy') {
                    actions['aiAttackPos'](this);
                    actions['setTurn'](this, 'player');
                    if (stateInstance.board[0].checkWinCondition()) {
                        console.log('Checking win condition');
                        console.log('Game Over: You LOSE!');
                        actions['setStatus'](this, 'gameOver');
                        actions['setTurn'](this, '');
                    }
                }
                break;
            default:
                console.log('Invalid user action');
        }
    }
    function commit(mutationKey, payload) {
        console.log(mutationKey);
        if (typeof mutations[mutationKey] !== 'function') {
            return false;
        }
        let newState = mutations[mutationKey](state, payload);
        state = Object.assign(state, newState);
        return true;
    }
}
