import type {ShipData, Position, ModelName, xy} from '../lib/types'

type Context = {
    commit: (arg1: string, arg2: any) => void;
}

export default {

    setStatus(context: Context, payload: string){
        context.commit('setStatus', payload)
    },

    setTurn(context: Context, payload: string){
        context.commit('setTurn', payload)
    },

    setBoards(context: Context, payload: Array<any>){
        context.commit('setBoards', payload)
    },

    selectAxis(context: Context, payload: xy){
        context.commit('selectAxis', payload);
    },

    selectShip(context: Context, payload: ShipData){
        context.commit('selectShip', payload);
    },

    setShip(context: Context, payload: Position){
        context.commit('setShip', payload)
    },

    attackPos(context: Context, payload: Position){
        context.commit('attackPos', payload)
    },

    aiSetShip(context: Context, payload = {}){
        context.commit('aiSetShip', payload)
    },

    aiAttackPos(context: Context, payload = {}){
        context.commit('aiAttackPos', payload)
    }

}