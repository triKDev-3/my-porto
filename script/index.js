// Initialisation des icônes Lucide
lucide.createIcons();

// Gestion du scroll pour la barre de navigation
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (window.scrollY > 50) {
    nav.classList.add("glass-nav", "py-3");
    nav.classList.remove("py-6");
  } else {
    nav.classList.remove("glass-nav", "py-3");
    nav.classList.add("py-6");
  }
});

// Toggle Dark Mode - utilise darkMode:'class' de Tailwind
let isDark = true;
function toggleDarkMode() {
  isDark = !isDark;
  const html = document.documentElement;
  const icon = document.getElementById("theme-icon");

  if (!isDark) {
    html.classList.remove("dark");
    icon.setAttribute("data-lucide", "moon");
  } else {
    html.classList.add("dark");
    icon.setAttribute("data-lucide", "sun");
  }
  lucide.createIcons();
}

// Toggle Mobile Menu
let isMenuOpen = false;
function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;
  const menu = document.getElementById("mobile-menu");
  const icon = document.getElementById("menu-icon");

  if (isMenuOpen) {
    menu.classList.remove("hidden");
    menu.classList.add("block");
    icon.setAttribute("data-lucide", "x");
  } else {
    menu.classList.remove("block");
    menu.classList.add("hidden");
    icon.setAttribute("data-lucide", "menu");
  }
  lucide.createIcons();
}

// Animation au scroll
const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach((el) => {
  revealObserver.observe(el);
});

// Automatisation de l'année du copyright
document.getElementById('current-year').textContent = new Date().getFullYear();
