initGame();

function initGame() {
    const pics = [
    'url(Pics/CSS.png)',
    'url(Pics/github.png)',
    'url(Pics/HTML.png)',
    'url(Pics/JS.png)',
    'url(Pics/PYCHARM.png)',
    'url(Pics/VSC.png)'
    ];
    const width = 8;
    const fields = [];
    const grid = document.querySelector('.grid');
    createBoard();
    // Your game can start here, but define separate functions, don't write everything in here :)

}



function createBoard() {
  for (let i = 0; i < 64; i++) {
    const field = document.createElement('div')
    field.setAttribute('draggable', true)
    field.setAttribute('id', i)
    let randomPic = Math.floor(Math.random() * pics.length)
    field.style.backgroundImage = pics[randomPic]
    grid.appendChild(field)
    fields.push(field)
  }
}