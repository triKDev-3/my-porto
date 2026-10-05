/* Portfolio renderer — loads data/content.json (+ localStorage override from admin) */

const COLOR_MAP = {
  amber: { bg: "bg-amber-500/10", text: "text-amber-500", dot: "bg-amber-500" },
  purple: { bg: "bg-purple-500/10", text: "text-purple-500", dot: "bg-purple-500" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500", dot: "bg-emerald-500" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-500", dot: "bg-orange-500" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-500", dot: "bg-blue-500" },
  rose: { bg: "bg-rose-500/10", text: "text-rose-500", dot: "bg-rose-500" },
};

let DATA = null;
let currentLang = localStorage.getItem("lang") || "fr";
let isDark = true;
let isMenuOpen = false;

function t(obj) {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[currentLang] || obj.fr || obj.en || "";
}

async function loadContent() {
  const draft = localStorage.getItem("portfolio_draft");
  if (draft) {
    try {
      DATA = JSON.parse(draft);
      return DATA;
    } catch (_) {}
  }
  const res = await fetch("data/content.json?_=" + Date.now());
  DATA = await res.json();
  return DATA;
}

function renderAll() {
  if (!DATA) return;
  const s = DATA.settings || {};
  const p = DATA.profile || {};
  const c = DATA.contact || {};
  const ui = DATA.ui || {};

  document.title = s.siteTitle || document.title;
  const logo = document.getElementById("site-logo");
  if (logo && s.logoPath) logo.src = s.logoPath;

  setText("hero-badge", t(p.badge));
  setText("hero-title", t(p.heroTitle));
  setText("hero-name", p.name);
  setText("hero-desc", t(p.heroDesc));
  setText("about-text", t(p.about));
  setText("available-label", t(s.availableLabel));

  const avail = document.getElementById("available-badge");
  if (avail) avail.style.display = s.available === false ? "none" : "";

  const portrait = document.getElementById("hero-portrait");
  if (portrait && s.portraitPath) {
    portrait.src = s.portraitPath;
    portrait.alt = p.name || "Portrait";
  }
  const aboutImg = document.getElementById("about-image");
  if (aboutImg && s.aboutImagePath) aboutImg.src = s.aboutImagePath;

  setText("btn-projects", t(ui.buttons?.projects));
  setText("btn-contact", t(ui.buttons?.contact));
  setText("btn-cv-label", t(ui.buttons?.cv));
  setText("btn-send", t(ui.buttons?.send));

  const cv = document.getElementById("btn-cv");
  if (cv && s.cvPath) cv.href = s.cvPath;

  setText("sec-about", t(ui.sections?.about));
  setText("sec-skills", t(ui.sections?.skills));
  setText("sec-timeline", t(ui.sections?.timeline));
  setText("sec-education", t(ui.sections?.education));
  setText("sec-experience", t(ui.sections?.experience));
  setText("sec-projects", t(ui.sections?.projects));
  setText("sec-contact", t(ui.sections?.contact));

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key?.startsWith("nav.")) {
      const k = key.split(".")[1];
      el.textContent = t(ui.nav?.[k]) || el.textContent;
    }
  });

  setText("contact-desc", t(c.desc));
  setText("contact-email", c.email);
  setText("contact-phone", c.phone);
  setText("contact-address", c.address);

  const form = document.getElementById("contact-form");
  if (form && s.formspree) form.action = s.formspree;

  const nameIn = document.getElementById("input-name");
  const emailIn = document.getElementById("input-email");
  const msgIn = document.getElementById("input-message");
  if (nameIn) nameIn.placeholder = t(ui.placeholders?.name);
  if (emailIn) emailIn.placeholder = t(ui.placeholders?.email);
  if (msgIn) msgIn.placeholder = t(ui.placeholders?.message);

  renderSocials(c);
  renderSkills(DATA.skills || []);
  renderEducation(DATA.education || []);
  renderExperiences(DATA.experiences || []);
  renderProjects(DATA.projects || []);

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) langBtn.textContent = currentLang === "fr" ? "EN" : "FR";

  if (window.lucide) lucide.createIcons();
  observeReveals();
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value != null) el.textContent = value;
}

function renderSocials(c) {
  const box = document.getElementById("social-links");
  if (!box) return;
  const links = [];
  if (c.github) links.push({ href: c.github, icon: "github", label: "GitHub" });
  if (c.linkedin) links.push({ href: c.linkedin, icon: "linkedin", label: "LinkedIn" });
  if (c.whatsapp) links.push({ href: c.whatsapp, icon: "message-circle", label: "WhatsApp" });
  box.innerHTML = links
    .map(
      (l) =>
        `<a href="${esc(l.href)}" target="_blank" rel="noopener" class="w-11 h-11 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all" aria-label="${esc(l.label)}"><i data-lucide="${l.icon}" class="w-5 h-5"></i></a>`
    )
    .join("");
}

