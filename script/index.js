// Initialisation des icônes Lucide
lucide.createIcons();

// Gestion du préchargeur (Preloader)
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    // Petit délai pour une transition plus fluide
    setTimeout(() => {
      preloader.classList.add("preloader-hidden");
    }, 500);
  }
});

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
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) currentYearElement.textContent = new Date().getFullYear();

// --- SYSTÈME DE TRADUCTION ---

const translations = {
  fr: {
    "nav-home": "Accueil",
    "nav-about": "Profil",
    "nav-skills": "Compétences",
    "nav-timeline": "Parcours",
    "nav-projects": "Projets",
    "nav-contact": "Contact",
    "hero-badge": "Développeur passionné prêt pour de nouveaux défis",
    "hero-title": "Salut, je suis",
    "hero-desc": "Développeur d'applications, j'allie créativité et sens de l'analyse pour concevoir des solutions technologiques efficaces et sur mesure.",
    "hero-btn-projects": "Voir mes projets",
    "hero-btn-contact": "Me contacter",
    "hero-btn-cv": "Mon CV",
    "about-title": "À Propos",
    "about-text": "Passionné par le développement d'applications et fort d'une formation scientifique, j'allie créativité et sens de l'analyse pour concevoir des solutions efficaces. Doté d'un bon esprit d'initiative et d'une grande capacité d'apprentissage, je souhaite intégrer une entreprise stimulante où je pourrai continuer à progresser tout en apportant une réelle valeur ajoutée.",
    "skills-title": "Mes Compétences",
    "skills-frontend": "Frontend",
    "skills-backend": "Backend & Logiciel",
    "skills-db": "Base de données",
    "skills-tools": "Outils & Langues",
    "parcours-title": "Parcours",
    "parcours-edu": "Formations",
    "parcours-edu-dev": "Développement d'applications",
    "parcours-date-dev": "2023 - 2025",
    "parcours-edu-bac": "Baccalauréat Scientifique",
    "parcours-date-bac": "2021",
    "parcours-exp": "Expériences",
    "parcours-job-intern": "Stagiaire Développeur",
    "parcours-date-intern": "Nov. 2025 - Févr. 2026",
    "parcours-job-secretary": "Secrétaire bureautique",
    "parcours-date-secretary": "Oct. 2024 - Déc. 2024",
    "parcours-job-seller": "Vendeur",
    "parcours-date-seller": "Août 2023 - Oct. 2023",
    "projects-title": "Mes Projets",
    "project-type-web": "Application Web",
    "project-type-site": "Site Entreprise",
    "project-type-desktop": "Logiciel Bureau",
    "project-name-deliv": "Service de Livraison",
    "project-name-stock": "Gestion de Stock (Adokpoto)",
    "project-desc-dktech": "Site officiel de DK-TECH, entreprise de solutions informatiques (web, logiciel, etc.) basée à Lomé.",
    "project-desc-deliv": "Application desktop permettant la gestion des expéditions et le suivi des livraisons de colis.",
    "project-desc-stock": "Plateforme web de gestion d'inventaire, d'approvisionnement et de facturation d'articles.",
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
    "hero-badge": "Passionate developer ready for new challenges",
    "hero-title": "Hi, I am",
    "hero-desc": "Application developer, I combine creativity and analytical skills to design effective and tailor-made technological solutions.",
    "hero-btn-projects": "View my projects",
    "hero-btn-contact": "Contact me",
    "hero-btn-cv": "My CV",
    "about-title": "About Me",
    "about-text": "Passionate about application development and with a scientific background, I combine creativity and analytical skills to design effective solutions. With a good spirit of initiative and a great capacity for learning, I wish to join a stimulating company where I can continue to progress while bringing real added value.",
    "skills-title": "My Skills",
    "skills-frontend": "Frontend",
    "skills-backend": "Backend & Software",
    "skills-db": "Database",
    "skills-tools": "Tools & Languages",
    "parcours-title": "Career Path",
    "parcours-edu": "Education",
    "parcours-edu-dev": "Application Development",
    "parcours-date-dev": "2023 - 2025",
    "parcours-edu-bac": "Scientific Baccalaureate",
    "parcours-date-bac": "2021",
    "parcours-exp": "Experiences",
    "parcours-job-intern": "Developer Intern",
    "parcours-date-intern": "Nov. 2025 - Feb. 2026",
    "parcours-job-secretary": "Office Secretary",
    "parcours-date-secretary": "Oct. 2024 - Dec. 2024",
    "parcours-job-seller": "Salesperson",
    "parcours-date-seller": "Aug. 2023 - Oct. 2023",
    "projects-title": "My Projects",
    "project-type-web": "Web Application",
    "project-type-site": "Company Site",
    "project-type-desktop": "Desktop Software",
    "project-name-deliv": "Delivery Service",
    "project-name-stock": "Inventory Management (Adokpoto)",
    "project-desc-dktech": "Official site of DK-TECH, IT solutions company (web, software, etc.) based in Lomé.",
    "project-desc-deliv": "Desktop application for shipment management and parcel delivery tracking.",
    "project-desc-stock": "Web platform for inventory management, supply and item invoicing.",
    "contact-title": "Contact Me",
    "contact-subtitle": "Let's talk!",
    "contact-desc": "Don't hesitate to contact me for any questions, development projects or professional opportunities.",
    "contact-btn": "Send",
    "placeholder-name": "Full Name",
    "placeholder-email": "Email Address",
    "placeholder-message": "Your Message"
  }
};

let currentLang = localStorage.getItem('lang') || 'fr';

function updateLanguage() {
  // Traduction du texte
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });

  // Traduction des placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[currentLang][key]) {
      el.setAttribute('placeholder', translations[currentLang][key]);
    }
  });

  // Mise à jour du bouton
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.textContent = currentLang === 'fr' ? 'EN' : 'FR';
  }
  
  // Sauvegarde
  localStorage.setItem('lang', currentLang);
}

function toggleLanguage() {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  updateLanguage();
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
  updateLanguage();
});
