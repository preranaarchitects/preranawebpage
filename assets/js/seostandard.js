const sectionTitles = {
    hero: "Industrial & Residential Architects in Bangalore | Prerana Architects",
    services: "Architectural Design Services in Bangalore | Prerana Architects",
    projects: "Our Architectural Projects & Portfolio | Prerana Architects",
    aboutus: "About Prerana Architects | Experienced Architects in Bangalore",
    contactus: "Contact Prerana Architects | Architectural Services Bangalore"
};

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("main > div[id]");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5  // 50% of section visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const id = entry.target.id;
                if(sectionTitles[id]) {
                    document.title = sectionTitles[id];
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});

document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", () => {
        const id = link.getAttribute("href").substring(1);
        if(sectionTitles[id]) {
            document.title = sectionTitles[id];
        }
    });
});

const sectionMeta = {
    hero: "Prerana Architects delivers expert industrial and residential architectural design in Bangalore. Transform your ideas into functional, aesthetic, and sustainable spaces with our experienced team.",
    services: "Explore architectural design services in Bangalore by Prerana Architects, including residential, industrial, warehouse design, interior planning, and 3D modeling solutions.",
    projects: "View the architectural projects and portfolio of Prerana Architects Bangalore, showcasing innovative residential, industrial, and commercial designs.",
    aboutus: "Learn about Prerana Architects, a Bangalore-based architectural firm providing expert design, construction management, and interior solutions for residential and industrial clients.",
    contactus: "Contact Prerana Architects in Bangalore for professional architectural services, interior design, and construction planning tailored to your project needs."
};

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("main > div[id]");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const id = entry.target.id;
                if(sectionMeta[id]) {
                    let metaTag = document.querySelector("meta[name='description']");
                    if(metaTag) {
                        metaTag.setAttribute("content", sectionMeta[id]);
                    }
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});