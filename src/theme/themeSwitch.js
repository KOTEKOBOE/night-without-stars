const themeSwitch = document.getElementById("theme-switcher");

function switchLight() {
  document.documentElement.classList.toggle("dark-theme");
  document.documentElement.classList.toggle("light-theme");
}

themeSwitch.addEventListener("click", () => {
  const theme = getTheme();
  setTheme(theme === "dark" ? "light" : "dark");
  switchLight();
});
