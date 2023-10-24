import Ship from './shipFactory.js';
export default function Board() {
    var shipModels = [
        { name: 'Carrier', size: 5 },
        { name: 'Battleship', size: 4 },
        { name: 'Cruiser', size: 3 },
        { name: 'Submarine', size: 3 },
        { name: 'Destroyer', size: 2 }
    ];
    var playerFleet = []; //array contains objects of player ships from shipFactory: [...{name:string, position: [...{x:},{y:},{hit:}], ...methods}]
    var boardBoundary = { start: { x: 0, y: 0 }, end: { x: 9, y: 9 } };
    var totalShipsAllowed = 5;
    var positionAttacked = [];
    var positionHit = [];
    var positionShipPlaced = [];
    return {
        playerFleet,
        positionAttacked,
        positionHit,
        positionShipPlaced,
        initialShipPlacement,
        receiveAttack,
        startGameCondition,
        checkWinCondition,
    };
    function startGameCondition() {
        if (playerFleet.length == 5) {
            return true;
        }
        else
            return false;
    }
    function initialShipPlacement(name, pos, axis) {
        var posArray = buildShipArray(name, pos, axis);
        console.log(`Is Ship in fleet? ${isShipInFleet(name)}`);
        console.log(`Is fleet size smaller than allowed? ${fleetSize()} <= ${totalShipsAllowed}`);
        console.log(`Is Ship Overlapping? ${isShipOverlap(posArray, playerFleet)}`);
        console.log(`is ship within boundary? ${isValidBoundary(posArray)}`);
        if (isValidBoundary(posArray) &&
            !isShipInFleet(name) &&
            !isShipOverlap(posArray, playerFleet) &&
            fleetSize() <= totalShipsAllowed) {
            setShip(name, posArray);
            positionShipPlaced.push(...posArray);
            console.log('Ship is set');
            //console.log(positionShipPlaced)
        }
        function buildShipArray(name, pos, axis) {
            var posArray = [];
            var size = shipSize(name);
            if (axis === 'x') {
                for (let i = 0; i < size; i++) {
                    posArray.push({ x: pos.x + i, y: pos.y });
                }
            }
            else if (axis === 'y') {
                for (let i = 0; i < size; i++) {
                    posArray.push({ x: pos.x, y: pos.y + i });
                }
            }
            return posArray;
        }
        function isValidBoundary(posArray) {
            var isValid = posArray.every(pos => boundaryCheck(pos));
            return isValid;
        }
        function isShipInFleet(name) {
            var validation = Boolean(playerFleet.find(ship => ship.model == name));
            return validation;
        }
        function isShipOverlap(posArray, playerFleet) {
            if (playerFleet.length == 0) {
                return false;
            }
            else {
                for (let i = 0; i < posArray.length; i++) {
                    for (let j = 0; j < playerFleet.length; j++) {
                        if (playerFleet[j].position.find(pos => pos.x == posArray[i].x && pos.y == posArray[i].y)) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        function fleetSize() {
            return playerFleet.length;
        }
        function shipSize(name) {
            var ship = shipModels.find(ship => ship.name == name);
            if (ship) {
                return ship.size;
            }
            else
                return 0;
        }
        function setShip(name, posArray) {
            var newShip = Ship(name, posArray);
            playerFleet.push(newShip);
        }
        ;
    }
    function boundaryCheck(position) {
        if (position.x >= boardBoundary.start.x &&
            position.x <= boardBoundary.end.x &&
            position.y >= boardBoundary.start.y &&
            position.y <= boardBoundary.end.y) {
            return true;
        }
        else
            return false;
    }
    ;
    function wasAttacked(position) {
        var result = positionAttacked.find(pos => pos.x == position.x && pos.y == position.y);
        console.log(`Was this position attacked prior? ${result ? 'Yes' : 'No'}`);
        if (result) {
            return true;
        }
        else
            return false;
    }
    ;
    function receiveAttack(position) {
        console.log(`Boundary check position: ${boundaryCheck(position)}`);
        if (boundaryCheck(position) && !wasAttacked(position)) {
            positionAttacked.push(position);
            playerFleet.map(ship => {
                if (ship.receiveHit(position)) {
                    positionHit.push(position);
                }
            });
        }
    }
    ;
    function checkWinCondition() {
        return playerFleet.every(ship => ship.isSunk());
    }
    ;
}
