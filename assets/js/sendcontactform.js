const EMAILJS_USER_ID = 'bf7Dsy4ovPLzM6CHc';
const EMAILJS_SERVICE_ID = 'service_d8nsbz9';
const ADMIN_TEMPLATE_ID = 'template_jr8qf8h';
const CUSTOMER_TEMPLATE_ID = 'template_hkzges3';

// Init EmailJS
emailjs.init(EMAILJS_USER_ID);

let contactFormInitialized = false;

function initContactForm(container) {
    if (contactFormInitialized) return;
    contactFormInitialized = true;

    const form = container.querySelector('#contactForm');
    const successMsg = container.querySelector('#successMsg');

    if (!form || !successMsg) return;

    let isSubmitting = false;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (isSubmitting) return;
        isSubmitting = true;

        const now = new Date();

        const commonParams = {
            fullName: form.fullName.value,
            email: form.email.value,
            phone: form.phone.value,
            projectType: form.projectType.value,
            location: form.location.value,
            budget: form.budget.value,
            startTime: form.startTime.value,
            referral: form.referral.value,
            message: form.message.value,
            submissionDate: now.toLocaleDateString(),
            submissionTime: now.toLocaleTimeString(),
            submissionDateTime: `${now.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })} ${now.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }).replace(' ', '')}`
        };

        // =====================
        // 1️⃣ Send Admin Email
        // =====================
        emailjs.send(
            EMAILJS_SERVICE_ID,
            ADMIN_TEMPLATE_ID,
            {
                fullName: commonParams.fullName,
                clientEmail: commonParams.email,
                phone: commonParams.phone,
                projectType: commonParams.projectType,
                location: commonParams.location,
                budget: commonParams.budget,
                startTime: commonParams.startTime,
                referral: commonParams.referral,
                message: commonParams.message,
                submissionDate: commonParams.submissionDate,
                submissionTime: commonParams.submissionTime,
                submissionDateTime: commonParams.submissionDateTime,
                email: 'contact@preranaarchitects.com'            }
        )
            .then(() => {
                // =====================
                // 2️⃣ Send Customer Thank You{{}}
                // =====================
                return emailjs.send(
                    EMAILJS_SERVICE_ID,
                    CUSTOMER_TEMPLATE_ID,
                    {
                        fullName: commonParams.fullName,
                        email: commonParams.email,
                    }
                );
            })
            .then(() => {
                successMsg.style.display = 'block';
                form.reset();
            })
            .catch(err => {
                console.error('Email error:', err);
                alert('Something went wrong. Please try again.');
            })
            .finally(() => {
                isSubmitting = false;
            });
    });
}

// ==============================
// DOM Ready
// ==============================
document.addEventListener('DOMContentLoaded', () => {
    const contactContainer = document.getElementById('contact-us');
    if (!contactContainer) return;

    const observer = new MutationObserver(() => {
        if (contactContainer.querySelector('#contactForm')) {
            initContactForm(contactContainer);
            observer.disconnect();
        }
    });

    observer.observe(contactContainer, { childList: true, subtree: true });
});
