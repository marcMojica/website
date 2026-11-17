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

const contactForm = document.getElementById('contacts-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
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
}

const prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealElements = document.querySelectorAll(
        'main > section:not(#opening), main > .works-one, footer, #skills .skill-item'
    );
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((element, index) => {
        element.classList.add('reveal-on-scroll');
        if (element.matches('#skills .skill-item')) {
            element.style.setProperty('--reveal-delay', `${(index % 4) * 90}ms`);
        }
        revealObserver.observe(element);
    });

    document.body.classList.add('motion-ready');
}
  