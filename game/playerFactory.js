export default function Player(name){
    var name = name;
    var lastAttackedPosition;
    
    var publicAPI = {
        attack,
        checkLastAttacked
    };
    return publicAPI

    function attack(position){ //position to be an object {x: num , y: num};
        lastAttackedPosition = position;
    }
    function checkLastAttacked(){
        return lastAttackedPosition;
    }
};