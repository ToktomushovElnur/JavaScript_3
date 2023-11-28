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

const hideTabsContent = ()=> {
    tabsContent.forEach(tabContent => {
        tabContent.style.display = 'none'
    })
    tabs.forEach(tab=>{
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabsContent = (index) => {
    tabsContent[index].style.display = 'block';
    tabs[index].classList.add('tab_content_item_active')
}

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabs.forEach((tabElement, tabIndex) => {
            if (event.target === tabElement){
                hideTabsContent()
                showTabsContent(tabIndex)
            }
        })
    }
}

const showNextTab = () => {
    currentIndex = (currentIndex + 1) % tabs.length
    hideTabsContent()
    showTabsContent(currentIndex)
};

showTabsContent(currentIndex)

setInterval(showNextTab, 3000)

//convereter

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const converter = (element, targetElement, targetElement2, type) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../data/converter.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            const changes = JSON.parse(request.response);
            switch (type) {
                case 'som':
                    targetElement.value = (element.value / changes.usd).toFixed(2);
                    targetElement2.value = (element.value / changes.eur).toFixed(2);
                    break;
                case 'usd':
                    targetElement.value = (element.value * changes.usd).toFixed(2);
                    targetElement2.value = (element.value * changes.usd / changes.eur).toFixed(2);
                    break;
                case 'eur':
                    targetElement.value = (element.value * changes.eur).toFixed(2);
                    targetElement2.value = (element.value * changes.eur / changes.usd).toFixed(2);
                    break;
                default:
                    break;
            }
            element.value === '' && (targetElement.value = targetElement2.value = '');
        };
    };
};

converter(somInput, usdInput, eurInput, 'som');
converter(usdInput, somInput, eurInput, 'usd');
converter(eurInput, somInput, usdInput, 'eur');



//card switcher

const card = document.querySelector('.card')
const prev = document.querySelector('#btn-prev')
const next = document.querySelector('#btn-next')

let currentCard = 1

function updateCard() {
    fetch(`https://jsonplaceholder.typicode.com/posts/${currentCard}`)
        .then(response => response.json())
        .then(data => {
            card.innerHTML = `
                <span>${data.id}</span>
                <h2>${data.title}</h2>
                <p>${data.body}</p>
            `
        })
        .catch(error => console.error('Error fetching data:', error))
}
updateCard()

function updateCardNumberAndFetch(offset) {
    currentCard += offset
    if (currentCard < 1) {
        currentCard = 100
    } else if (currentCard > 100) {
        currentCard = 1
    }
    updateCard()
}
prev.onclick = () => updateCardNumberAndFetch(-1)
next.onclick = () => updateCardNumberAndFetch(1)




