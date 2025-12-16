function initHeroSlider(container) {
    // Slider data
    const sliderData = [
        { type: 'video', src: './assets/images/video-build.mp4', poster: './assets/images/video-build.jpg' },
        { type: 'video', src: './assets/images/video-living-area.mp4', poster: './assets/images/video-living-area.jpg' },
        { type: 'video', src: './assets/images/video-staircase.mp4', poster: './assets/images/video-staircase.jpg' },
    ];


    // SEO-friendly hero text for each video
    const heroText = {
        './assets/images/video-build.mp4': {
            h1: 'Construction of Modern Residential Spaces',
            p: 'Expert architectural design and building solutions in Bangalore.'
        },
        './assets/images/video-living-area.mp4': {
            h1: 'Modern Living Area Interiors',
            p: 'Creative interior design and 3D modeling for luxurious homes.'
        },
        './assets/images/video-staircase.mp4': {
            h1: 'Contemporary Staircase Designs',
            p: 'Functional and aesthetic staircase solutions for villas and apartments.'
        }
    };

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
            video.autoplay = false;

            // Poster image for SEO / UX
            //video.poster = item.src.replace('.mp4', '.jpg');

            slide.appendChild(video);

            // Hidden description for SEO / screen readers
            const description = document.createElement('p');
            description.classList.add('sr-only');
            description.textContent = heroText[item.src] ? heroText[item.src].p : '';
            slide.appendChild(description);
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

        // Update hero text dynamically
        if(heroText[media.src]){
            const textData = heroText[media.src];
            const h1 = heroContent.querySelector('h1');
            const p = heroContent.querySelector('p');
            if(h1) h1.textContent = textData.h1;
            if(p) p.textContent = textData.p;
        }

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

    // Initialize slider
    showSlide(current);
}
