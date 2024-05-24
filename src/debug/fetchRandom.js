const randCount = document.getElementById("fetch-rand-count");

let DEBUG_LOAD_TODOS_QUANTITY = todoList.childNodes.length || 15;
const list = [];

randCount.innerText = DEBUG_LOAD_TODOS_QUANTITY;

const fetchList = async () =>
  await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "GET",
  }).then((res) => res.json());

function cutList(no) {
  const last = todoList.childNodes.length - no;
  list.splice(last, todoList.childNodes.length);

  for (let i = 0; i < no; i++) todoList.removeChild(todoList.lastChild);
}

function setList(randTodos) {
  const no = DEBUG_LOAD_TODOS_QUANTITY - todoList.childNodes.length;
  const newTodos = [];
  for (let i = 0; i < no; i++) {
    const rand = Math.floor(Math.random() * randTodos.length);
    const newTodo = new Todo(null, i + ": " + randTodos[rand].title);
    newTodos.push(newTodo);
    list.push(newTodo);
  }
  addTodos(newTodos);
}

saveLocallyCheckbox.addEventListener("click", (e) => {
  localStorage.setItem("todos", JSON.stringify(list));
  randCount.classList.add("hidden");
});

fetchRandCheckbox.addEventListener("click", (e) => {
  randCount.classList.toggle("hidden");

  if (e.target.checked) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    list.length = 0;
    list.push(...todos);
    saveLocallyCheckbox.checked = false;
    localStorage.setItem("save-locally", false);
    localStorage.setItem("fetch-rand", true);
    fetchList().then((res) => setList(res));
  } else {
    localStorage.setItem("fetch-rand", false);
  }

  localStorage.removeItem("todos");
});

randCount.addEventListener("click", (e) => {
  randCount.setAttribute("contenteditable", "true");
  randCount.focus();
});

randCount.addEventListener("blur", () => {
  const buffer = DEBUG_LOAD_TODOS_QUANTITY;
  randCount.removeAttribute("contenteditable");
  DEBUG_LOAD_TODOS_QUANTITY = parseInt(randCount.innerText);

  const no = buffer - DEBUG_LOAD_TODOS_QUANTITY;
  if (no < 0) fetchList().then((res) => setList(res));
  else cutList(no);
});

if (doFetchRand) {
  fetchRandCheckbox.checked = true;
  randCount.classList.toggle("hidden");

  fetchList().then((res) => setList(res));
} else {
  fetchRandCheckbox.removeAttribute("checked");
}
