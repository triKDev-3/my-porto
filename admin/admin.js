let DATA = null;
const AUTH_KEY = "portfolio_admin_auth";
const DRAFT_KEY = "portfolio_draft";

async function init() {
  if (window.lucide) lucide.createIcons();
  if (sessionStorage.getItem(AUTH_KEY) === "1") {
    await bootApp();
  }
  document.getElementById("login-pass")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doLogin();
  });
}

async function loadData() {
  const draft = localStorage.getItem(DRAFT_KEY);
  if (draft) {
    try {
      DATA = JSON.parse(draft);
      return;
    } catch (_) {}
  }
  const res = await fetch("../data/content.json?_=" + Date.now());
  DATA = await res.json();
}

async function bootApp() {
  await loadData();
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  fillForms();
  renderListEditors();
  if (window.lucide) lucide.createIcons();
}

async function doLogin() {
  const pass = document.getElementById("login-pass").value;
  await loadData();
  const expected = DATA?.settings?.adminPassword || "trikdev2026";
  if (pass === expected) {
    sessionStorage.setItem(AUTH_KEY, "1");
    document.getElementById("login-error").classList.add("hidden");
    await bootApp();
  } else {
    document.getElementById("login-error").classList.remove("hidden");
  }
}

function doLogout() {
  sessionStorage.removeItem(AUTH_KEY);
  location.reload();
}

function switchTab(name) {
  document.querySelectorAll(".tab-panel").forEach((p) => p.classList.add("hidden"));
  document.getElementById("tab-" + name)?.classList.remove("hidden");
  document.querySelectorAll(".tab-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === name);
  });
}

function fillForms() {
  const p = DATA.profile || {};
  const s = DATA.settings || {};
  const c = DATA.contact || {};
  setVal("f-name", p.name);
  setVal("f-siteTitle", s.siteTitle);
  setVal("f-role-fr", p.role?.fr);
  setVal("f-role-en", p.role?.en);
  setVal("f-badge-fr", p.badge?.fr);
  setVal("f-badge-en", p.badge?.en);
  setVal("f-heroDesc-fr", p.heroDesc?.fr);
  setVal("f-heroDesc-en", p.heroDesc?.en);
  setVal("f-about-fr", p.about?.fr);
  setVal("f-about-en", p.about?.en);
  setVal("f-email", c.email);
  setVal("f-phone", c.phone);
  setVal("f-address", c.address);
  setVal("f-github", c.github);
  setVal("f-whatsapp", c.whatsapp);
  setVal("f-linkedin", c.linkedin);
  setVal("f-contactDesc-fr", c.desc?.fr);
  setVal("f-contactDesc-en", c.desc?.en);
  setVal("f-cvPath", s.cvPath);
  setVal("f-formspree", s.formspree);
  setVal("f-portrait", s.portraitPath);
  setVal("f-aboutImg", s.aboutImagePath);
  setVal("f-logo", s.logoPath);
  const av = document.getElementById("f-available");
  if (av) av.checked = s.available !== false;
}

function setVal(id, v) {
  const el = document.getElementById(id);
  if (el) el.value = v ?? "";
}

function collectScalar() {
  DATA.profile = DATA.profile || {};
  DATA.settings = DATA.settings || {};
  DATA.contact = DATA.contact || {};
  DATA.profile.name = val("f-name");
  DATA.settings.siteTitle = val("f-siteTitle");
  DATA.profile.role = { fr: val("f-role-fr"), en: val("f-role-en") };
  DATA.profile.badge = { fr: val("f-badge-fr"), en: val("f-badge-en") };
  DATA.profile.heroTitle = DATA.profile.heroTitle || { fr: "Salut, je suis", en: "Hi, I am" };
  DATA.profile.heroDesc = { fr: val("f-heroDesc-fr"), en: val("f-heroDesc-en") };
  DATA.profile.about = { fr: val("f-about-fr"), en: val("f-about-en") };
  DATA.contact.email = val("f-email");
  DATA.contact.phone = val("f-phone");
  DATA.contact.address = val("f-address");
  DATA.contact.github = val("f-github");
  DATA.contact.whatsapp = val("f-whatsapp");
  DATA.contact.linkedin = val("f-linkedin");
  DATA.contact.desc = { fr: val("f-contactDesc-fr"), en: val("f-contactDesc-en") };
  DATA.settings.cvPath = val("f-cvPath");
  DATA.settings.formspree = val("f-formspree");
  DATA.settings.portraitPath = val("f-portrait");
  DATA.settings.aboutImagePath = val("f-aboutImg");
  DATA.settings.logoPath = val("f-logo");
  DATA.settings.available = document.getElementById("f-available")?.checked !== false;
  DATA.settings.availableLabel = DATA.settings.availableLabel || { fr: "Disponible", en: "Available" };
  const newPass = val("f-adminPass");
  if (newPass) DATA.settings.adminPassword = newPass;
  DATA.skills = collectSkills();
  DATA.education = collectEducation();
  DATA.experiences = collectExperiences();
  DATA.projects = collectProjects();
}

