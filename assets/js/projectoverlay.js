function initProjects() {

    const grid = document.getElementById("projects-grid");
    if (!grid) return; // safety

    const modal = document.getElementById("project-modal");
    const mainImg = document.getElementById("project-modal-main-img");
    const thumbnails = document.getElementById("project-modal-thumbnails");
    const closeBtn = document.querySelector(".project-modal-close");

    Promise.all([
        fetch("assets/data/project.json").then(r => r.json()),
        fetch("assets/data/projectoverlay.json").then(r => r.json())
    ]).then(([projectData, overlayData]) => {

        // BUILD CARDS
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
             alt="${project.name}">

        <!-- Button shows only on hover -->
        <a href="#" class="overlay-btn">View Full Project</a>
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

        // OVERLAY CLICK
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
        modal.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

    });
}

// 🔑 WAIT until projects.html is injected
const observer = new MutationObserver(() => {
    if (document.getElementById("projects-grid")) {
        initProjects();
        observer.disconnect();
    }
});

observer.observe(document.body, { childList: true, subtree: true });
