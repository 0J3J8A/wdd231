// Current Year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = lastModified;

// HAMBURGER MENU
document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('MAIN_MENU');
    const hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', function (e) {
        e.preventDefault();
        menu.classList.toggle('menu-open');
        this.textContent = menu.classList.contains('menu-open') ? '✕' : '☰';
    });
});

// JSON DATA
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();

        const premiumMembers = members.filter(m => m.membership >= 2);
        const shuffled = [...premiumMembers].sort(() => Math.random() - 0.5);
        const randomSpotlights = shuffled.slice(0, 3);
        
        displayMembers(randomSpotlights, 'grid');

    } catch (error) {
        console.error('Error loading members:', error);
        document.getElementById('members_container').innerHTML = `
            <p class="error-message">Error loading data. Please try again later.</p>
        `;
    }
});

function displayMembers(members, viewType) {
    const container = document.getElementById('members_container');
    container.innerHTML = '';
    container.className = viewType;

    members.forEach(member => {
        container.appendChild(createGridCard(member));
    });
}


function createGridCard(member) {
    const card = document.createElement('div');
    card.className = `member-card ${getMembershipClass(member.membership)}`;

    card.innerHTML = `
        <div class="card-image">
            <img src="${member.image}" alt="${member.name}" loading="lazy">
        </div>
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.url}" target="_blank">Go to Web Site</a></p>
    `;

    return card;
}

// (GOLD/SILVER/MEMBER) 
function getMembershipClass(level) {
    switch (level) {
        case 3:
            return 'gold';
        case 2:
            return 'silver';
        case 1:
        default:
            return 'member';
    }
}


//CURRENT WEATHER
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '86d0dab3aafa0d6e1ca0bfc006dd8607';
    const city = 'Springfield,US';
    const units = 'metric';

    // CURRENT WEATHER
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('weather-temp').textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById('weather-desc').textContent = `Conditions: ${data.weather[0].description}`;
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
            document.getElementById('weather-temp').textContent = 'Weather not available';
            document.getElementById('weather-desc').textContent = '';
            document.getElementById('weather-icon').src = '';
            document.getElementById('weather-icon').alt = '';
        });

    // FORECAST
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const forecastContainer = document.getElementById('forecast');
            forecastContainer.innerHTML = '';

            const forecastDays = {};
            data.list.forEach(item => {
                const date = new Date(item.dt_txt);
                const day = date.toLocaleDateString('en-US', { weekday: 'long' });
                if (!forecastDays[day]) {
                    forecastDays[day] = item;
                }
            });

            Object.keys(forecastDays).slice(0, 4).forEach(day => {
                const item = forecastDays[day];
                const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

                forecastContainer.innerHTML += `
                    <div class="forecast-day">
                        <h4>${day}</h4>
                        <img src="${iconUrl}" alt="${item.weather[0].description}" width="48" height="48">
                        <p>${item.main.temp.toFixed(1)}°C</p>
                        <p>${item.weather[0].description}</p>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            document.getElementById('forecast').textContent = 'Forecast not available';
        });
});
