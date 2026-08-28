function Gameboard(){
    let boards = [];
    const rows = 3;
    const cols = 3;

    for(let i=0; i<rows; i++){
        boards[i] = [];
        for(let j=0; j<rows; j++){
            boards[i].push(Cell());
        }
    }

    const getBoard = () => boards;
    const dropToken = (col, row, player) => {
        if(boards[row][col].getValue()!== 0){
            console.log("This cell is already filled.");
            return true;
        } 
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

        //win logic

        //switch if can droptoken
        if(!isFilled){
            switchPlayerTurn();
            printNewRound();
            isFilled = false;
        }
        
    };
    printNewRound();

    return {playRound, getActivePlayer,};
}

const game = GameController();