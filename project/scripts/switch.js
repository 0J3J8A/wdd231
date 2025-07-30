// Current Year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById("lastmodification").textContent = lastModified;

// HAMBURGER MENU
document.addEventListener('DOMContentLoaded', function() {
  const menu = document.getElementById('MAIN_MENU');
  const hamburger = document.getElementById('h_menu');
  
  hamburger.addEventListener('click', function(e) {
    e.preventDefault();
    menu.classList.toggle('menu-open');
  });
});