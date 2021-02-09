document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 8
    const fields = []
    let score = 0


    const pics = [
        'url(Pics/CSS.png)',
        'url(Pics/GH.png)',
        'url(Pics/HTML.png)',
        'url(Pics/JS.png)',
        'url(Pics/PC.png)',
        'url(Pics/VSC.png)'
    ]


//create your board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const field = document.createElement('div')
            field.setAttribute('draggable', true)
            field.setAttribute('id', i)
            let randompic = Math.floor(Math.random() * pics.length)
            field.style.backgroundImage = pics[randompic]
            grid.appendChild(field)
            fields.push(field)
        }
    }

    createBoard()
})