document.addEventListener("DOMContentLoaded", () => {
    const sliderData = [
        {type: 'image', src: './assets/images/image1.jpg'},
        {type: 'image', src: './assets/images/image2.png'},
        {type: 'image', src: './assets/images/image3.jpg'},
        {type: 'image', src: './assets/images/image4.jpg'},
    ];

    const sliderContainer = document.querySelector('.hero-slider');

    if (!sliderContainer) return;

    if (sliderData.length === 0) {
        sliderContainer.classList.add('hidden');
        return;
    }

    // Build slides
    sliderData.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        if (index === 0) slide.classList.add('active');

        if (item.type === 'image' || item.type === 'gif') {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = `Slide ${index + 1}`;
            slide.appendChild(img);
        } else if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = item.src;
            video.muted = true;
            video.playsInline = true;
            video.autoplay = false;
            slide.appendChild(video);
        }

        sliderContainer.appendChild(slide);
    });

    const slides = document.querySelectorAll('.hero-slider .slide');
    let current = 0;

    function showSlide(nextIndex) {
        const currentSlide = slides[current];
        const nextSlide = slides[nextIndex];

        // Move current slide out to left
        currentSlide.classList.remove('active');
        currentSlide.classList.add('prev');

        // Move next slide in from right
        nextSlide.classList.remove('prev');
        nextSlide.classList.add('active');

        const media = sliderData[nextIndex];
        if (media.type === 'video') {
            const video = nextSlide.querySelector('video');
            if (video) {
                video.currentTime = 0;
                video.play();
                video.onended = () => nextSlideFunc();
            }
        } else {
            setTimeout(() => {
                nextSlideFunc();
            }, 3000);
        }

        current = nextIndex;
    }

    function nextSlideFunc() {
        const next = (current + 1) % slides.length;
        showSlide(next);
    }

    // Start slider
    showSlide(current);
});
