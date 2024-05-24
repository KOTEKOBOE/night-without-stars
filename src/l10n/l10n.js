const l10n = {
  en: {
    "settings-title": "Settings",
    "settings-save-locally-label": "Save list into local storage",
    "settings-fetch-rand-label": "[DEBUG] Load random list",
    "header-title": "Todo List",
    "form-submit-btn-text": "Add",
    "l10n-btn-text": "EN",
    "export-btn-text": "Export",
    "import-btn-text": "Import",
    "show-completed-label": "Switch to completed",
    "sort-btn-text": "By creation time",
  },
  ru: {
    "settings-title": "Настройки",
    "settings-save-locally-label": "Сохранять в локальное хранилище",
    "settings-fetch-rand-label": "[DEBUG] Загружать случайный список",
    "header-title": "Список дел",
    "form-submit-btn-text": "Добавить",
    "l10n-btn-text": "Русский",
    "export-btn-text": "Экспорт",
    "import-btn-text": "Импорт",
    "show-completed-label": "Переключить на выполненные",
    "sort-btn-text": "По дате создания",
  },
};

const l10nPlaceholders = {
  en: {
    "form-textarea": "Planning something?",
  },
  ru: {
    "form-textarea": "Что планируете?",
  },
};

function changeLang(lang) {
  const nodes = document.querySelectorAll("[data-l10n]");
  const placeholders = Object.keys(l10nPlaceholders.en);

  nodes.forEach((node) => {
    const key = node.getAttribute("data-l10n");
    if (key) node.innerText = l10n[lang][key];
  });

  placeholders.forEach((key) => {
    const element = document.getElementById(key);
    element.setAttribute("placeholder", l10nPlaceholders[lang][key]);
  });
}

const l10nBtn = document.getElementById("l10n-btn");
const ruLang = document.getElementById("ru-lang-btn");
const enLang = document.getElementById("en-lang-btn");
const langListContainer = document.getElementById("lang-list-container");

function initL10n() {
  const currentLang = localStorage.getItem("lang") || "en";
  if (currentLang !== "en") changeLang(currentLang);
  const activeBtn = document.getElementById(`${currentLang}-lang-btn`);
  activeBtn.classList.add("alt-active");
}

initL10n();

l10nBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  langListContainer.classList.toggle("hidden");
});

ruLang.addEventListener("click", (e) => {
  e.stopPropagation();
  localStorage.setItem("lang", "ru");
  ruLang.classList.add("alt-active");
  enLang.classList.remove("alt-active");

  changeLang("ru");
});

enLang.addEventListener("click", (e) => {
  e.stopPropagation();
  localStorage.setItem("lang", "en");
  ruLang.classList.remove("alt-active");
  enLang.classList.add("alt-active");

  changeLang("en");
});

document.addEventListener("click", (e) => {
  const isClickInside =
    langListContainer.contains(e.target) || l10nBtn.contains(e.target);

  if (!isClickInside) {
    langListContainer.classList.add("hidden");
  }
});