function val(id) {
  return document.getElementById(id)?.value?.trim() ?? "";
}

function renderListEditors() {
  renderSkillsEditor();
  renderEducationEditor();
  renderExperiencesEditor();
  renderProjectsEditor();
  if (window.lucide) lucide.createIcons();
}

function renderSkillsEditor() {
  const box = document.getElementById("skills-editor");
  if (!box) return;
  box.innerHTML = (DATA.skills || [])
    .map(
      (sk, i) => `<div class="admin-card p-5 space-y-3" data-skill-idx="${i}">
      <div class="flex justify-between items-center">
        <p class="text-sm font-semibold text-slate-300">Compétence #${i + 1}</p>
        <button onclick="removeSkill(${i})" class="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Supprimer</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div><label class="lbl">Titre FR</label><input class="field sk-title-fr" value="${escAttr(sk.title?.fr || "")}" /></div>
        <div><label class="lbl">Titre EN</label><input class="field sk-title-en" value="${escAttr(sk.title?.en || "")}" /></div>
        <div><label class="lbl">Icône Lucide</label><input class="field sk-icon" value="${escAttr(sk.icon || "code")}" placeholder="layout-template" /></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div><label class="lbl">Couleur</label>
          <select class="field sk-color">
            ${["amber","purple","emerald","orange","blue","rose"].map(c=>`<option value="${c}" ${sk.color===c?"selected":""}>${c}</option>`).join("")}
          </select>
        </div>
        <div><label class="lbl">Items (un par ligne)</label><textarea class="field sk-items" rows="3">${esc((sk.items||[]).join("\n"))}</textarea></div>
      </div>
    </div>`
    )
    .join("");
}

function collectSkills() {
  return [...document.querySelectorAll("[data-skill-idx]")].map((el) => ({
    id: "sk-" + Math.random().toString(36).slice(2, 7),
    title: { fr: el.querySelector(".sk-title-fr")?.value || "", en: el.querySelector(".sk-title-en")?.value || "" },
    icon: el.querySelector(".sk-icon")?.value || "code",
    color: el.querySelector(".sk-color")?.value || "blue",
    items: (el.querySelector(".sk-items")?.value || "").split("\n").map((s) => s.trim()).filter(Boolean),
  }));
}

function addSkill() {
  collectScalar();
  DATA.skills = DATA.skills || [];
  DATA.skills.push({ id: "new", title: { fr: "Nouvelle", en: "New" }, icon: "code", color: "blue", items: ["Item"] });
  renderSkillsEditor();
  if (window.lucide) lucide.createIcons();
}

function removeSkill(i) {
  collectScalar();
  DATA.skills.splice(i, 1);
  renderSkillsEditor();
  if (window.lucide) lucide.createIcons();
}

function renderEducationEditor() {
  const box = document.getElementById("education-editor");
  if (!box) return;
  box.innerHTML = (DATA.education || [])
    .map(
      (e, i) => `<div class="admin-card p-5 space-y-3" data-edu-idx="${i}">
      <div class="flex justify-between items-center">
        <p class="text-sm font-semibold text-slate-300">Formation #${i + 1}</p>
        <button onclick="removeEducation(${i})" class="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Supprimer</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div><label class="lbl">Titre FR</label><input class="field ed-title-fr" value="${escAttr(e.title?.fr || e.title || "")}" /></div>
        <div><label class="lbl">Titre EN</label><input class="field ed-title-en" value="${escAttr(e.title?.en || "")}" /></div>
        <div class="md:col-span-2"><label class="lbl">Établissement / lieu</label><input class="field ed-place" value="${escAttr(e.place || "")}" /></div>
        <div><label class="lbl">Dates</label><input class="field ed-date" value="${escAttr(typeof e.date === "string" ? e.date : e.date?.fr || "")}" /></div>
      </div>
    </div>`
    )
    .join("");
}

