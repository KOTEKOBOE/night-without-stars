function setTheme(theme) {
  localStorage.setItem("theme", theme);
}

function getTheme() {
  return localStorage.getItem("theme");
}

function initTheme() {
  let theme = getTheme();
  if (!theme) {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    )
      theme = "dark";
    else theme = "light";

    setTheme(theme);
  }
  if (theme === "dark") document.documentElement.classList.add("dark-theme");
  else document.documentElement.classList.add("light-theme");
}

initTheme();
