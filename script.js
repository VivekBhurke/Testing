let currentIndex = 0;
let intervalId;

function showSlide(index) {
    const items = document.querySelectorAll('.carousel-item');
    items.forEach((item, i) => {
        item.style.transform = `translateX(${-100 * index}%)`;
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
    intervalId = setInterval(nextSlide, 5000); // Change slide every 3 seconds (adjust the interval as needed)
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
});
