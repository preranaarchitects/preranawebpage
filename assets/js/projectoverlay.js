function initProjects() {

    const grid = document.getElementById("projects-grid");
    const projectsSection = document.getElementById("projects");
    const projectExpandedThreshold = 9;

    if (!grid || !projectsSection) return;

    const modal = document.getElementById("project-modal");
    const mainImg = document.getElementById("project-modal-main-img");
    const thumbnails = document.getElementById("project-modal-thumbnails");
    const closeBtn = document.querySelector(".project-modal-close");

    Promise.all([
        fetch("../assets/data/project.json").then(r => r.json()),
        fetch("../assets/data/projectoverlay.json").then(r => r.json())
    ]).then(([projectData, overlayData]) => {

        const categoryCounts = {};
        let totalProjects = 0;

        // Count projects
        Object.entries(projectData).forEach(([category, projects]) => {
            categoryCounts[category] = projects.length;
            totalProjects += projects.length;
        });

        // Create project cards (ALL visible)
        Object.entries(projectData).forEach(([category, projects]) => {

            projects.forEach(project => {

                const col = document.createElement("div");
                col.className = "col-sm-6 col-md-4 project-item";
                col.dataset.category = category;
                col.dataset.slug = project.slug;

                col.innerHTML = `
                    <div class="card h-100 project-card">
                        <div class="project-image-wrapper position-relative">
                            <img src="assets/portfolio/${category}/${project.slug}/banner.jpg"
                                 class="img-fluid project-img"
                                 alt="${project.name}" />

                            <a href="#" class="overlay-btn">Explore Project</a>

                            <div class="project-overlay">
                                <h5 class="card-title">${project.name}</h5>
                            </div>
                        </div>
                    </div>
                `;

                grid.appendChild(col);
            });
        });

        // Update filter count bubbles
        const filterButtons = document.querySelectorAll("#project-filters button");

        filterButtons.forEach(btn => {

            const filter = btn.dataset.filter;
            const bubble = btn.querySelector(".count-bubble");

            if (!bubble) return;

            if (filter === "*") {
                bubble.textContent = totalProjects;
            } else {
                bubble.textContent = categoryCounts[filter] || 0;
            }
        });

        // -----------------------------
        // FILTER FUNCTIONALITY
        // -----------------------------

        filterButtons.forEach(btn => {

            // Hide button if projectExpandedThreshold or fewer
            if (visibleItems.length <= projectExpandedThreshold) {
                toggleBtn.style.display = "none";
                return;
            }

            // Show only first projectExpandedThreshold
            visibleItems.forEach((item, index) => {
                if (index >= projectExpandedThreshold) item.classList.add("project-hidden");
            });

                const filter = btn.dataset.filter;

                document.querySelectorAll(".project-item").forEach(item => {

                    if (filter === "*" || item.dataset.category === filter) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }

                });
            });

        });

        // -----------------------------
        // OVERLAY MODAL FUNCTIONALITY
        // -----------------------------

        grid.addEventListener("click", e => {

            if (!e.target.classList.contains("overlay-btn")) return;

            e.preventDefault();

            const card = e.target.closest(".project-item");
            const category = card.dataset.category;
            const slug = card.dataset.slug;

            const images = overlayData?.[category]?.[slug];
            if (!images) return;

            thumbnails.innerHTML = "";

            mainImg.src = `assets/portfolio/${category}/${slug}/${images[0]}`;
            mainImg.alt = `${slug} project`;

            images.forEach((img, index) => {

                const thumb = document.createElement("img");
                thumb.src = `assets/portfolio/${category}/${slug}/${img}`;

                if (index === 0) thumb.classList.add("active");

                thumb.onclick = () => {
                    mainImg.src = thumb.src;

                    thumbnails.querySelectorAll("img")
                        .forEach(x => x.classList.remove("active"));

                    thumb.classList.add("active");
                };

                thumbnails.appendChild(thumb);
            });

            modal.style.display = "block";

        });

        closeBtn.onclick = () => modal.style.display = "none";

        modal.onclick = e => {
            if (e.target === modal) modal.style.display = "none";
        };

    });

}

// Observe dynamic load
const observer = new MutationObserver(() => {

    if (document.getElementById("projects-grid")) {
        initProjects();
        observer.disconnect();
    }

});

observer.observe(document.body, { childList: true, subtree: true });
