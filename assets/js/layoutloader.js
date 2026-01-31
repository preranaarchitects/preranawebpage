document.addEventListener("DOMContentLoaded", () => {

    const seoMap = [
        {
            id: "hero",
            title: "Industrial & Residential Architects in Bangalore | Prerana Architects",
            meta: "Prerana Architects delivers residential and industrial architectural design solutions in Bangalore."
        },
        {
            id: "our-services",
            title: "Architectural Design Services in Bangalore | Prerana Architects",
            meta: "Residential, industrial, interior design, 3D modeling and renovation services in Bangalore."
        },
        {
            id: "our-projects",
            title: "Architecture Projects & Portfolio | Prerana Architects Bangalore",
            meta: "Explore residential, industrial and interior architecture projects by Prerana Architects."
        },
        {
            id: "about-us",
            title: "About Prerana Architects | Experienced Architects in Bangalore",
            meta: "Learn about Prerana Architects, an experienced architecture and interior firm in Bangalore."
        },
        {
            id: "our-team",
            title: "Meet Our Team | Expert Architects & Designers in Bangalore",
            meta: "Meet the experienced team of architects, interior designers, and construction professionals at Prerana Architects Bangalore."
        },
        {
            id: "contact-us",
            title: "Contact Prerana Architects | Architectural Services Bangalore",
            meta: "Contact Prerana Architects Bangalore for architecture, interior and construction services."
        }
    ];

    function updateSEO(title, meta) {
        document.title = title;

        let metaTag = document.querySelector("meta[name='description']");
        if (!metaTag) {
            metaTag = document.createElement("meta");
            metaTag.name = "description";
            document.head.appendChild(metaTag);
        }
        metaTag.setAttribute("content", meta);
    }

    /* ==========================
       SCROLL BASED (PRIMARY)
    ========================== */
    function onScrollChangeSEO() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        for (let i = seoMap.length - 1; i >= 0; i--) {
            const section = document.getElementById(seoMap[i].id);
            if (!section) continue;

            if (scrollPosition >= section.offsetTop) {
                updateSEO(seoMap[i].title, seoMap[i].meta);
                break;
            }
        }
    }

    window.addEventListener("scroll", onScrollChangeSEO);
    onScrollChangeSEO(); // initial load

    /* ==========================
       CLICK BASED (INSTANT)
    ========================== */
    document.querySelectorAll("a[href^='#']").forEach(link => {
        link.addEventListener("click", () => {
            const id = link.getAttribute("href").replace("#", "");
            const match = seoMap.find(s => s.id === id);
            if (match) {
                updateSEO(match.title, match.meta);
            }
        });
    });

});



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
    loadSection("our-team")
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
