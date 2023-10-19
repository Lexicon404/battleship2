import type {PositionArray, Position, PositionWithHitProp, PositionArrayWithHitProp, Ship, ModelName} from '../lib/types'


export default function Ship(shipModel: ModelName, shipPosition: PositionArray):Ship { //name: string, health: 

    var model = shipModel;
    var position = setHitProp(shipPosition);

    return {
        model,
        position,
        receiveHit,
        isSunk
    };



    function setHitProp(posArray: PositionArray): PositionArrayWithHitProp{ //parameter posArray to be an array of object positions: [...{x:num, y:num}];
        function addHitProp(pos: Position): PositionWithHitProp{
            return Object.assign(pos, {hit: false});
        }        
        var newPosArray = posArray.map(pos => addHitProp(pos));
        return newPosArray; // returned newposArray: [...{x:num, y:num, hit:false}]
    };

    function checkHealth(): number{
        var health = position.filter(coord=>!coord.hit);
        return health.length
    };  

    function isSunk(): boolean{
        if (checkHealth()!= 0){
            return false;
        } else return true;
    };

    function receiveHit(pos: Position): boolean{ //pos to be an object {x: num , y: num};
        if (!isSunk()) {
            var posHit = position.find(coord => coord.x == pos.x && coord.y == pos.y);
            if (posHit){
                posHit.hit = true; //result modifies the position array directly
                return true
            }
        }
        return false
    };
}