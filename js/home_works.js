
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
         childBlock.style.left = `${positionX}px`
         setTimeout(moveChildBlock,10)
     } else if (positionX >= 448 && positionY < 448) {
         positionY++;
         childBlock.style.top = `${positionY}px`
         setTimeout(moveChildBlock,10)
     } else if (positionX > 0) {
         positionX--;
         childBlock.style.left = `${positionX}px`
         setTimeout(moveChildBlock,10)
     } else if (positionY > 0) {
         positionY--
         childBlock.style.top = `${positionY}px`
         setTimeout(moveChildBlock,10)
     }
 }
 moveChildBlock()


//СЧЕТЧИК

let numSeconds = 0
let numMilliseconds = 0
let timeoutId
let isRunning = false

const minutes = document.querySelector('#minutesS')
const secondsS = document.querySelector('#secondsS')
const ml_secondsS = document.querySelector('#ml-secondsS')

const buttonStart = document.querySelector('#start')
const buttonStop = document.querySelector('#stop')
const buttonReset = document.querySelector('#reset')

function updateDisplay() {
    const paddedMinutes = String(Math.floor(numSeconds / 60)).padStart(2, '0')
    const paddedSeconds = String(numSeconds % 60).padStart(2, '0')
    const paddedMilliseconds = String(numMilliseconds).padStart(3, '0').slice(0, 2)

    minutes.innerHTML = paddedMinutes
    secondsS.innerHTML = paddedSeconds
    ml_secondsS.innerHTML = paddedMilliseconds
}

async function startTimer() {
    while (isRunning) {
        await new Promise(resolve => {
            timeoutId = setTimeout(() => {
                numMilliseconds += 100
                if (numMilliseconds === 1000) {
                    numSeconds++;
                    numMilliseconds = 0
                }

                updateDisplay()
                resolve()
            }, 100)
        });
    }
}

buttonStart.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true
        startTimer()
    }
});

buttonStop.addEventListener('click', () => {
    if (isRunning) {
        clearTimeout(timeoutId)
        isRunning = false
    }
})

buttonReset.addEventListener('click', () => {
    numSeconds = 0
    numMilliseconds = 0
    updateDisplay()
    clearTimeout(timeoutId)
    isRunning = false
})

