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


const parentBlock = document.querySelector('.parent_block')
const childBlock = document.querySelector('.child_block')

function moveRight(position) {
    if (position < parentBlock.offsetWidth - childBlock.offsetWidth) {
        childBlock.style.left = `${position}px`
        setTimeout(() => moveRight(position + 1), 10)
    }
}

window.onload = () => {
    moveRight(parseInt(childBlock.style.left) || 0)
}
