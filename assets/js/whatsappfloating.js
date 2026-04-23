function initWhatsAppButton(container) {

    const floatingContainer = container.querySelector("#floatingContainer");
    const whatsappBtn = container.querySelector("#whatsappBtn");
    const callBtn = container.querySelector("#callBtn");

    const phoneNumber = "+919000969061";

    // Slide-in after load
    setTimeout(() => {
        floatingContainer.classList.add("show");
    }, 100);

    // Clicks
    whatsappBtn.addEventListener("click", () => {
        window.open(`https://wa.me/${phoneNumber}`, "_blank");
    });

    callBtn.addEventListener("click", () => {
        window.location.href = `tel:${phoneNumber}`;
    });

    // Scroll Hide / Show
    let lastScroll = window.scrollY;
    let isHidden = false;

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        if (currentScroll - lastScroll > 10 && currentScroll > 150) {
            if (!isHidden) {
                floatingContainer.classList.add("hide");
                isHidden = true;
            }
        } else if (lastScroll - currentScroll > 10) {
            if (isHidden) {
                floatingContainer.classList.remove("hide");
                isHidden = false;
            }
        }
        lastScroll = currentScroll;
    });
}
