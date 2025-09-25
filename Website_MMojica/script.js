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
