// alert (pics)
// alert (width)

const pics = [
'url("./Pics/CSS.png")',
'url("./Pics/GH.png")',
'url("./Pics/HTML.png")',
'url("./Pics/JS.png")',
'url("./Pics/PC.png")',
'url("./Pics/VSC.png")'
];

const MATCHES = 3;
const EMPTYPLACE = -1;

let points = 0
const width = 8;
let fields = [];
const table = document.querySelector('.table');
// const score = document.querySelector('.score');
let scorePoints = document.getElementById("scorePoints");
const board = []

let squarethemedragged;
let squareiddragged;

initGame();

function initGame() {
    getPlayerName();
    createBoard();
    while (!(checkForPossibleMove())) {
        createBoard()
    }
    drawTable();
}


function getPlayerName(){
    var getName = null;

    while (getName === null || !isNaN(getName)){
        getName = prompt("What is your name? ");

        if (getName === null || !isNaN(getName)){
            alert("Invalid name, please try again");
        }
        else{
            document.write("Hello ", getName);
            scorePlayer.innerHTML = (getName + "  SCORE")
            const playerLeaderBoard = {
                playerName: getName
            };
            localStorage.setItem("obj", JSON.stringify(playerLeaderBoard));
            var correctName = getName
        }
    }
}

function endGame(){
    var playerName = JSON.parse(localStorage.getItem("obj"));
    alert("Congrats " + playerName.playerName + ". Your score is " + points + "\n"
    + "To play again click OK.")
    window.location.reload(true);
}


function createBoard() {

    //Initialize empty board
    for(let i = 0; i < width; i++) {
        let row = new Array(width).fill(EMPTYPLACE);
        board.push(row);
    }

    //Here we can set fields for actual level
    // for example:
    // board[0][0] = 3

    fillEmptyPlacesOnBoard()
}


function fillEmptyPlacesOnBoard(){
    let count = 0
    //Get random field for the rest of fields
    for(let row = 0; row < width; row++){
        for(let col = 0; col < width; col++){
            if(board[row][col] === EMPTYPLACE){
                let randomimage = {image: getRandomInt(pics.length), id: count}
                if (row < 2 && col < 2){
                    board[row][col] = randomimage.image
                    count++
                }
                else if (row < 2 && col >= 2) {
                    while (board[row][col - 2] === board[row][col - 1] && board[row][col - 1] === randomimage.image) {
                        randomimage = {image: getRandomInt(pics.length), id: count}
                    }
                    board[row][col] = randomimage.image
                    count++
                }
                else if (row >= 2 && col < 2) {
                    while (board[row-2][col] === board[row-1][col] && board[row-1][col] === randomimage.image) {
                        randomimage = {image: getRandomInt(pics.length), id: count}
                    }
                    board[row][col] = randomimage.image
                    count++
                }
                else if (row >= 2 && col >= 2) {
                    while ((board[row][col - 2] === board[row][col - 1] && board[row][col - 1] === randomimage.image) || (board[row-2][col] === board[row-1][col] && board[row-1][col] === randomimage.image)) {
                        randomimage = {image: getRandomInt(pics.length), id: count}
                    }
                    board[row][col] = randomimage.image
                    count++
                }
            }
        }
    }

    return count
}


function drawTable() {

    while (table.hasChildNodes()) {
        table.removeChild(table.firstChild);
    }

    fields = []

    for (let i = 0; i < width; i++) {
        const col = document.createElement('div')
        col.setAttribute('id', -i)
        col.classList.add('col');
        for (let j = 0; j < width; j++) {
            const square = document.createElement('div')
            square.setAttribute('draggable', 'true')
            square.setAttribute('id', j + "," + i)
            square.setAttribute('col', i)
            square.setAttribute('row', j)
            square.classList.add('square');
            square.style.backgroundImage = pics[board[j][i]]
            col.appendChild(square)
            fields.push(square)
        }
        table.appendChild(col)
    }

    initDragAndDrop();
}


function initDragAndDrop() {
    let draganddropelements = document.querySelectorAll('.square');
    initElements(draganddropelements);
}


function initElements(draganddropelements) {
    for (const draganddropable of draganddropelements) {
        initElement(draganddropable);
    }
}


function initElement(draganddropable) {
    draganddropable.addEventListener("dragstart", dragStart);
    draganddropable.addEventListener("drag", drag);
    draganddropable.addEventListener("dragend", dragEnd);
    draganddropable.addEventListener("dragover", dropOver);
    draganddropable.addEventListener("dragenter", dropEnter);
    draganddropable.addEventListener("dragleave", dropLeave);
    draganddropable.addEventListener("drop", drop);
}
//Drag functions


function dragStart(event){
    // squarethemedragged = this.style.backgroundImage
    // squareiddragged = parseInt(this.id)
    event.dataTransfer.setData("image", this.style.backgroundImage);
    event.dataTransfer.setData("text", this.id);
    event.dataTransfer.setData("row", this.getAttribute("row"))
    event.dataTransfer.setData("col", this.getAttribute("col"))
}


function drag(event) {
    event.preventDefault();
}


function dragEnd(event) {
    event.preventDefault();
}

//Drop functions

function dropOver(event) {
    event.preventDefault();
}


function dropEnter(event) {
    event.preventDefault();
}


function dropLeave(event) {
    event.preventDefault();
}


