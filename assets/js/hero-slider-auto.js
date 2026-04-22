// Custom JavaScript for auto-advancing the hero slider

(function () {
  // Wait for the DOM to be fully loaded and a bit more for initialization
  document.addEventListener("DOMContentLoaded", function () {
    // Small delay to ensure sliders are initialized
    setTimeout(function () {
      // Find all hero sliders on the page
      const heroSliders = document.querySelectorAll(".docmd-hero.hero-slider");

      heroSliders.forEach(function (hero) {
        const nextBtn = hero.querySelector(".hero-slider-next");

        if (nextBtn) {
          // Auto-advance every 5 seconds
          setInterval(function () {
            nextBtn.click();
          }, 5000);
        }
      });
    }, 100); // 100ms delay
  });
})();
