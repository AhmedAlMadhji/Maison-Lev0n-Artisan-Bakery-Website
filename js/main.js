import { initNavigation } from "./navigation.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initProductFilter } from "./product-filter.js";
import { initTestimonialSlider } from "./testimonial-slider.js";
import { initFormValidation } from "./form-validation.js";

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initScrollReveal();
  initProductFilter();
  initTestimonialSlider();
  initFormValidation();
});
