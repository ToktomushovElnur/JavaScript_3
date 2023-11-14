
const gmail_input = document.querySelector('#gmail_input')
const gmail_button = document.querySelector('#gmail_button')
const gmail_result = document.querySelector('#gmail_result')

const RegExp = /^\w+@gmail\.com$/i;

gmail_button.addEventListener('click', ()=> {
    if (RegExp.test(gmail_input.value)) {
        gmail_result.innerHTML = 'OK'
        gmail_result.style.color = 'green'
    } else {
        gmail_result.innerHTML = 'NOT OK'
        gmail_result.style.color = 'red'
    }
})


// const parentBlock = document.querySelector('.parent_block')
// const childBlock = document.querySelector('.child_block')
//
// function moveRight(position) {
//     if (position < parentBlock.offsetWidth - childBlock.offsetWidth) {
//         childBlock.style.left = `${position}px`
//         setTimeout(() => moveRight(position + 1), 10)
//     }
// }
//
// window.onload = () => {
//     moveRight(parseInt(childBlock.style.left) || 0)
// }

//БЕСКОНЕЧЕЫЙ КВАДРАТ

 const childBlock = document.querySelector('.child_block')

 let positionX = 0
 let positionY = 0

 const moveChildBlock = ()=> {
     if (positionX < 449 && positionY === 0) {
         positionX++;
         childBlock.style.left = `${positionX}px`;
         setTimeout(moveChildBlock,10)
     } else if (positionX >= 448 && positionY < 448) {
         positionY++;
         childBlock.style.top = `${positionY}px`;
         setTimeout(moveChildBlock,10)
     } else if (positionX > 0) {
         positionX--;
         childBlock.style.left = `${positionX}px`;
         setTimeout(moveChildBlock,10)
     } else if (positionY > 0) {
         positionY--
         childBlock.style.top = `${positionY}px`
         setTimeout(moveChildBlock,10)
     }
 }
 moveChildBlock()


//СЧЕТЧИК

let num = 0 // для хранения текущего значения
let intervalId // хранения идентификатора интервала
let isRunning = false // отслеживания состояния счетчика

const secondsS = document.querySelector('#secondsS')
const buttonStart = document.querySelector('#start')
const buttonStop = document.querySelector('#stop')
const buttonReset = document.querySelector('#reset')

buttonStart.addEventListener('click', () => {
    if (!isRunning) {
        // Запуск счетчика
        intervalId = setInterval(() => {
            num++
            secondsS.innerHTML = num
        }, 1000)
        isRunning = true
    }
})


//Остановка счетчика
buttonStop.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(intervalId)
        isRunning = false
    }
})


// Обнуление счетчика
buttonReset.addEventListener('click', () => {
    num = 0;
    secondsS.innerHTML = num
    clearInterval(intervalId)
    isRunning = false
})
