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

const width = 8;

const fields = [];
const table = document.querySelector('.table');

initGame();

function initGame() {
    createBoard();
    initDragAndDrop();

    // Your game can start here, but define separate functions, don't write everything in here :)
}

function createBoard() {
  for (let i = 1 ; i <= width; i++) {
    const col = document.createElement('div')
    col.setAttribute('id', i)
    col.classList.add('col');
    for (let j = i; j <= width * width; j+=width) {
        const square = document.createElement('div')
        square.setAttribute('draggable', 'true')
        square.setAttribute('id', j)
        square.classList.add('square');
        let randomPic = Math.floor(Math.random() * pics.length)
        square.style.backgroundImage = pics[randomPic]
        col.appendChild(square)
        fields.push(square)
    }
    table.appendChild(col)
  }
}

function initDragAndDrop() {
    let draganddropelements = document.querySelectorAll('.squares');
    initElements(draganddropelements);
}

function initElements(draganddropelements) {
    for (const draganddropable of draganddropelements) {
        initElement(draganddropable);
    }
}

function initElement(draganddropable) {
    draganddropable.addEventListener("dragstart", dragStartHandler);
    draganddropable.addEventListener("drag", dragHandler);
    draganddropable.addEventListener("dragend", dragEndHandler);
    draganddropable.addEventListener("dragover", dropOverHandler);
    draganddropable.addEventListener("dragenter", dropEnterHandler);
    draganddropable.addEventListener("dragleave", dropLeaveHandler);
    draganddropable.addEventListener("drop", dropHandler);
}
//Drag functions

function dragStartHandler(){

}

function dragHandler() {

}

function dragEndHandler() {

}

//Drop functions

function dropOverHandler() {

}

function dropEnterHandler() {

}

function dropLeaveHandler() {

}

function dropHandler() {

}

