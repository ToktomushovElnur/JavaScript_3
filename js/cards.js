async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function createCard(title, body) {
    const cardContainer = document.getElementById('cardContainer');

    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    // Установите URL вашего изображения
    image.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJQrqvgt26RF00ZQVboY6aSlRslzdsDA75AA&usqp=CAU';
    image.alt = 'Card Image';
    card.appendChild(image);

    const cardTitle = document.createElement('h2');
    cardTitle.textContent = title;
    card.appendChild(cardTitle);

    const cardDescription = document.createElement('p');
    cardDescription.textContent = body;
    card.appendChild(cardDescription);

    cardContainer.appendChild(card);
}

async function renderCards() {
    try {
        const data = await fetchData();

        for (const post of data) {
            await createCard(post.title, post.body);
        }
    } catch (error) {
        console.error('Error rendering cards:', error);
    }
}

// Вызываем функцию для отображения карточек при загрузке страницы
renderCards();