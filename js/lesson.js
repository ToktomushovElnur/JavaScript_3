// PHONE CHEKER
const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneSpan = document.querySelector('#phone_result')

const regExp = /\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', () => {
    if (regExp.test(phoneInput.value)){
        phoneSpan.innerHTML = 'OK'
        phoneSpan.style.color = 'green'
    } else {
        phoneSpan.innerHTML =  'NOT OK'
        phoneSpan.style.color = 'red'
    }
})




//tap slider
const tabsContent = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')

let currentIndex = 0

const hideTabsContent = () => {
    tabsContent.forEach(tabContent => {
        tabContent.style.display = 'none'
    });
    tabs.forEach(tab => {
        tab.classList.remove('tab_content_item_active')
    });
};

const showTabsContent = (index) => {
    tabsContent[index].style.display = 'block'
    tabs[index].classList.add('tab_content_item_active')
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

tabsParent.addEventListener('click', (event) => {
    const clickedTab = event.target.closest('.tab_content_item')
    if (clickedTab) {
        tabs.forEach((tabElement, tabIndex) => {
            if (clickedTab === tabElement) {
                hideTabsContent()
                showTabsContent(tabIndex)
            }
        });
    }
});

const showNextTab = async () => {
    try {
        currentIndex = (currentIndex + 1) % tabs.length
        hideTabsContent()
        showTabsContent(currentIndex)
    } catch (error) {
        console.error('Error showing next tab:', error)
    }
};

const startTabInterval = async () => {
    while (true) {
        try {
            await showNextTab()
            await sleep(3000)
        } catch (error) {
            console.error('Error in tab interval:', error)
        }
    }
}

showTabsContent(currentIndex)
startTabInterval()








//convereter

const somInput = document.querySelector('#som')
const usdInput = document.querySelector('#usd')
const eurInput = document.querySelector('#eur')

const fetchData = async () => {
    try {
        const response = await fetch('../data/converter.json')
        const changes = await response.json()
        return changes
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
};

const converter = async (element, targetElement, targetElement2, type) => {
    element.oninput = async () => {
        try {
            const changes = await fetchData()

            switch (type) {
                case 'som':
                    targetElement.value = (element.value / changes.usd).toFixed(2)
                    targetElement2.value = (element.value / changes.eur).toFixed(2)
                    break
                case 'usd':
                    targetElement.value = (element.value * changes.usd).toFixed(2)
                    targetElement2.value = (element.value * changes.usd / changes.eur).toFixed(2)
                    break
                case 'eur':
                    targetElement.value = (element.value * changes.eur).toFixed(2)
                    targetElement2.value = (element.value * changes.eur / changes.usd).toFixed(2)
                    break
                default:
                    break
            }

            if (element.value === '') {
                targetElement.value = targetElement2.value = ''
            }
        } catch (error) {
            console.error('Error processing conversion:', error)
        }
    }
}

try {
    converter(somInput, usdInput, eurInput, 'som')
    converter(usdInput, somInput, eurInput, 'usd')
    converter(eurInput, somInput, usdInput, 'eur')
} catch (error) {
    console.error('Error initializing converters:', error)
}





//card switcher

const card = document.querySelector('.card')
const prev = document.querySelector('#btn-prev')
const next = document.querySelector('#btn-next')

let currentCard = 1

async function updateCard() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${currentCard}`)
        const data = await response.json()

        card.innerHTML = `
            <span>${data.id}</span>
            <h2>${data.title}</h2>
            <p>${data.body}</p>
        `
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

async function updateCardNumberAndFetch(offset) {
    try {
        currentCard += offset
        if (currentCard < 1) {
            currentCard = 100
        } else if (currentCard > 100) {
            currentCard = 1
        }
        await updateCard()
    } catch (error) {
        console.error('Error updating card number and fetching data:', error)
    }
}
updateCard()
prev.addEventListener('click', async () => await updateCardNumberAndFetch(-1))
next.addEventListener('click', async () => await updateCardNumberAndFetch(1))




//SEARCH WEATHER

const citySearchInput = document.querySelector('.cityName'),
    city = document.querySelector('.city'),
    temp = document.querySelector('.temp')

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

citySearchInput.onclick = async (event) => {
    try {
        const response = await fetch(`${BASE_URL}?q=${event.target.value}&appid=${API_KEY}`)
        const data = await response.json()

        if (response.ok) {
            city.innerHTML = data?.name ? data.name : 'Город не найден...'
            temp.innerHTML = data?.main?.temp ? Math.round(data.main.temp - 273) + '&deg;C' : '...'
        } else {
            console.error('Ошибка при запросе:', response.status, response.statusText)
        }
    } catch (error) {
        console.error('Произошла ошибка:', error.message)
    }
};



