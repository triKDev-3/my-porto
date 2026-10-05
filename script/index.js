// Initialisation des icônes Lucide
lucide.createIcons();

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("preloader-hidden");
    }, 500);
  }
});

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

const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealElements.forEach((el) => revealObserver.observe(el));

const currentYearElement = document.getElementById('current-year');
if (currentYearElement) currentYearElement.textContent = new Date().getFullYear();

const translations = {
  fr: {
    "nav-home": "Accueil",
    "nav-about": "Profil",
    "nav-skills": "Compétences",
    "nav-timeline": "Parcours",
    "nav-projects": "Projets",
    "nav-contact": "Contact",
    "hero-badge": "Full-Stack Web & Mobile · Disponible",
    "hero-title": "Salut, je suis",
    "hero-desc": "Développeur Web & Mobile Junior. Je conçois des applications web modernes et des APIs RESTful avec Laravel, associées à des interfaces réactives en JavaScript / React.",
    "hero-btn-projects": "Voir mes projets",
    "hero-btn-contact": "Me contacter",
    "hero-btn-cv": "Mon CV",
    "about-title": "À Propos",
    "about-text": "Développeur Web & Mobile Junior passionné et rigoureux, titulaire du BTS en Développement d'Applications (soutenance en cours). Fort d'une expérience pratique en entreprise, je conçois des applications web modernes et des APIs RESTful performantes avec PHP et Laravel, associées à des interfaces réactives en JavaScript. Motivé et méthodique, je mets ma réactivité au service de projets digitaux ambitieux.",
    "skills-title": "Mes Compétences",
    "skills-frontend": "Frontend",
    "skills-backend": "Backend & APIs",
    "skills-db": "Base de données",
    "skills-tools": "Outils & Langues",
    "parcours-title": "Parcours",
    "parcours-edu": "Formations",
    "parcours-edu-dev": "Développement d'applications",
    "parcours-date-dev": "2023 - 2025",
    "parcours-edu-bac": "Baccalauréat Scientifique",
    "parcours-date-bac": "2021",
    "parcours-exp": "Expériences",
    "parcours-job-intern": "Stagiaire Développeur Web & Mobile",
    "parcours-date-intern": "Nov. 2025 - Févr. 2026",
    "parcours-job-secretary": "Secrétaire Bureautique",
    "parcours-date-secretary": "Oct. 2024 - Déc. 2024",
    "parcours-job-seller": "Promoteur de Ventes",
    "parcours-date-seller": "Août 2023 - Oct. 2023",
    "projects-title": "Mes Projets",
    "project-desc-jc": "Déploiement complet d'un site vitrine moderne pour une marque de stylisme (en ligne).",
    "project-desc-foleni": "Architecture et développement backend d'une API de gestion des files d'attente pour DK-TECH.",
    "project-desc-dktech": "Contribution au développement du site institutionnel de la plateforme tech DK-TECH.",
    "contact-title": "Me Contacter",
    "contact-subtitle": "Entrons en discussion !",
    "contact-desc": "N'hésitez pas à me contacter pour toute question, projet de développement ou opportunité professionnelle.",
    "contact-btn": "Envoyer",
    "placeholder-name": "Nom",
    "placeholder-email": "Email",
    "placeholder-message": "Message"
  },
  en: {
    "nav-home": "Home",
    "nav-about": "Profile",
    "nav-skills": "Skills",
    "nav-timeline": "Experience",
    "nav-projects": "Projects",
    "nav-contact": "Contact",
    "hero-badge": "Full-Stack Web & Mobile · Available",
    "hero-title": "Hi, I am",
    "hero-desc": "Junior Web & Mobile developer. I build modern web apps and RESTful APIs with Laravel, paired with reactive interfaces in JavaScript / React.",
    "hero-btn-projects": "View my projects",
    "hero-btn-contact": "Contact me",
    "hero-btn-cv": "My CV",
    "about-title": "About Me",
    "about-text": "Passionate and rigorous Junior Web & Mobile developer, holding a BTS in Application Development (thesis in progress). With hands-on company experience, I design modern web applications and high-performance RESTful APIs with PHP and Laravel, paired with reactive JavaScript interfaces. Motivated and methodical, I bring reactivity to ambitious digital projects.",
    "skills-title": "My Skills",
    "skills-frontend": "Frontend",
    "skills-backend": "Backend & APIs",
    "skills-db": "Database",
    "skills-tools": "Tools & Languages",
    "parcours-title": "Career Path",
    "parcours-edu": "Education",
    "parcours-edu-dev": "Application Development",
    "parcours-date-dev": "2023 - 2025",
    "parcours-edu-bac": "Scientific Baccalaureate",
    "parcours-date-bac": "2021",
    "parcours-exp": "Experience",
    "parcours-job-intern": "Web & Mobile Developer Intern",
    "parcours-date-intern": "Nov. 2025 - Feb. 2026",
    "parcours-job-secretary": "Office Secretary",
    "parcours-date-secretary": "Oct. 2024 - Dec. 2024",
    "parcours-job-seller": "Sales Promoter",
    "parcours-date-seller": "Aug. 2023 - Oct. 2023",
    "projects-title": "My Projects",
    "project-desc-jc": "Full deployment of a modern showcase website for a fashion brand (live).",
    "project-desc-foleni": "Architecture and backend development of a queue management API for DK-TECH.",
    "project-desc-dktech": "Contribution to the institutional website of the DK-TECH tech platform.",
    "contact-title": "Contact Me",
    "contact-subtitle": "Let's talk!",
    "contact-desc": "Feel free to reach out for questions, development projects or professional opportunities.",
    "contact-btn": "Send",
    "placeholder-name": "Full Name",
    "placeholder-email": "Email Address",
    "placeholder-message": "Your Message"
  }
};

let currentLang = localStorage.getItem('lang') || 'fr';

function updateLanguage() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[currentLang][key]) {
      el.setAttribute('placeholder', translations[currentLang][key]);
    }
  });
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.textContent = currentLang === 'fr' ? 'EN' : 'FR';
  localStorage.setItem('lang', currentLang);
}

function toggleLanguage() {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  updateLanguage();
}

document.addEventListener('DOMContentLoaded', () => {
  updateLanguage();
});
