// Display submitted form data
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById('confirmName').textContent =
        `${urlParams.get('firstName')} ${urlParams.get('lastName')}`;
    document.getElementById('confirmEmail').textContent = urlParams.get('email');
    document.getElementById('confirmPhone').textContent = urlParams.get('phone');
    document.getElementById('confirmBusiness').textContent = urlParams.get('business');

    const timestamp = new Date(urlParams.get('timestamp'));
    document.getElementById('confirmDate').textContent = timestamp.toLocaleString();

    // Current Year and Last Modified
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;
});

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