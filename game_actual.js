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
let squarethemedragged;
let squareiddragged;

initGame();

function initGame() {
    createBoard();
    initDragAndDrop();
    // Your game can start here, but define separate functions, don't write everything in here :)
}

function createBoard() {
  for (let i = 1 ; i <= width; i++) {
    const col = document.createElement('div')
    col.setAttribute('id', -i)
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
    if (isMoveCorrect(event, id) == true){
        if (event.target.className == "square") {
            // let classname = event.dataTransfer.getData("text");
            let image = event.dataTransfer.getData("image");
            calculated_id = Math.floor((id - 1)/width) + ((id - 1) % width) * width;
            fields[calculated_id].style.backgroundImage = event.target.style.backgroundImage
            event.target.style.backgroundImage = image
        }
    }
}


function isMoveCorrect(event, id) {
    let isAble = false
    console.log(id, event.target.id)
    if (parseInt(event.target.id) == parseInt(id) + 1){
        isAble = true
        return isAble
    }
    else if (parseInt(event.target.id) == parseInt(id) - 1){
        isAble = true
        return isAble
    }
    else if (parseInt(event.target.id) == parseInt(id) + 8){
        isAble = true
        return isAble
    }
    else if (parseInt(event.target.id) == parseInt(id) - 8){
        isAble = true
        return isAble
    }
    else{
        return isAble
    }
    // if (id ==  event.target.id + 1 || id ==  event.target.id + 8 || id ==  event.target.id - 1 || id ==  event.target.id - 8){
    //     isAble = true
    //     return isAble
    // }
}

