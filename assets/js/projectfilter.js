function initProjectFilters(container = document) {
    const buttons = container.querySelectorAll("#project-filters button");
    if (!buttons.length) return;

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            const items = container.querySelectorAll(".project-item");

            items.forEach(item => {
                if (filter === "*" || item.dataset.category === filter) {
                    item.style.display = "";
                } else {
                    item.style.display = "none";
                }
            });

            // 🔑 VERY IMPORTANT
            if (window.refreshProjectsToggle) {
                window.refreshProjectsToggle();
            }
        });
    });
}
