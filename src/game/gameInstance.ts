import Board from "./gameboardFactory.js";
import PubSub from "../lib/pubsub.js";
import type {State} from "../lib/types"

type objectWithStringKey = {[key: string]: any}

type thisGame = { 
    actions: objectWithStringKey; 
    events: { subscribe: (event: string, callback: () => {}) => void; 
    publish: (event: string, data: State) => void | object; }; 
    dispatch: (userAction: string, payload: any) => void; 
    commit: (mutationKey: string, payload: any) => boolean; 
    }

export default function Game(params: {actions: objectWithStringKey, mutations: objectWithStringKey}){
    var actions = params.actions || {};
    var mutations = params.mutations || {};
    var state: State | object = {}
    var events = PubSub();
    var publicAPI = {
        actions,
        events,
        dispatch,
        commit,
    }

    state = new Proxy((state || {}),{
        set: function(state: State, key: string, value: any){

            state[key] = value;

            events.publish('stateChange', state);
            
            console.log('events publishing')
            console.log(Object.values(state))

            return true
        }
    })


    return publicAPI


    function dispatch(this: thisGame, userAction: string, payload: any){
        var stateInstance = state as State

        switch(userAction){
            case 'newGameButton': 
                actions['setStatus'](this, '')
                actions['setBoards'](this, [Board(), Board()]);
                actions['setStatus'](this, 'placingShips')
                actions['setTurn'](this, 'player')

                break;

            case 'selectAxis':
                if (stateInstance.status == 'placingShips'){
                    actions['selectAxis'](this, payload)
                };
                break;

            case 'selectShip':
                if (stateInstance.status == 'placingShips'){
                    actions['selectShip'](this, payload)
                };
                break;


            case 'clickBoard':

                console.log(`User clicked board:`)
                console.log(payload)

                if (stateInstance.status == 'placingShips' && stateInstance.selection){
                    let data = Object.assign({name: stateInstance.selection, axis: stateInstance.axis, pos: payload});
                    actions['setShip'](this, data);
        
                    if (stateInstance.board[0].startGameCondition()){
                        actions['aiSetShip'](this);
                        actions['setStatus'](this, 'battling')
                        actions['setTurn'](this, 'player')
                        actions['selectShip'](this, '')

                    }
                    break;
                };
        

                if (stateInstance.status == 'battling' && stateInstance.turn == 'player'){

                    actions['attackPos'](this, payload)
                    actions['setTurn'](this, 'enemy')
                    

                    if(stateInstance.board[1].checkWinCondition()){

                        console.log('Checking win condition')
                        console.log('Game Over: You WON!')

                        actions['setStatus'](this, 'gameOver')
                        actions['setTurn'](this, '')
                        
                    }
                }

                if (stateInstance.status == 'battling' && stateInstance.turn == 'enemy'){

                    actions['aiAttackPos'](this);
                    actions['setTurn'](this, 'player')
                    
                   

                    if(stateInstance.board[0].checkWinCondition()){

                        console.log('Checking win condition')
                        console.log('Game Over: You LOSE!')
                        
                        actions['setStatus'](this, 'gameOver')
                        actions['setTurn'](this, '')
                        
                    }
                }

                break;

            default:
                console.log('Invalid user action') ;

        }


    }

    function commit(mutationKey: string, payload: any){
        console.log(mutationKey)
        if(typeof mutations[mutationKey] !== 'function'){
            return false
        }

        let newState = mutations[mutationKey](state, payload);
        
        state = Object.assign(state, newState);

        return true;
    }
}