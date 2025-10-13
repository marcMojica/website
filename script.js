// Changing/Stored CSS Variables - Enables Altered Property via Interaction & Stores Scroll
const checkbox = document.querySelector('input[type="checkbox"]');
const sidebar = document.querySelector('.sidebar');
const body = document.body;
let scrollPosition = 0;

checkbox.addEventListener('change', function () {
    if (this.checked) {
        // Opening sidebar - Store current scroll position and apply no-scroll class
        scrollPosition = window.scrollY;
        body.classList.add('no-scroll');
        
    } else {
        // Closing sidebar - Remove no-scroll class and restore scroll position
        body.classList.remove('no-scroll');
        window.scrollTo(0, scrollPosition);
    }
});

document.getElementById('contacts-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const status = document.getElementById('form-status');
  
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });
  
      if (response.ok) {
        status.textContent = "Thank you for the message! I will get back to you as soon as possible!";
        status.style.color = "green";
        form.reset();
      } else {
        status.textContent = "It seems that were was a problem sending your message.";
        status.style.color = "red";
      }
    } catch (error) {
      status.textContent = "Network error. Please try again later.";
      status.style.color = "red";
    }
  
    status.classList.remove("hidden");
  });
  