//Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
//*Create a Tic-Tac-Toe game grid using your HTML element of choice.
//*When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
//*A heading should say whether it is X's or O's turn and change with each move made.
//*A button should be available to clear the grid and restart the game.
//*When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner
//-------------------------------------------------------------------------------
//used "DOMContentLoaded" so that we can prevent errors and allows JavaScript to run early in loading process without waiting for external resources. 
document.addEventListener("DOMContentLoaded", function () {
    //need to select all cells
    const cells = document.querySelectorAll("[data-cell]");
    //need to show whose turn it is
    const turnHeading = document.getElementById("turn-heading");
    //need a restart button
    const restartBtn = document.getElementById("restart-btn");
    //need an alert to show us who won or tied
    const alertBox = document.getElementById("alert-box"); 
    //have X always start first
    let xTurn = true; 
    //State wether the game is active or over
    let gameActive = true; 

    //Winning combinations for tic-tac-toe (indexs of cells)
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];


//need a function to check who the winner is
function checkWinner(){
    const cellValues = Array.from(cells).map(cell => cell.textContent);
    //need a loop for all winning combinations
    for(const combo of winningCombinations){
        //get 3 cell combonation
        const [a, b, c] = combo;
        if (cellValues[a] && cellValues[a] === cellValues[b] && cellValues[a] === cellValues[c]) {
            //should return 'X' or 'O' if there is a match going on
            return cellValues[a]; 
        }
    }
    //return 'DRAW' if board is full with no winner
    return cellValues.includes("") ? null : "draw"; 
}   
//a function to update the game status to show winner or draw
function updateGameStatus(){
    //this should give us the game result
    const result = checkWinner();
    if (result) {
        //have the game stop
        gameActive = false;
        //show a 'DRAW' alert
        if(result === "draw"){
            alertBox.innerHTML = `<div class="alert alert-warning">It's a DRAW! Try Again!</div>`
        //show WINNER alert    
        }else {
            alertBox.innerHTML = `<div class="alert alert-success">${result} WINS!</div>`;
        }
      //no winner or draw then should switch turns  
    } else {
        turnHeading.textContent = xTurn ? "X's Turn" : "O's Turn"; 
    }
}

// Need a function to handle clicking on cells
function handleCellClick(e){
    //target the cell that was clicked on
    const cell = e.target; 
    //need to ignore if game is over or cell is already filled
    if(!gameActive || cell.textContent) return; 
    //need a way to mark the cells with x or o
    cell.textContent = xTurn ? "X" : "O"
    //should switch turns between players
    xTurn = !xTurn;
    updateGameStatus(); 
}

//create a function to reset game

function restartGame(){
    //Reactivate game
    gameActive = true;
    //have game restart with X 
    xTurn = true;
    //clear out all cells 
    cells.forEach(cell => (cell.textContent = ""))
    //reset to players turn
    turnHeading.textContent = "X's Turn"
    //clears any alerts that may be present
    alertBox.innerHTML = ""; 
}

//add event listener to each cell
cells.forEach(cell => cell.addEventListener("click", handleCellClick));

//add event listener for restart button
restartBtn.addEventListener("click", restartGame)

}); 