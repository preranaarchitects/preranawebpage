async function loadServiceData() {

    const response = await fetch("../assets/data/service.json");
    const serviceData = await response.json();

    const grid = document.getElementById("servicesGrid");
    if (!grid) return;

    grid.innerHTML = "";

    serviceData.forEach((member, index) => {

        const cardWrapper = document.createElement("div");
        cardWrapper.className = "col-md-4";

        // 👉 Hide cards after 3
        if (index >= 3) {
            cardWrapper.classList.add("service-hidden");
        }

        cardWrapper.innerHTML = `
            <div class="service-card p-4 h-100 position-relative">
                <h5 class="fw-bold d-flex align-items-center mb-3">
                    <img class="me-2 service-icon-size"
                         src="${member.imagesrc}"
                         alt="${member.imagealt}">
                    ${member.servicename}
                </h5>
                <p class="text-muted small">
                    ${member.servicedescription}
                </p>
                <a href="#contact-us" 
                   class="text-warning text-decoration-none d-inline-block mt-2">
                   ${member.servicenavigation} →
                </a>
            </div>
        `;

        grid.appendChild(cardWrapper);
    });

    setupToggleButton();
}

function setupToggleButton() {

    const button = document.getElementById("toggleServices");
    const grid = document.getElementById("servicesGrid");

    if (!button || !grid) return;

    button.addEventListener("click", () => {

        const hiddenCards = grid.querySelectorAll(".service-hidden");

        const isExpanded = grid.classList.contains("services-expanded");

        if (isExpanded) {
            // 🔽 SHOW LESS
            hiddenCards.forEach(card => card.style.display = "none");

            grid.classList.remove("services-expanded");
            button.textContent = "View All Services";

            // optional smooth scroll back
            document.getElementById("services")
                .scrollIntoView({ behavior: "smooth" });

        } else {
            // 🔼 SHOW MORE
            hiddenCards.forEach(card => card.style.display = "block");

            grid.classList.add("services-expanded");
            button.textContent = "Show Less Services";
        }
    });
}

document.addEventListener("DOMContentLoaded", loadServiceData);
