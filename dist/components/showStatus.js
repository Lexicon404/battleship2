import component from "../lib/component.js";
import game from "../game/main.js";
var renderComponent = function (props) {
    var container = document.getElementById('status-board');
    var board = document.createElement('div');
    if (!container)
        return;
    container.innerHTML = '';
    board.innerHTML = `Game Status: ${props.status}`;
    container.appendChild(board);
};
var renderStatus = component({ game,
    render: renderComponent,
});
export { renderStatus };
