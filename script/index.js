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

// Toggle Dark Mode (Simulé pour cet exemple HTML)
let isDark = true;
function toggleDarkMode() {
  isDark = !isDark;
  const body = document.body;
  const icon = document.getElementById("theme-icon");

  if (!isDark) {
    body.classList.remove("bg-slate-950", "text-white");
    body.classList.add("bg-slate-50", "text-slate-900");
    icon.setAttribute("data-lucide", "moon");
  } else {
    body.classList.remove("bg-slate-50", "text-slate-900");
    body.classList.add("bg-slate-950", "text-white");
    icon.setAttribute("data-lucide", "sun");
  }
  lucide.createIcons();
}
