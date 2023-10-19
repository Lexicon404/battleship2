import type {State} from "../lib/types"

type propsType = {
    game: any;
    render: any
}

export default function component(props: propsType){
    var render = props.render

    props.game.events.subscribe('stateChange', (state: State)=>render(state))
    console.log('component subscribe to state')

    return {
        render,
    }
}