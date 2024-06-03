let currentIndex = 0;

function showSlide(index) {
    const items = document.querySelectorAll('.carousel-item');
    items.forEach((item, i) => {
        item.style.transform = `translateX(${-100 * index}%)`; // Add quotation marks around the value passed to translateX
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

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
});