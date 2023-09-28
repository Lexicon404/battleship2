export default function component(props = {}){
    var render = props.render

    props.game.events.subscribe('stateChange', (state)=>render(state))
    console.log('component subscribe to state')

    return {
        render,
    }
}