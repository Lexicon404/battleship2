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


newGame.addEventListener('click', () => {
    game.dispatch('newGameButton')
})

setCarrier.addEventListener('click', () => {
    game.dispatch('selectShip', 'Carrier')
})

setBattleship.addEventListener('click', () => {
    game.dispatch('selectShip', 'Battleship')
})


setCruiser.addEventListener('click', () => {
    game.dispatch('selectShip', 'Cruiser')
})


setSubmarine.addEventListener('click', () => {
    game.dispatch('selectShip', 'Submarine')
})


setDestroyer.addEventListener('click', () => {
    game.dispatch('selectShip', 'Destroyer')
})


axisX.addEventListener('click', () => {
    game.dispatch('selectAxis', 'x')
})


axisY.addEventListener('click', () => {
    game.dispatch('selectAxis', 'y')
})
