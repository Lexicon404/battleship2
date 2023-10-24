import game from './main.js'
import { renderPlayerBoard } from '../components/renderPlayerBoard.js'
import { renderEnemyBoard } from '../components/renderEnemyBoard.js'
import { renderStatus } from '../components/showStatus.js'
import { renderControl } from '../components/renderControl.js'


let init = () => {
    renderPlayerBoard;
    renderEnemyBoard;
    renderStatus;
    renderControl
    }

let newGame = document.getElementById('newGame')


if (newGame){
    newGame.addEventListener('click', () => {
        game.dispatch('newGameButton', null)
    })
}