function renderSkills(skills) {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;
  grid.innerHTML = skills
    .map((sk, i) => {
      const col = COLOR_MAP[sk.color] || COLOR_MAP.blue;
      const delay = i ? `delay-${Math.min(i, 3) * 100}` : "";
      const items = (sk.items || [])
        .map(
          (it) =>
            `<li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full ${col.dot}"></span>${esc(it)}</li>`
        )
        .join("");
      return `<div class="reveal-up ${delay} pin-card p-6">
        <div class="p-3 ${col.bg} w-fit rounded-lg ${col.text} mb-4"><i data-lucide="${esc(sk.icon || "code")}"></i></div>
        <h3 class="font-bold text-xl mb-3">${esc(t(sk.title))}</h3>
        <ul class="space-y-2 text-slate-600 dark:text-slate-400 text-sm">${items}</ul>
      </div>`;
    })
    .join("");
}

function renderEducation(list) {
  const box = document.getElementById("education-list");
  if (!box) return;
  box.innerHTML = list
    .map(
      (e) => `<div class="pin-card p-5">
      <p class="font-semibold">${esc(t(e.title))}</p>
      <p class="text-sm text-slate-500 mt-1">${esc(e.place || "")}</p>
      <p class="text-xs text-blue-400 mt-2">${esc(t(e.date) || e.date || "")}</p>
    </div>`
    )
    .join("");
}

function renderExperiences(list) {
  const box = document.getElementById("experience-list");
  if (!box) return;
  box.innerHTML = list
    .map(
      (e) => `<div class="pin-card p-5">
      <p class="font-semibold">${esc(t(e.title))}</p>
      <p class="text-sm text-slate-500 mt-1">${esc(e.place || "")}</p>
      <p class="text-xs text-amber-400 mt-2">${esc(t(e.date) || e.date || "")}</p>
      ${e.description ? `<p class="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">${esc(t(e.description))}</p>` : ""}
    </div>`
    )
    .join("");
}

function renderProjects(list) {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  grid.innerHTML = list
    .map((pr, i) => {
      const delay = i ? `delay-${Math.min(i, 3) * 100}` : "";
      const grad = pr.gradient || "from-blue-500/20 via-purple-500/10";
      const tags = (pr.tags || []).map((tg) => `<span class="chip">${esc(tg)}</span>`).join("");
      const link = pr.link
        ? `<a href="${esc(pr.link)}" target="_blank" rel="noopener" class="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-blue-600 transition-all" aria-label="${esc(pr.name)}"><i data-lucide="external-link" class="w-4 h-4"></i></a>`
        : "";
      return `<article class="reveal-up ${delay} group pin-card flex flex-col overflow-hidden">
        <div class="h-44 bg-gradient-to-br ${esc(grad)} to-zinc-900 flex items-center justify-center relative">
          <i data-lucide="${esc(pr.icon || "folder")}" class="w-14 h-14 text-white/50 group-hover:scale-110 transition-transform duration-500"></i>
          <span class="absolute top-3 left-3 text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/10 backdrop-blur text-white/80 border border-white/10">${esc(t(pr.type))}</span>
        </div>
        <div class="p-5 flex flex-col flex-1">
          <h3 class="text-lg font-semibold tracking-tight mb-2">${esc(pr.name)}</h3>
          <p class="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-5 flex-1">${esc(t(pr.description))}</p>
          <div class="flex items-center justify-between mt-auto gap-2">
            <div class="flex flex-wrap gap-1.5">${tags}</div>
            ${link}
          </div>
        </div>
      </article>`;
    })
    .join("");
}

function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function observeReveals() {
  const els = document.querySelectorAll(".reveal, .reveal-up, .reveal-left, .reveal-right");
  const obs = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => {
    el.classList.remove("active");
    obs.observe(el);
  });
}

function toggleDarkMode() {
  isDark = !isDark;
  const html = document.documentElement;
  const icon = document.getElementById("theme-icon");
  if (!isDark) {
    html.classList.remove("dark");
    icon?.setAttribute("data-lucide", "moon");
  } else {
    html.classList.add("dark");
    icon?.setAttribute("data-lucide", "sun");
  }
  if (window.lucide) lucide.createIcons();
}

function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;
  const menu = document.getElementById("mobile-menu");
  const icon = document.getElementById("menu-icon");
  if (isMenuOpen) {
    menu?.classList.remove("hidden");
    menu?.classList.add("block");
    icon?.setAttribute("data-lucide", "x");
  } else {
    menu?.classList.remove("block");
    menu?.classList.add("hidden");
    icon?.setAttribute("data-lucide", "menu");
  }
  if (window.lucide) lucide.createIcons();
}

function toggleLanguage() {
  currentLang = currentLang === "fr" ? "en" : "fr";
  localStorage.setItem("lang", currentLang);
  renderAll();
}

window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  if (window.scrollY > 50) {
    nav.classList.add("glass-nav", "py-3");
    nav.classList.remove("py-6");
  } else {
    nav.classList.remove("glass-nav", "py-3");
    nav.classList.add("py-6");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
  try {
    await loadContent();
    renderAll();
  } catch (e) {
    console.error("Content load failed", e);
  }
  if (window.lucide) lucide.createIcons();
});