function collectEducation() {
  return [...document.querySelectorAll("[data-edu-idx]")].map((el) => ({
    id: "ed-" + Math.random().toString(36).slice(2, 7),
    title: { fr: el.querySelector(".ed-title-fr")?.value || "", en: el.querySelector(".ed-title-en")?.value || "" },
    place: el.querySelector(".ed-place")?.value || "",
    date: el.querySelector(".ed-date")?.value || "",
  }));
}

function addEducation() {
  collectScalar();
  DATA.education = DATA.education || [];
  DATA.education.push({ title: { fr: "Nouvelle formation", en: "New education" }, place: "", date: "" });
  renderEducationEditor();
  if (window.lucide) lucide.createIcons();
}

function removeEducation(i) {
  collectScalar();
  DATA.education.splice(i, 1);
  renderEducationEditor();
  if (window.lucide) lucide.createIcons();
}

function renderExperiencesEditor() {
  const box = document.getElementById("experiences-editor");
  if (!box) return;
  box.innerHTML = (DATA.experiences || [])
    .map(
      (e, i) => `<div class="admin-card p-5 space-y-3" data-exp-idx="${i}">
      <div class="flex justify-between items-center">
        <p class="text-sm font-semibold text-slate-300">Expérience #${i + 1}</p>
        <button onclick="removeExperience(${i})" class="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Supprimer</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div><label class="lbl">Poste FR</label><input class="field xp-title-fr" value="${escAttr(e.title?.fr || "")}" /></div>
        <div><label class="lbl">Poste EN</label><input class="field xp-title-en" value="${escAttr(e.title?.en || "")}" /></div>
        <div class="md:col-span-2"><label class="lbl">Entreprise / lieu</label><input class="field xp-place" value="${escAttr(e.place || "")}" /></div>
        <div><label class="lbl">Dates FR</label><input class="field xp-date-fr" value="${escAttr(e.date?.fr || (typeof e.date === "string" ? e.date : "") || "")}" /></div>
        <div><label class="lbl">Dates EN</label><input class="field xp-date-en" value="${escAttr(e.date?.en || "")}" /></div>
        <div><label class="lbl">Description FR</label><textarea class="field xp-desc-fr" rows="2">${esc(e.description?.fr || "")}</textarea></div>
        <div><label class="lbl">Description EN</label><textarea class="field xp-desc-en" rows="2">${esc(e.description?.en || "")}</textarea></div>
      </div>
    </div>`
    )
    .join("");
}

function collectExperiences() {
  return [...document.querySelectorAll("[data-exp-idx]")].map((el) => ({
    id: "xp-" + Math.random().toString(36).slice(2, 7),
    title: { fr: el.querySelector(".xp-title-fr")?.value || "", en: el.querySelector(".xp-title-en")?.value || "" },
    place: el.querySelector(".xp-place")?.value || "",
    date: { fr: el.querySelector(".xp-date-fr")?.value || "", en: el.querySelector(".xp-date-en")?.value || "" },
    description: { fr: el.querySelector(".xp-desc-fr")?.value || "", en: el.querySelector(".xp-desc-en")?.value || "" },
  }));
}

function addExperience() {
  collectScalar();
  DATA.experiences = DATA.experiences || [];
  DATA.experiences.push({
    title: { fr: "Nouveau poste", en: "New role" },
    place: "",
    date: { fr: "", en: "" },
    description: { fr: "", en: "" },
  });
  renderExperiencesEditor();
  if (window.lucide) lucide.createIcons();
}

function removeExperience(i) {
  collectScalar();
  DATA.experiences.splice(i, 1);
  renderExperiencesEditor();
  if (window.lucide) lucide.createIcons();
}

