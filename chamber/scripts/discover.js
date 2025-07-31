// Current Year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = lastModified;

// Hamburger Menu
document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('MAIN_MENU');
    const hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', function (e) {
        e.preventDefault();
        menu.classList.toggle('menu-open');
        this.textContent = menu.classList.contains('menu-open') ? '✕' : '☰';
    });

    // Load attractions data
    loadAttractions();
    displayVisitorMessage();
});

function loadAttractions() {
    fetch('data/discover.json')
        .then(response => response.json())
        .then(data => {
            const grid = document.getElementById('discover-grid');
            data.attractions.forEach(attraction => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h2>${attraction.name}</h2>
                    <figure>
                        <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
                    </figure>
                    <address>${attraction.address}</address>
                    <p>${attraction.description}</p>
                `;
                grid.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading attractions:', error));
}

function displayVisitorMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    const messageElement = document.getElementById('visitor-message');

    if (!lastVisit) {
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

        if (daysSinceLastVisit < 1) {
            messageElement.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysSinceLastVisit === 1 ? "day" : "days";
            messageElement.textContent = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
        }
    }

    localStorage.setItem('lastVisit', now.toString());
}