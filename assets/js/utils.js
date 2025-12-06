// Automatically update footer year
document.addEventListener('DOMContentLoaded', function () {
    // Set year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Project filters
    const filterButtons = document.querySelectorAll('#project-filters button');
    const items = document.querySelectorAll('.project-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function(){
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            items.forEach(item => {
                if(filter === '*' || item.dataset.category === filter) {
                    item.style.display = '';
                    item.classList.add('animate__animated','animate__fadeIn');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Simple contact form validation + AJAX submission (Formspree example)
    const form = document.getElementById('contactForm');
    const resultEl = document.getElementById('formResult');

    form.addEventListener('submit', async function(e){
        e.preventDefault();
        // Bootstrap validation classes
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        resultEl.textContent = 'Sending…';
        resultEl.className = 'text-muted';

        // Gather form data
        const data = new FormData(form);
        // For Formspree: set action URL (replace below with your endpoint)
        const endpoint = 'https://formspree.io/f/YOUR_FORM_ID'; // <- replace

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: data
            });
            if (res.ok) {
                resultEl.textContent = 'Thank you — your request has been sent. We will contact you shortly.';
                resultEl.className = 'text-success';
                form.reset();
                form.classList.remove('was-validated');
            } else {
                const json = await res.json();
                resultEl.textContent = json?.error || 'There was a problem submitting the form. Try again later.';
                resultEl.className = 'text-danger';
            }
        } catch (err) {
            console.error(err);
            resultEl.textContent = 'Network error — please try again later.';
            resultEl.className = 'text-danger';
        }
    });

});
