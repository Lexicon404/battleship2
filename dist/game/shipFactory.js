export default function Ship(shipModel, shipPosition) {
    var model = shipModel;
    var position = setHitProp(shipPosition);
    return {
        model,
        position,
        receiveHit,
        isSunk
    };
    function setHitProp(posArray) {
        function addHitProp(pos) {
            return Object.assign(pos, { hit: false });
        }
        var newPosArray = posArray.map(pos => addHitProp(pos));
        return newPosArray; // returned newposArray: [...{x:num, y:num, hit:false}]
    }
    ;
    function checkHealth() {
        var health = position.filter(coord => !coord.hit);
        return health.length;
    }
    ;
    function isSunk() {
        if (checkHealth() != 0) {
            return false;
        }
        else
            return true;
    }
    ;
    function receiveHit(pos) {
        if (!isSunk()) {
            var posHit = position.find(coord => coord.x == pos.x && coord.y == pos.y);
            if (posHit) {
                posHit.hit = true; //result modifies the position array directly
                return true;
            }
        }
        return false;
    }
    ;
}