function drop(event) {
    let id = event.dataTransfer.getData("text");
    let row = parseInt(event.dataTransfer.getData("row"));
    let col = parseInt(event.dataTransfer.getData("col"));

    let targetRow = parseInt(event.target.getAttribute("row"))
    let targetCol = parseInt(event.target.getAttribute("col"))

    if (isMoveCorrect(row, col, targetRow, targetCol) == true && event.target.className == "square"){

        swapInBoard(row, col, targetRow, targetCol)
        let image = event.dataTransfer.getData("image");
        let field = fields.find(f=>f.getAttribute('id') === id)
        field.style.backgroundImage = event.target.style.backgroundImage
        event.target.style.backgroundImage = image

        if(checkMatches()){
            // if (checkForPossibleMove() === false){
            //     const noMoreMoves = document.createElement('div');
            //     noMoreMoves.classList.add('nomoremoves');
            //     noMoreMoves.innerHTML = 'No more moves';
            //     body.appendChild(noMoreMoves)
            // }
            drawTable();
        }
    }
}


function swapInBoard(sourceRow, sourceCol, targetRow, targetCol){
    let field = board[targetRow][targetCol]
    board[targetRow][targetCol] = board[sourceRow][sourceCol]
    board[sourceRow][sourceCol] = field
}


function isMoveCorrect(row, col, targetRow, targetCol) {
    let rowDist = Math.abs(targetRow - row)
    let colDist = Math.abs(targetCol - col)

    return (colDist === 1 && rowDist === 0) || (colDist === 0 && rowDist === 1);
}


function checkMatches(){
    //We check from up to down and from left to right
    let doMatches = true
    let needsRedrawTable = false
    while (doMatches) {

        let markFieldToRemove = []
        //Initialize empty board
        for (let i = 0; i < width; i++) {
            let row = new Array(width).fill(0);
            markFieldToRemove.push(row);
        }

        for (let row = 0; row < width; row++) {
            for (let col = 0; col < width; col++) {
                let checkResult = 1 + makeCheckInRow(row, col)
                if (checkResult >= MATCHES) {
                    for (let index = 0; index < checkResult; index++) {
                        markFieldToRemove[row][col + index] = 1
                    }
                }

                checkResult = 1 + makeCheckInCol(row, col)
                if (checkResult >= MATCHES) {
                    for (let index = 0; index < checkResult; index++) {
                        markFieldToRemove[row + index][col] = 1
                    }
                }
            }
        }

        //Remove fields
        for (let row = 0; row < width; row++) {
            for (let col = 0; col < width; col++) {
                if (markFieldToRemove[row][col] === 1)
                    board[row][col] = EMPTYPLACE
            }
        }

        //do move fields from up to down board if neighborhood is empty place (on the bottom or on the right is -1 then swap)
        while (doRelocations())
            ;

        //Add random fields in empty places
        let countEmptyPlaces = fillEmptyPlacesOnBoard()
        doMatches = countEmptyPlaces > 0
        
        needsRedrawTable = needsRedrawTable || countEmptyPlaces > 0
    }

    return needsRedrawTable
}


function doRelocations(){
    let swap = false
    for(let row = 0; row < width; row++){
        for(let col = 0; col < width; col++){
            //In columns
            if(col + 1 < width)
                swap = swap || CheckSwap(row, col, row, col + 1)

            //In rows
            if(row + 1 < width)
                swap = swap || CheckSwap(row, col, row + 1, col)
        }
    }

    return swap
}


function CheckSwap(row, col, row2, col2){
    if(board[row][col] !== EMPTYPLACE && board[row2][col2] === EMPTYPLACE){
        board[row2][col2] = board[row][col]
        board[row][col] = EMPTYPLACE
        return true
    }

    return false;
}


function makeCheckInCol(row, col){
    if (width === row + 1)
        return 0

    let count = 0
    if(board[row][col] === board[row+1][col]){
        count = 1 + makeCheckInCol(row+1, col)
    }

    if (count == 2)
    points += 3

    else if (count == 3)
    points += 4

    else if (count == 4)
    points += 5

    // console.log(count, row, col)
    scorePoints.innerHTML = points;
    return count
}


function makeCheckInRow(row, col){
    if (width === col + 1)
        return 0

    let count = 0
    if(board[row][col] === board[row][col+1]){
        count = 1 + makeCheckInRow(row, col+1)
    }

    if (count == 2)
    points += 3

    else if (count == 3)
    points += 4

    else if (count == 4)
    points += 5

    scorePoints.innerHTML = points; 
    return count
}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function checkForPossibleMove() {
    // let checkboard = board.map((x) => x);
    for (let row = 0; row < width; row++) {
        for (let col = 0; col < width - 1; col++) {
            swapInBoard(row, col, row, col + 1);
            let checkRow1 = checkRow(row);
            let checkCol1 = checkCol(col);
            let checkCol2 = checkCol(col + 1);
            if (checkRow1 || checkCol1 || checkCol2) {
                swapInBoard(row, col, row, col + 1);
                return true
            }
            swapInBoard(row, col, row, col + 1);
        }
    }
    for (let row = 0; row < width - 1; row++) {
        for (let col = 0; col < width; col++) {
            swapInBoard(row + 1, col, row, col);
            let checkRow1 = checkRow(row);
            let checkRow2 = checkRow(row + 1);
            let checkCol1 = checkCol(col);
            if (checkRow1 || checkRow2 || checkCol1) {
                swapInBoard(row + 1, col, row, col);
                return true
            }
            swapInBoard(row, col, row, col + 1);
        }
    }
    return false
}

function checkRow(row) {
    for (let index = 0; index <= width - 3; index++) {
        if ((board[row][index] === board[row][index + 1]) && (board[row][index + 1] === board[row][index + 2])) {
            return true
        }
    }
    return false
}

function checkCol(col) {
    for (let index = 0; index <= width - 3; index++) {
        if ((board[index][col] === board[index + 1][col]) && (board[index + 1][col] === board[index + 2][col])) {
            return true
        }
    }
    return false
}
// function score(count){
    
//     if (count == 2)
//     points += 3

//     else if (count == 3)
//     points += 4

//     else if (count == 4)
//     points += 5
    
// }
