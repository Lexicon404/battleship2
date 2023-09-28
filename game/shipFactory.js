export default function Ship(shipModel, shipPosition){ //name: string, health: 

    var model = shipModel;
    var position = setHitProp(shipPosition);

    var publicAPI = {
        model,
        position,
        receiveHit,
        isSunk
    };
    return publicAPI;

    function setHitProp(posArray){ //parameter posArray to be an array of object positions: [...{x:num, y:num}];
        posArray = posArray.map(pos => addHitProp(pos));
        function addHitProp(pos){
            return Object.assign(pos, {hit: false});
        }
        return posArray; // returned posArray: [...{x:num, y:num, hit:false}]
    };

    function checkHealth(){
        var health = position.filter(coord=>!coord.hit);
        return health.length
    };  

    function isSunk(){
        if (checkHealth()!= 0){
            return false;
        } else return true;
    };

    function receiveHit(pos){ //pos to be an object {x: num , y: num};
        if (!isSunk()) {
            pos = position.find(coord => coord.x == pos.x && coord.y == pos.y);
            if (pos){
                pos.hit = true; //result modifies the position array directly
                return true
            }
        }
    };
}