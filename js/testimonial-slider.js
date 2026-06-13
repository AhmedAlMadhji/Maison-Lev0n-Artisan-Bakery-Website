export function initTestimonialSlider() {
  const track = document.getElementById("slider-track");
  const slides = track ? [...track.querySelectorAll(".slider__slide")] : [];
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");
  const dotsContainer = document.getElementById("slider-dots");

  if (!slides.length || !dotsContainer) return;

  let current = 0;
  let autoplayTimer = null;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "slider__dot" + (i === 0 ? " is-active" : "");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = [...dotsContainer.querySelectorAll(".slider__dot")];

  function goTo(index) {
    slides[current].classList.remove("is-active");
    slides[current].setAttribute("aria-hidden", "true");
    dots[current].classList.remove("is-active");

    current = (index + slides.length) % slides.length;

    slides[current].classList.add("is-active");
    slides[current].setAttribute("aria-hidden", "false");
    dots[current].classList.add("is-active");
  }

  function next() {
    goTo(current + 1);
  }

  function prev() {
    goTo(current - 1);
  }

  prevBtn?.addEventListener("click", () => {
    prev();
    resetAutoplay();
  });

  nextBtn?.addEventListener("click", () => {
    next();
    resetAutoplay();
  });

  function startAutoplay() {
    if (reducedMotion) return;
    autoplayTimer = setInterval(next, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  startAutoplay();
}
