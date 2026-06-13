export function initFormValidation() {
  const form = document.getElementById("order-form");
  const successEl = document.getElementById("form-success");
  const dateInput = document.getElementById("pickup-date");

  if (!form) return;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (dateInput) {
    dateInput.min = today.toISOString().split("T")[0];
  }

  const fields = {
    firstName: {
      el: document.getElementById("first-name"),
      error: document.getElementById("first-name-error"),
      validate: (v) => (v.trim().length >= 2 ? "" : "Please enter your first name."),
    },
    lastName: {
      el: document.getElementById("last-name"),
      error: document.getElementById("last-name-error"),
      validate: (v) => (v.trim().length >= 2 ? "" : "Please enter your last name."),
    },
    email: {
      el: document.getElementById("email"),
      error: document.getElementById("email-error"),
      validate: (v) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address.",
    },
    phone: {
      el: document.getElementById("phone"),
      error: document.getElementById("phone-error"),
      validate: (v) =>
        v.trim().length >= 8 ? "" : "Please enter a valid phone number.",
    },
    pickupDate: {
      el: dateInput,
      error: document.getElementById("pickup-date-error"),
      validate: (v) => {
        if (!v) return "Please select a pickup date.";
        const selected = new Date(v);
        return selected >= today ? "" : "Pickup date cannot be in the past.";
      },
    },
    pickupTime: {
      el: document.getElementById("pickup-time"),
      error: document.getElementById("pickup-time-error"),
      validate: (v) => (v ? "" : "Please select a time slot."),
    },
    items: {
      el: document.getElementById("items"),
      error: document.getElementById("items-error"),
      validate: (v) =>
        v.trim().length >= 5 ? "" : "Please describe what you'd like to order.",
    },
  };

  function showError(field, message) {
    field.el.classList.toggle("is-invalid", !!message);
    field.el.setAttribute("aria-invalid", message ? "true" : "false");
    if (field.error) field.error.textContent = message;
  }

  Object.values(fields).forEach((field) => {
    if (!field.el) return;
    field.el.addEventListener("blur", () => {
      showError(field, field.validate(field.el.value));
    });
    field.el.addEventListener("input", () => {
      if (field.el.classList.contains("is-invalid")) {
        showError(field, field.validate(field.el.value));
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    Object.values(fields).forEach((field) => {
      if (!field.el) return;
      const message = field.validate(field.el.value);
      showError(field, message);
      if (message) valid = false;
    });

    if (!valid) {
      const firstInvalid = form.querySelector(".is-invalid");
      firstInvalid?.focus();
      return;
    }

    form.querySelector('button[type="submit"]').disabled = true;
    successEl.hidden = false;
    successEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
}
