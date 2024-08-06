document.addEventListener('DOMContentLoaded', function () {
    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Slide change interval in milliseconds

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function initSlider() {
        showSlide(currentSlide);
        setInterval(nextSlide, slideInterval); // Change slide every 5 seconds
    }

    initSlider();

    // Scroll to top button functionality
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.classList.add('scroll-to-top');
    scrollToTopButton.innerHTML = '<i class="fa fa-chevron-up"></i>'; // Font Awesome icon
    document.body.appendChild(scrollToTopButton);

    function toggleScrollToTopButton() {
        if (window.scrollY > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleScrollToTopButton);

    scrollToTopButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