function renderProjectsEditor() {
  const box = document.getElementById("projects-editor");
  if (!box) return;
  box.innerHTML = (DATA.projects || [])
    .map(
      (pr, i) => `<div class="admin-card p-5 space-y-3" data-pr-idx="${i}">
      <div class="flex justify-between items-center">
        <p class="text-sm font-semibold text-slate-300">Projet #${i + 1}</p>
        <button onclick="removeProject(${i})" class="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Supprimer</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div><label class="lbl">Nom</label><input class="field pr-name" value="${escAttr(pr.name || "")}" /></div>
        <div><label class="lbl">Icône Lucide</label><input class="field pr-icon" value="${escAttr(pr.icon || "folder")}" /></div>
        <div><label class="lbl">Type FR</label><input class="field pr-type-fr" value="${escAttr(pr.type?.fr || "")}" /></div>
        <div><label class="lbl">Type EN</label><input class="field pr-type-en" value="${escAttr(pr.type?.en || "")}" /></div>
        <div><label class="lbl">Description FR</label><textarea class="field pr-desc-fr" rows="2">${esc(pr.description?.fr || "")}</textarea></div>
        <div><label class="lbl">Description EN</label><textarea class="field pr-desc-en" rows="2">${esc(pr.description?.en || "")}</textarea></div>
        <div><label class="lbl">Tags (virgules)</label><input class="field pr-tags" value="${escAttr((pr.tags || []).join(", "))}" /></div>
        <div><label class="lbl">Lien (URL)</label><input class="field pr-link" value="${escAttr(pr.link || "")}" /></div>
        <div class="md:col-span-2"><label class="lbl">Gradient Tailwind</label><input class="field pr-grad" value="${escAttr(pr.gradient || "")}" /></div>
      </div>
    </div>`
    )
    .join("");
}

function collectProjects() {
  return [...document.querySelectorAll("[data-pr-idx]")].map((el) => ({
    id: "pr-" + Math.random().toString(36).slice(2, 7),
    name: el.querySelector(".pr-name")?.value || "",
    icon: el.querySelector(".pr-icon")?.value || "folder",
    type: { fr: el.querySelector(".pr-type-fr")?.value || "", en: el.querySelector(".pr-type-en")?.value || "" },
    description: { fr: el.querySelector(".pr-desc-fr")?.value || "", en: el.querySelector(".pr-desc-en")?.value || "" },
    tags: (el.querySelector(".pr-tags")?.value || "").split(",").map((s) => s.trim()).filter(Boolean),
    link: el.querySelector(".pr-link")?.value || "",
    gradient: el.querySelector(".pr-grad")?.value || "from-blue-500/20 via-purple-500/10",
  }));
}

function addProject() {
  collectScalar();
  DATA.projects = DATA.projects || [];
  DATA.projects.push({
    name: "Nouveau projet",
    type: { fr: "Projet", en: "Project" },
    description: { fr: "", en: "" },
    tags: [],
    link: "",
    icon: "folder",
    gradient: "from-blue-500/20 via-purple-500/10",
  });
  renderProjectsEditor();
  if (window.lucide) lucide.createIcons();
}

function removeProject(i) {
  collectScalar();
  DATA.projects.splice(i, 1);
  renderProjectsEditor();
  if (window.lucide) lucide.createIcons();
}

function saveDraft() {
  collectScalar();
  localStorage.setItem(DRAFT_KEY, JSON.stringify(DATA));
  toast("Brouillon enregistré — visible sur le site (même navigateur)");
}

function previewDraft() {
  saveDraft();
  window.open("../", "_blank");
}

function exportJSON() {
  collectScalar();
  localStorage.setItem(DRAFT_KEY, JSON.stringify(DATA));
  const blob = new Blob([JSON.stringify(DATA, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "content.json";
  a.click();
  URL.revokeObjectURL(a.href);
  toast("content.json téléchargé — remplace data/content.json sur GitHub");
}

function toast(msg) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.remove("hidden");
  setTimeout(() => el.classList.add("hidden"), 3200);
}

function esc(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escAttr(str) {
  return esc(str).replace(/"/g, "&quot;");
}

document.addEventListener("DOMContentLoaded", init);
