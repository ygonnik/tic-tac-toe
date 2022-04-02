class Game {
    players = [];
    field= Array(10).join('*').split(''); //инициализация
    currentPlayerIndex; //игрок, который сейчас ходит
    winCount = Math.sqrt(this.field.length); //кол-во клеток, необходимых для победы
    turnHistory = []
    winPosition = [] //комбинация, которая выиграла в текущей игре
    gameIsOver = false;
    constructor(player1,player2) {
        this.players.push(player1);
        this.players.push(player2);
        this.currentPlayerIndex = false; // false - player1, true - player2
    }

    makeMove(pos, symbol){
        if (this.field[pos] === "*") {
            this.field[pos] = symbol;
            game.turnHistory.push(pos);
            return true;
        }
        else
            alert("Клетка занята!");
            return false;
    }

    isPlayerWin(playerSymbol) {
        let winFlag = true;
        for (let i = 0; i < game.field.length; i += game.winCount) { //горизонталь
            for(let j = 0; j < game.winCount; j++) {
                winFlag = winFlag && game.field[i + j] === playerSymbol;
                game.winPosition.push(i+j);
            }
            if (winFlag)
                return true;
        winFlag = true;
        game.winPosition.length = 0;
        }
        for (let i = 0; i < game.winCount; i++) { //вертикаль
            for(let j = 0; j < game.winCount; j++) {
                winFlag = winFlag && game.field[j*game.winCount + i] === playerSymbol;
                game.winPosition.push(j*game.winCount + i);
            }
            if (winFlag)
                return true;
        winFlag = true;
        game.winPosition.length = 0;
        }
        for(let i = 0; i < game.field.length; i += game.winCount + 1){ //диагональ
            winFlag = winFlag && game.field[i] === playerSymbol;
            game.winPosition.push(i);
        }
        if (winFlag)
            return true;
        winFlag = true;
        game.winPosition.length = 0;
        for(let i = game.winCount - 1; i < game.field.length - 1; i += game.winCount - 1){ //диагональ
            winFlag = winFlag && game.field[i] === playerSymbol;
            game.winPosition.push(i);
        }
        if (winFlag)
                return true;
        game.winPosition.length = 0;
        return false;
    }

    highlightWinPosition(winCombination) {
        let cells = document.getElementsByClassName("game-field_cell");
        for(let position of winCombination) {
            if(game.field[position] === 'X') {
                cells[position].childNodes[1].style ="display: grid; fill: green;";
            }
            else {
                cells[position].childNodes[3].style ="display: grid; fill: green;";
            }
        }
    }
}
class Player {
    symbol;
    name;
    constructor(name, symbol){
        this.name = name;
        this.symbol = symbol;
    }
}

function fillCellHandler(obj){ //1 - cross 3 - circle
    if (game.gameIsOver === false) {
        const pos = obj.id.slice(-1);
        if (game.makeMove(pos - 1, game.players[Number(game.currentPlayerIndex)].symbol)) {
            if (game.players[Number(game.currentPlayerIndex)].symbol === 'X') {
                obj.childNodes[1].style = "display: grid;";
            }
            else {
                obj.childNodes[3].style = "display: grid;";
            }
            if(game.isPlayerWin(game.players[Number(game.currentPlayerIndex)].symbol)) {
                game.highlightWinPosition(game.winPosition);
                game.gameIsOver = true;
                alert(`${game.players[Number(game.currentPlayerIndex)].name} won!`)
            }
            game.currentPlayerIndex = !game.currentPlayerIndex;
        }
    }
}

function resetButtonHandler(){
    game.field.length = 0;
    game.field = Array(10).join('*').split('');
    game.currentPlayerIndex = false;
    game.gameIsOver = false;
    for(cell of document.getElementsByClassName("game-field_cell")) {
        cell.childNodes[1].style ="display: none;";
        cell.childNodes[3].style ="display: none;";
    }
}

function undoButtonHandler(){
    if (game.turnHistory.length != 0){
        let cells = document.getElementsByClassName("game-field_cell");
        let lastPos = game.turnHistory.pop();
        document.getElementsByClassName("game-field_cell")[lastPos].childNodes[1].style ="display: none;";
        document.getElementsByClassName("game-field_cell")[lastPos].childNodes[3].style ="display: none;";
        game.field[lastPos] = '*';
        for(let i = 0; i < game.field.length; i++) {
            if (game.field[i] === 'X') {
                cells[i].childNodes[1].style ="display: grid; fill: black;";
            }
            if (game.field[i] === 'O') {
                cells[i].childNodes[3].style ="display: grid; fill: black;";
            }
        }
        game.currentPlayerIndex = !game.currentPlayerIndex;
        game.gameIsOver = false;
    }
}

let user1name = prompt("Введите имя первого игрока", "игрок1");
if (user1name === null){
    user1name = "игрок1"
}
let user2name = prompt("Введите имя второго игрока", "игрок2");
if (user2name === null){
    user2name = "игрок2"
}
const player1 = new Player(user1name,"X");
const player2 = new Player(user2name,"O");

const game = new Game(player1, player2);
