function initProjects() {
    const grid = document.getElementById("projects-grid");
    const toggleBtn = document.getElementById("toggleProjectsBtn");
    const projectsSection = document.getElementById("projects");

    if (!grid || !toggleBtn || !projectsSection) return;

    const modal = document.getElementById("project-modal");
    const mainImg = document.getElementById("project-modal-main-img");
    const thumbnails = document.getElementById("project-modal-thumbnails");
    const closeBtn = document.querySelector(".project-modal-close");

    Promise.all([
        fetch("../assets/data/project.json").then(r => r.json()),
        fetch("../assets/data/projectoverlay.json").then(r => r.json())
    ]).then(([projectData, overlayData]) => {

        let totalProjects = 0;

        Object.entries(projectData).forEach(([category, projects]) => {
            projects.forEach(project => {
                totalProjects++;

                const col = document.createElement("div");
                col.className = "col-sm-6 col-md-4 project-item";
                col.dataset.category = category;
                col.dataset.slug = project.slug;

                col.innerHTML = `
                    <div class="card h-100 project-card">
                        <div class="project-image-wrapper position-relative">
                            <img src="assets/portfolio/${category}/${project.slug}/banner.jpg"
                                 class="img-fluid project-img"
                                 alt="${project.name}">
                            <a href="#" class="overlay-btn">View More Projects</a>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${project.name}</h5>
                            <p class="card-text small text-muted">${project.description}</p>
                        </div>
                    </div>
                `;

                grid.appendChild(col);
            });
        });

        /* ===============================
           SHOW MORE / SHOW LESS LOGIC
        ================================ */
        window.refreshProjectsToggle = function () {
            const allItems = [...document.querySelectorAll(".project-item")];
            const visibleItems = allItems.filter(
                item => item.style.display !== "none"
            );

            // Reset state
            allItems.forEach(item => item.classList.remove("project-hidden"));
            projectsSection.classList.remove("project-expanded");

            // Hide button if 3 or fewer
            if (visibleItems.length <= 3) {
                toggleBtn.style.display = "none";
                return;
            }

            // Collapse to 3
            visibleItems.forEach((item, index) => {
                if (index >= 3) item.classList.add("project-hidden");
            });

            toggleBtn.style.display = "inline-block";
            toggleBtn.textContent = "View More Projects";
        };

        toggleBtn.onclick = () => {
            const expanded = projectsSection.classList.toggle("project-expanded");
            toggleBtn.textContent = expanded
                ? "View Less Projects"
                : "View More Projects";

            if (!expanded) {
                window.refreshProjectsToggle();
                projectsSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        };

        // Initial setup
        window.refreshProjectsToggle();

        /* ===============================
           PROJECT OVERLAY MODAL
        ================================ */
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

            images.forEach((img, i) => {
                const t = document.createElement("img");
                t.src = `assets/portfolio/${category}/${slug}/${img}`;
                if (i === 0) t.classList.add("active");

                t.onclick = () => {
                    mainImg.src = t.src;
                    thumbnails.querySelectorAll("img").forEach(x => x.classList.remove("active"));
                    t.classList.add("active");
                };

                thumbnails.appendChild(t);
            });

            modal.style.display = "block";
        });

        closeBtn.onclick = () => modal.style.display = "none";
        modal.onclick = e => {
            if (e.target === modal) modal.style.display = "none";
        };
    });
}

const observer = new MutationObserver(() => {
    if (document.getElementById("projects-grid")) {
        initProjects();
        observer.disconnect();
    }
});

observer.observe(document.body, { childList: true, subtree: true });
