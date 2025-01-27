document.addEventListener("DOMContentLoaded", function() {
    let slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, 5000); // Change slide every 5 seconds

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Product Slider Manual Controls
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    const productBoxes = document.querySelector('.product-boxes');
    
    let scrollAmount = 0;
    const scrollStep = 300; // Adjust as needed

    prevButton.addEventListener('click', () => {
        scrollAmount -= scrollStep;
        productBoxes.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
        scrollAmount += scrollStep;
        productBoxes.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    });
});

