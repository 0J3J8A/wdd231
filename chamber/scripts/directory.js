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

        displayMembers(members, 'grid');

        document.getElementById('grid-view').addEventListener('click', () => {
            displayMembers(members, 'grid');
        });

        document.getElementById('list-view').addEventListener('click', () => {
            displayMembers(members, 'list');
        });

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
        if (viewType === 'grid') {
            container.appendChild(createGridCard(member));
        } else {
            container.appendChild(createListItem(member));
        }
    });
}

function createListItem(member) {
    const item = document.createElement('div');
    item.className = 'member-item';

    item.innerHTML = `
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone Number:</strong> ${member.phone}</p>
        <p><strong>Web Site:</strong> <a href="${member.url}" target="_blank">${member.url.replace(/https?:\/\//, '')}</a></p>
    `;

    return item;
}

/*GOLDEN/SILVER/MEMBER*/
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
// COLOR IN THE LIST OPTION
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

function createListItem(member) {
    const item = document.createElement('div');
    item.className = `member-item ${getMembershipClass(member.membership)}`; // ← Aquí está el cambio clave
    
    item.innerHTML = `
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone Number:</strong> ${member.phone}</p>
        <p><strong>Web Site:</strong> <a href="${member.url}" target="_blank">${member.url.replace(/https?:\/\//, '')}</a></p>
    `;

    return item;
}