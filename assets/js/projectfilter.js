function initProjectFilters(container = document) {
    const filterButtons = container.querySelectorAll('#project-filters button');
    const items = container.querySelectorAll('.project-item');

    if (!filterButtons.length || !items.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            items.forEach(item => {
                if (filter === '*' || item.dataset.category === filter) {
                    item.style.display = '';
                    item.classList.add('animate__animated', 'animate__fadeIn');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Optional: automatically initialize for the main document
document.addEventListener('DOMContentLoaded', () => {
    initProjectFilters();
});
