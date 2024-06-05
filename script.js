let currentIndex = 0;
let intervalId;

function showSlide(index) {
    const items = document.querySelectorAll('.carousel-item');
    items.forEach((item, i) => {
        const transformValue = `translateX(${-100 * index}%)`;
        item.style.transform = transformValue;
        item.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    const items = document.querySelectorAll('.carousel-item');
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
}

function prevSlide() {
    const items = document.querySelectorAll('.carousel-item');
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
}

function startAutoSlide() {
    intervalId = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    clearInterval(intervalId);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);

    // Handle resize event
    window.addEventListener('resize', () => {
        showSlide(currentIndex); // Recalculate position on resize
    });

    startAutoSlide(); // Start automatic slide

    // Stop automatic slide on hover
    const carousel = document.querySelector('.carousel');
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
});
