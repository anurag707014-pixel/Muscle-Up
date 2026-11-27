const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    menuToggle.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !expanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
    }
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const supportsSpotlight = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
if (supportsSpotlight.matches) {
  document.addEventListener("pointermove", (event) => {
    document.body.style.setProperty("--spotlight-x", `${event.clientX}px`);
    document.body.style.setProperty("--spotlight-y", `${event.clientY}px`);
    document.body.classList.add("has-spotlight");
  }, { passive: true });
}

const dietTabs = document.querySelectorAll("[data-diet]");
const dietTitle = document.querySelector("[data-diet-title]");
const dietDescription = document.querySelector("[data-diet-description]");
const dietPlans = {
  "weight-loss": {
    title: "Weight loss meal ideas",
    description: "Build satisfying meals around vegetables, protein, and filling whole-food carbohydrates. There’s no need to skip the foods you enjoy."
  },
  "weight-gain": {
    title: "Weight gain meal ideas",
    description: "Add nourishing snacks and generous portions of energy-rich foods to meals you already enjoy. Build up gradually and choose what feels manageable."
  },
  muscle: {
    title: "Muscle-building meal ideas",
    description: "Include a variety of protein sources, carbohydrates, and colorful produce across your day to support training and recovery."
  },
  balanced: {
    title: "Balanced meal ideas",
    description: "Aim for a mix of vegetables or fruit, protein, and satisfying carbohydrates. Keep meals flexible and make room for foods you love."
  },
  vegetarian: {
    title: "Vegetarian meal ideas",
    description: "Explore beans, lentils, tofu, eggs, dairy, nuts, and seeds alongside grains and vegetables for varied, satisfying meals."
  }
};

dietTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const plan = dietPlans[tab.dataset.diet];
    if (!plan || !dietTitle || !dietDescription) return;
    dietTabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    dietTitle.textContent = plan.title;
    dietDescription.textContent = plan.description;
  });
});

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = document.querySelector("#contact-status");
    if (status) {
      status.textContent = "Thanks for reaching out! This demo form is ready to connect to your email service.";
      contactForm.reset();
    }
  });
}
