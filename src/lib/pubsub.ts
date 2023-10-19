import type {State} from "../lib/types"

type eventType = {[key: string]: ((data:State)=>void)[]}


export default function pubsub(){

    var events: eventType = {};

    var PublicAPI = {
        subscribe,
        publish
    }

    return PublicAPI

    function subscribe(event: string, callback:()=>{}): void{
        if(events.hasOwnProperty(event)){
            events[event].push(callback)
            console.log(' event subscribed')
        } else {
            events[event] = [callback]
            console.log('event subscribed')
        }
        console.log(events)
    }

    function publish(event: string, data: State): void | object{
        if(events.hasOwnProperty(event)){
            events[event].map((cb) => cb(data))
        } else return {};
    }
}