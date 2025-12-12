function initHeroSlider(container) {
    const sliderData = [
        { type: 'video', src: './assets/images/video-build.mp4' },
        { type: 'video', src: './assets/images/video-living-area.mp4' },
        { type: 'video', src: './assets/images/video-staircase.mp4' },
    ];

    const sliderContainer = container.querySelector('.hero-slider');
    const heroContent = container.querySelector('.hero-content');
    if (!sliderContainer || !heroContent) return;

    sliderContainer.innerHTML = ''; // clear any previous content

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
            video.autoplay = false; // we control via JS
            slide.appendChild(video);
        }

        sliderContainer.appendChild(slide);
    });

    const slides = sliderContainer.querySelectorAll('.slide');
    let current = 0;
    let slideTimeout;

    function showSlide(nextIndex) {
        if (slideTimeout) clearTimeout(slideTimeout);

        const currentSlide = slides[current];
        const nextSlide = slides[nextIndex];

        currentSlide.classList.remove('active');
        currentSlide.classList.add('prev');

        nextSlide.classList.remove('prev');
        nextSlide.classList.add('active');

        heroContent.style.zIndex = 2;

        const media = sliderData[nextIndex];
        if (media.type === 'video') {
            const video = nextSlide.querySelector('video');
            if (video) {
                video.currentTime = 0;
                video.play().catch(e => console.log("Video autoplay blocked:", e));
                video.onended = () => nextSlideFunc();
            }
        } else {
            slideTimeout = setTimeout(() => nextSlideFunc(), 3000);
        }

        current = nextIndex;
    }

    function nextSlideFunc() {
        const next = (current + 1) % slides.length;
        showSlide(next);
    }

    // Initialize
    showSlide(current);
}
