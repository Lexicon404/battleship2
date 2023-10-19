export default {
    setStatus(context, payload) {
        context.commit('setStatus', payload);
    },
    setTurn(context, payload) {
        context.commit('setTurn', payload);
    },
    setBoards(context, payload) {
        context.commit('setBoards', payload);
    },
    selectAxis(context, payload) {
        context.commit('selectAxis', payload);
    },
    selectShip(context, payload) {
        context.commit('selectShip', payload);
    },
    setShip(context, payload) {
        context.commit('setShip', payload);
    },
    attackPos(context, payload) {
        context.commit('attackPos', payload);
    },
    aiSetShip(context, payload = {}) {
        context.commit('aiSetShip', payload);
    },
    aiAttackPos(context, payload = {}) {
        context.commit('aiAttackPos', payload);
    }
};
