async function loadServiceData() {
    try {
        const response = await fetch("assets/data/service.json");
        if (!response.ok) throw new Error("Service data not found");

        const services = await response.json();
        const grid = document.getElementById("servicesGrid");
        if (!grid) return;

        grid.innerHTML = "";

        services.forEach((service, index) => {
            const col = document.createElement("div");
            col.className = "col-lg-4 col-md-6";

            if (index >= 3) col.classList.add("service-hidden");

            col.innerHTML = `
                <article class="service-card h-100">
                    <h5 class="fw-bold d-flex align-items-center mb-3">
                        <img class="me-2 service-icon-size"
                             src="${service.imagesrc}"
                             alt="${service.imagealt}"
                             loading="lazy">
                        ${service.servicename}
                    </h5>
                    <p class="text-muted small">
                        ${service.servicedescription}
                    </p>
                    <a href="#${service.hrefurl}"
                       class="text-warning text-decoration-none fw-semibold">
                       ${service.servicenavigation} →
                    </a>
                </article>
            `;

            grid.appendChild(col);
        });

        setupToggleButton();

    } catch (error) {
        console.error("Error loading services:", error);
    }
}

function setupToggleButton() {
    const button = document.getElementById("toggleServices");
    const grid = document.getElementById("servicesGrid");

    if (!button || !grid) return;

    button.addEventListener("click", () => {
        const hidden = grid.querySelectorAll(".service-hidden");
        const expanded = grid.classList.toggle("services-expanded");

        hidden.forEach(card => {
            card.style.display = expanded ? "block" : "none";
        });

        button.textContent = expanded
            ? "Show Less Services"
            : "View All Services";
    });
}

//document.addEventListener("DOMContentLoaded", loadServiceData);