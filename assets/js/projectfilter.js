function initProjectFilters(container = document) {
    const filterButtons = container.querySelectorAll('#project-filters button');

    if (!filterButtons.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            // Re-select items each time (for dynamic cards)
            const items = container.querySelectorAll('.project-item');

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
