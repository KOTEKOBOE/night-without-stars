const body = document.querySelector("body");

const todoList = document.getElementById("todos");
const form = document.getElementById("todo-add-form");
const todoInput = document.getElementById("todo-input");
const button = document.getElementById("todo-add-btn");

const themeSwitch = document.getElementById("dark-mode");
const saveLocallySwitch = document.getElementById("save-todos");
const fetchRandSwitch = document.getElementById("fetch-rand");

const theme = localStorage.getItem("theme");
const doSaveLocally = localStorage.getItem("save-locally");
const fetchRand = localStorage.getItem("fetch-rand");

todoInput.addEventListener("keyup", (e) => {
  button.disabled = todoInput.value.length > 0 ? false : true;
});

// ADD TASK
const addTask = (task) => {
  const todoContainer = document.createElement("span");
  todoContainer.classList.add("todo-container");

  const todo = document.createElement("li");
  todo.classList.add("todo-item");

  const todoRemoveBtn = document.createElement("button");
  todoRemoveBtn.classList.add("todo-remove-btn");

  todo.innerText = task;

  todoRemoveBtn.classList.add("btn-remove");
  todoRemoveBtn.innerText = "✔";

  todoRemoveBtn.addEventListener("click", () => {
    todoContainer.classList.add("removing-transition");

    setTimeout(() => {
      todoContainer.remove();
    }, 500);
  });

  todo.addEventListener("click", () => {
    todo.classList.toggle("completed");
  });

  todoContainer.appendChild(todo);
  todoContainer.appendChild(todoRemoveBtn);

  todoList.appendChild(todoContainer);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTask(todoInput.value);
  todoInput.value = "";
  button.disabled = true;
});

// THEME SWITCH
function turnOnTheLights() {
  themeSwitch.parentNode.classList.remove("theme-switch-dark");
  themeSwitch.parentNode.classList.add("theme-switch-light");

  document.body.classList.add("light");
  document.body.classList.remove("dark");
}

function turnOffTheLights() {
  themeSwitch.parentNode.classList.add("theme-switch-dark");
  themeSwitch.parentNode.classList.remove("theme-switch-light");

  document.body.classList.add("dark");
  document.body.classList.remove("light");
}

if (theme === "dark") {
  turnOffTheLights();
}

// SAVE LOCALLY
themeSwitch.addEventListener("click", (e) => {
  if (e.target.checked) {
    turnOffTheLights();
    localStorage.setItem("theme", "dark");
  } else {
    turnOnTheLights();
    localStorage.setItem("theme", "light");
  }
});

function saveLocally() {
  const todos = [];
  todoList.childNodes.forEach((todo) => {
    const todoText = todo.childNodes[0].innerText;
    todos.push(todoText);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

if (doSaveLocally) {
  saveLocallySwitch.checked = true;
  const savedTodos = JSON.parse(localStorage.getItem("todos"));
  savedTodos?.forEach((todo) => {
    addTask(todo);
  });
} else {
  saveLocallySwitch.removeAttribute("checked");
}

saveLocallySwitch.addEventListener("click", (e) => {
  if (e.target.checked) {
    fetchRandSwitch.checked = false;
    localStorage.removeItem("fetch-rand");
    localStorage.setItem("save-locally", true);
  } else {
    localStorage.removeItem("save-locally");
  }
});

// FETCH RANDOM
async function fetchRandomTodos() {
  if (todoList.hasChildNodes()) return;
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length && i < 15; i++) addTask(data[i].title);
    });
}

if (fetchRand) {
  fetchRandSwitch.checked = true;
  fetchRandomTodos();
} else {
  fetchRandSwitch.removeAttribute("checked");
}

fetchRandSwitch.addEventListener("click", (e) => {
  if (e.target.checked) {
    saveLocallySwitch.checked = false;
    localStorage.removeItem("save-locally");
    localStorage.setItem("fetch-rand", true);
    fetchRandomTodos();
  } else {
    localStorage.removeItem("fetch-rand");
  }
});

// MEME
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      updateBodyBackground();
    }
  }
});

function updateBodyBackground() {
  if (todoList.hasChildNodes()) {
    body.classList.remove("no-todos");
  } else {
    body.classList.add("no-todos");
  }
}

const config = { childList: true };
updateBodyBackground();
observer.observe(todoList, config);

// CLEANUP
window.addEventListener("beforeunload", function () {
  saveLocally();
  observer.disconnect();
});

