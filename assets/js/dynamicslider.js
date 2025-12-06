document.addEventListener("DOMContentLoaded", () => {
    const sliderData = [
        { type: 'video', src: './assets/images/video1.mp4' },
        { type: 'image', src: './assets/images/image1.jpg' },
        { type: 'image', src: './assets/images/image2.jpg' },
        { type: 'image', src: './assets/images/image3.jpg' },
        { type: 'image', src: './assets/images/image4.jpg' },
        { type: 'image', src: './assets/images/image5.jpg' },
        { type: 'image', src: './assets/images/image6.jpg' }
    ];

    const sliderContainer = document.querySelector('.hero-slider');
    const heroContent = document.querySelector('.hero-content');

    if (!sliderContainer || !heroContent) return;

    if (sliderData.length === 0) {
        sliderContainer.classList.add('d-none'); // Bootstrap-friendly
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
    let slideTimeout;

    function showSlide(nextIndex) {
        // Clear previous timeout to prevent overlapping
        if (slideTimeout) clearTimeout(slideTimeout);

        const currentSlide = slides[current];
        const nextSlide = slides[nextIndex];

        currentSlide.classList.remove('active');
        currentSlide.classList.add('prev');

        nextSlide.classList.remove('prev');
        nextSlide.classList.add('active');

        // Make sure hero content stays on top
        heroContent.style.zIndex = 2;

        const media = sliderData[nextIndex];
        if (media.type === 'video') {
            const video = nextSlide.querySelector('video');
            if (video) {
                video.currentTime = 0;
                video.play();
                video.onended = () => nextSlideFunc();
            }
        } else {
            slideTimeout = setTimeout(() => {
                nextSlideFunc();
            }, 3000);
        }

        current = nextIndex;
    }

    function nextSlideFunc() {
        const next = (current + 1) % slides.length;
        showSlide(next);
    }

    // Initialize slider
    showSlide(current);

    // Optional: Pause slider on hover for desktop
    //sliderContainer.addEventListener('mouseenter', () => clearTimeout(slideTimeout));
    //sliderContainer.addEventListener('mouseleave', () => nextSlideFunc());
});
