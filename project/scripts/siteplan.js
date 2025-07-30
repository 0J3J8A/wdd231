// Current Year
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastmodification").textContent = document.lastModified;

// Hamburger Menu
document.addEventListener('DOMContentLoaded', function() {
  const menu = document.getElementById('MAIN_MENU');
  const hamburger = document.getElementById('h_menu');
  
  hamburger.addEventListener('click', function(e) {
    e.preventDefault();
    menu.classList.toggle('menu-open');
  });

  // Form Handling
  const form = document.getElementById('gamingNewsletter');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const wantsUpdates = document.getElementById('updates').checked;
    
    // Create subscriber object
    const subscriber = {
      name: name,
      email: email,
      wantsUpdates: wantsUpdates,
      subscriptionDate: new Date().toLocaleDateString()
    };
    
    // Save to localStorage
    saveSubscriber(subscriber);
    
    // Show success message
    showMessage(`Thanks ${name}! ${wantsUpdates ? 'You will receive updates.' : 'Thanks for registering.'}`);
    
    // Reset form
    form.reset();
  });

  function saveSubscriber(subscriber) {
    const subscribers = JSON.parse(localStorage.getItem('subscribers')) || [];
    subscribers.push(subscriber);
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
  }

  function showMessage(message) {
    // Clear previous message and timeout
    formMessage.className = '';
    formMessage.textContent = '';
    if (formMessage.timeout) clearTimeout(formMessage.timeout);
    
    // Set new message
    formMessage.textContent = message;
    formMessage.classList.add('success', 'show');
    
    // Hide after 5 seconds
    formMessage.timeout = setTimeout(() => {
      formMessage.classList.remove('show');
      // Fully reset after animation
      setTimeout(() => {
        formMessage.className = '';
        formMessage.textContent = '';
      }, 500);
    }, 5000);
  }
});