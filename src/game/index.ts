import game from './main.js'
import { renderPlayerBoard } from '../components/renderPlayerBoard.js'
import { renderEnemyBoard } from '../components/renderEnemyBoard.js'
import { renderStatus } from '../components/showStatus.js'



let newGame = document.getElementById('newGame')

let setCarrier = document.getElementById('setCarrier')

let setBattleship = document.getElementById('setBattleship')

let setCruiser = document.getElementById('setCruiser')

let setSubmarine = document.getElementById('setSubmarine')

let setDestroyer = document.getElementById('setDestroyer')

let axisX = document.getElementById('axisX')

let axisY = document.getElementById('axisY')

if (newGame){
    newGame.addEventListener('click', () => {
        game.dispatch('newGameButton', null)
    })
}

if(setCarrier){
    setCarrier.addEventListener('click', () => {
        game.dispatch('selectShip', 'Carrier')
    })

}

if(setBattleship){
    setBattleship.addEventListener('click', () => {
        game.dispatch('selectShip', 'Battleship')
    })
}


if(setCruiser){
    setCruiser.addEventListener('click', () => {
        game.dispatch('selectShip', 'Cruiser')
    })
}


if(setSubmarine){
    setSubmarine.addEventListener('click', () => {
        game.dispatch('selectShip', 'Submarine')
    })
}


if(setDestroyer){
    setDestroyer.addEventListener('click', () => {
        game.dispatch('selectShip', 'Destroyer')
    })
}


if(axisX){
    axisX.addEventListener('click', () => {
        game.dispatch('selectAxis', 'x')
    })
}


if(axisY){
    axisY.addEventListener('click', () => {
        game.dispatch('selectAxis', 'y')
    })
}

