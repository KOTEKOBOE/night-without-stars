const settingsOpenBtn = document.getElementById("settings-open-btn");
const settingsCloseBtn = document.getElementById("settings-close-btn");
const settingsModal = document.getElementById("settings-modal");
const settingsMenu = document.getElementById("settings-menu");

settingsCloseBtn.addEventListener("click", () => {
  settingsModal.classList.toggle("hidden");
  settingsMenu.classList.toggle("hidden");
});

settingsOpenBtn.addEventListener("click", () => {
  settingsModal.classList.toggle("hidden");
  settingsMenu.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (e.target == settingsModal) {
    settingsModal.classList.toggle("hidden");
    settingsMenu.classList.toggle("hidden");
  }
});
