document.addEventListener("DOMContentLoaded", () => {
    // Function to attach reload to logo
    function attachLogoReload() {
        const logoLink = document.querySelector('a[href="index.html"]');
        if (logoLink) {
            logoLink.addEventListener("click", (e) => {
                e.preventDefault(); // prevent default navigation
                window.location.href = "index.html"; // reload main URL
            });
        }
    }

    attachLogoReload();
});



document.addEventListener('DOMContentLoaded', function () {
    // Footer year
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // Contact form submission
    const form = document.getElementById('contactForm');
    const resultEl = document.getElementById('formResult');
    if(form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            if (!form.checkValidity()) { form.classList.add('was-validated'); return; }

            resultEl.textContent = 'Sending…';
            resultEl.className = 'text-muted';
            const data = new FormData(form);
            const endpoint = 'https://formspree.io/f/YOUR_FORM_ID';

            try {
                const res = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: data
                });

                if (res.ok) {
                    resultEl.textContent = 'Thank you — your request has been sent.';
                    resultEl.className = 'text-success';
                    form.reset();
                    form.classList.remove('was-validated');
                } else {
                    const json = await res.json();
                    resultEl.textContent = json?.error || 'Error sending form.';
                    resultEl.className = 'text-danger';
                }
            } catch (err) {
                resultEl.textContent = 'Network error — try again later.';
                resultEl.className = 'text-danger';
            }
        });
    }
});
