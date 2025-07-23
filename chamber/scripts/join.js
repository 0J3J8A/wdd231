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

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modalBtns = document.querySelectorAll('.info-btn');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close');
    
    // Open modal
    modalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'block';
        });
    });
    
    // Close modal
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close when clicking outside modal
    window.addEventListener('click', function(e) {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});