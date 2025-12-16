document.addEventListener("DOMContentLoaded", function () {

    function loadSection(containerId, callback) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const fileName = container.getAttribute("data-file");
        if (!fileName) return;

        const fullPath = `components/${fileName}`;

        fetch(fullPath)
            .then(res => res.text())
            .then(html => {
                container.innerHTML = html;

                // Call callback after section is loaded
                if (typeof callback === "function") callback(container);
            })
            .catch(err => console.error(`Error loading ${fullPath}:`, err));
    }

    // Load sections
    loadSection("header", (container) => {
        initHeaderLinks(container);
    });
    loadSection("hero", (container) => {
        initHeroSlider(container);
    });
    loadSection("our-services");
    loadSection("our-projects", (container) => {
        initProjectFilters(container);
    });
    loadSection("about-us");
    loadSection("contact-us", (container) => {
        initContactForm(container); // Initialize EmailJS form after HTML is loaded
    });
    loadSection("footer");
});

// Smooth scroll + prevent clicks outside links
function initHeaderLinks(container) {
    const links = container.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
