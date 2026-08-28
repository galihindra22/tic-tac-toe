function Gameboard(){
    let boards = [];
    const rows = 3;
    const cols = 3;

    for(let i=0; i<rows; i++){
        boards[i] = [];
        for(let j=0; j<cols; j++){
            boards[i].push(Cell());
        }
    }

    const getBoard = () => boards;
    const dropToken = (row, col, player) => {
        if(boards[row][col].getValue()!== 0)return true;  
        boards[row][col].addToken(player);
        return false;
    };

    const printBoard = () => {
        const boardWithCellValues = boards.map((row) =>
            row.map((cell) => cell.getValue())
        );
        console.log(boardWithCellValues);
    };
    return { getBoard, dropToken, printBoard };
}

function Cell(){
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {addToken, getValue};
}

function GameController(playerOneName = "Player One", playerTwoName = "Player Two"){
    const boards = Gameboard();

    const players = [
        {
            name: playerOneName,
            token: 1,
        },
        {
            name: playerTwoName,
            token: 2,
        },
    ];

    let activePlayer = players[0];

    const printNewRound = () => {
        boards.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1]:players[0];
    };

    const getActivePlayer = () => activePlayer;

    const playRound = (row, col) => {
        console.log(`Dropping ${getActivePlayer().name}'s token into row ${row} and column ${col}...`);
        let isFilled = boards.dropToken(row, col, getActivePlayer().token);
        if(isFilled) return;
        //win logic
        const b = boards.getBoard().map(r => r.map(c => c.getValue()));
        const token = getActivePlayer().token;

        const hasWon = 
            b.some(r => r[0] === token && r[1] === token && r[2] === token) || 
            [0, 1, 2].some(c => b[0][c] === token && b[1][c] === token && b[2][c] === token) ||
            (b[0][0] === token && b[1][1] === token && b[2][2] === token) ||
            (b[0][2] === token && b[1][1] === token && b[2][0] === token);

        if(hasWon){
            boards.printBoard();
            console.log(`${getActivePlayer().name} Wins!`);
            return;
        }

        //switch if can droptoken
        switchPlayerTurn();
        printNewRound();
    };
    printNewRound();

    return {playRound, getActivePlayer,};
}

const game = GameController();