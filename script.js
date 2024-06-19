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
    intervalId = setInterval(nextSlide, 3000); // Change slide every 3 seconds
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



// document.addEventListener("DOMContentLoaded", function () {
//     const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
//     const mobileMenu = document.querySelector('nav ul');

//     mobileMenuToggle.addEventListener('click', function () {
//         this.classList.toggle('open');
//         mobileMenu.classList.toggle('show');
//     });
// });

  








// For form handling:   
document.addEventListener('DOMContentLoaded', () => {
  // Initialize carousel, parallax, and testimonials as before...

  // Form handling for the FAQ form
  const faqForm = document.querySelector('.faq-form form');
  const faqEmailInput = faqForm.querySelector('input[name="email"]');
  const faqThankYouModal = document.getElementById('thankYouModal');
  const faqCloseModalButton = document.getElementById('closeModalButton');

  faqForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Display thank you modal immediately
      faqThankYouModal.classList.add('show'); // Assuming modal has a "show" class for visibility

      // Get current date and time
      const formattedDateTime = new Date().toLocaleString();

      // Get device type (optional)
      const deviceType = getUserDeviceType();

      const email = faqEmailInput.value.trim();
      const allowedDomains = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];

      // Basic email format validation (optional)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
          alert('Please enter a valid email address.');
          return; // Prevent form submission
      }

      const domain = email.split('@')[1].toLowerCase();
      if (!allowedDomains.includes(domain)) {
          alert('Please enter an email address with a valid domain (Gmail, Hotmail, Yahoo, or Outlook).');
          return; // Prevent form submission
      }

      // Create a FormData object with additional data
      const formData = new FormData(faqForm);
      formData.append("Date-Time", formattedDateTime);
      formData.append("Device", deviceType || "Unknown"); // Set default if device type unavailable

      fetch('data.xlsx', { method: 'POST', body: formData })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Form submission failed'); // Handle non-200 status codes gracefully
              }
              return response.text(); // Or handle response data as needed
          })
          .then(() => {
              // Clear form fields after successful submission
              faqForm.reset();
          })
          .catch(error => console.error('Error!', error.message));

      // Optional: Additional handling after successful submission (e.g., reset modal)
  });

  // Functionality for close button
  if (faqCloseModalButton) {
      faqCloseModalButton.addEventListener('click', () => {
          faqThankYouModal.classList.remove('show');
      });
  }
});

// Function to detect device type (optional, replace with your implementation)
function getUserDeviceType() {
  const ua = navigator.userAgent.toLowerCase(); // Ensure case-insensitivity

  const mobileRegex = {
      android: /android/i,
      iphone: /(iphone|ipod)/i,
      ipad: /ipad/i,
      blackberry: /blackberry/i,
      ieMobile: /iemobile/i,
      operaMini: /opera mini/i,
  };

  // Check for mobile devices in priority order (more specific first)
  for (const deviceType in mobileRegex) {
      if (mobileRegex[deviceType].test(ua)) {
          return deviceType;
      }
  }

  // If no mobile device is detected, return "Desktop"
  return "Desktop";
}
