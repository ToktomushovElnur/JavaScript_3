const modal = document.querySelector('.modal')
const modakCloseButton = document.querySelector('.modal_close')
const triggerModal = document.querySelector('#btn-get')

let modalDisplayed = false

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow = 'hidden'
    modalDisplayed = true
};

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow = ''
}

const scrollHandler = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !modalDisplayed) {
        openModal()
        window.removeEventListener('scroll', scrollHandler)
    }
}

triggerModal.onclick = () => {
    openModal()
    window.removeEventListener('scroll', scrollHandler)
}

modakCloseButton.onclick = () => {
    closeModal()
    window.addEventListener('scroll', scrollHandler)
}

modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
        window.addEventListener('scroll', scrollHandler)
    }
}

window.addEventListener('scroll', scrollHandler)

setTimeout(() => {
    openModal()
}, 10000)
