export type PositionArray = {
    x: number, 
    y: number
}[];

export type Position = {
    x: number, 
    y: number
};

export type PositionWithHitProp = {
    x: number, 
    y: number,
    hit: boolean
}

export type PositionArrayWithHitProp = {
    x: number, 
    y: number,
    hit: boolean
}[]

export type Ship = {
    model: string;
    position: PositionArrayWithHitProp;
    receiveHit: (arg: Position) => boolean;
    isSunk: () => boolean;
}

export type Fleet = Ship[]

export type Board = {
    playerFleet: Fleet,
    positionAttacked: Position[],
    positionHit: Position[],
    positionShipPlaced: Position[],
    initialShipPlacement: (arg1: ModelName, arg2: Position, arg3: xy) => void,
    receiveAttack: (arg: Position) => void;
    startGameCondition: () => boolean,
    checkWinCondition: ()=> boolean,
}

type ObjectValues<T> = T[keyof T];

export const modelName = {
    Carrier: 'Carrier',
    Battleship:'Battleship',
    Cruiser: 'Cruiser',
    Submarine: 'Submarine',
    Destroyer: 'Destroyer'
} as const

export type ModelName = ObjectValues<typeof modelName>

export const XY = {
    x: 'x',
    y: 'y'
} as const

export type xy = ObjectValues<typeof XY>

const turn = {
    player: 'player',
    enemy: 'enemy'
}

export type Turn = ObjectValues<typeof turn>

export type State = {
    [index: string]: any;
    board: [Board, Board];
    status: string;
    selection: ModelName;
    axis: xy;
    turn: string
}

export type ShipData = {
    name: ModelName,
    axis: xy,
    pos: Position
}

