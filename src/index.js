const todoList = document.getElementById("todo-list");
const form = document.getElementById("todo-form");
const todoForm = document.getElementById("todo-form");
const formTextarea = document.getElementById("form-textarea");
const formBtn = document.getElementById("form-btn");
const saveLocallyCheckbox = document.getElementById("save-locally");
const fetchRandCheckbox = document.getElementById("fetch-rand");

initLocalStorage();
const doSaveLocally = JSON.parse(localStorage.getItem("save-locally"));
const doFetchRand = JSON.parse(localStorage.getItem("fetch-rand"));

function initLocalStorage() {
  const doSaveLocally = localStorage.getItem("save-locally");
  const doFetchRand = localStorage.getItem("fetch-rand");

  if (doSaveLocally === null) localStorage.setItem("save-locally", true);
  if (doFetchRand === null) localStorage.setItem("fetch-rand", false);
}

function isLocalStorageAvailable() {
  var test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

if (!isLocalStorageAvailable()) {
  saveLocallyCheckbox.setAttribute("disabled", "disabled");
  saveLocallyCheckbox.parentElement.style.textDecoration = "line-through";

  const warning = document.createElement("h2");
  const header = document.getElementById("header");
  warning.classList.add("warning");
  warning.innerText = "Cannot access localStorage, todos won't be saved!";
  header.after(warning);
}
