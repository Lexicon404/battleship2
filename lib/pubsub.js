export default function pubsub(){
    var events = {};

    var PublicAPI = {
        subscribe,
        publish
    }

    return PublicAPI

    function subscribe(event, callback){
        if(events.hasOwnProperty(event)){
            events[event].push(callback)
            console.log(' event subscribed')
        } else {
            events[event] = [callback]
            console.log('event subscribed')
        }
        console.log(events)
    }

    function publish(event, data = []){
        if(events.hasOwnProperty(event)){
            events[event].map(cb => cb(data))
        } else return [];
    }
}