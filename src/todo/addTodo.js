const notEmpty = /\S/;
const validate = (value, pattern) => {
  return pattern.test(value);
};

const setCaretPosition = (element, position) => {
  const range = document.createRange();
  const selection = window.getSelection();
  range.setStart(element, position);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};

const resizeTextArea = (e) => {
  const textarea = e.target;

  const maxHeight = parseFloat(getComputedStyle(textarea).maxHeight);
  textarea.style.height = "auto";
  const currentHeight = textarea.clientHeight;
  const newHeight = Math.min(textarea.scrollHeight, maxHeight);

  if (newHeight > currentHeight) {
    textarea.style.height = `${newHeight}px`;

    if (newHeight >= maxHeight) {
      textarea.style.overflow = "auto";
    } else {
      textarea.style.overflow = "hidden";
    }
  }
};

formTextarea.addEventListener("input", (e) => {
  formBtn.disabled = !validate(formTextarea.value, notEmpty);
  resizeTextArea(e);
});

const addToStorage = (todo) => {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");

  const { container: _, ...newTodo } = todo;
  todos.push(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
};

const saveToStorage = (todo) => {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");

  const { container: _, ...newTodo } = todo;
  let oldTodo = todos.find((item) => item.id === todo.id);
  if (oldTodo)
    for (const key in newTodo)
      if (newTodo.hasOwnProperty(key)) oldTodo[key] = newTodo[key];

  localStorage.setItem("todos", JSON.stringify(todos));
};

const removeFromStorage = (todo) => {
  const todos = JSON.parse(localStorage.getItem("todos") || "[]");

  const index = todos.findIndex((item) => item.id === todo.id);
  if (index !== -1) {
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

const editTodo = (todo) => {
  const isEditing = todo.container.classList.contains("todo-editing");
  const todoText = todo.container.querySelector(".todo-container__text");
  if (isEditing) {
    todo.container.classList.remove("todo-editing");
    todoText.removeAttribute("contenteditable");
    if (!todo.container.parentElement.querySelector(".todo-editing"))
      todoForm.classList.remove("relative");

    todo.setValue(todoText.innerText);
    todoText.innerText = todo.value;
    saveToStorage(todo);

    return;
  }

  todoForm.classList.add("relative");

  todo.container.classList.add("todo-editing");
  todoText.setAttribute("contenteditable", "true");

  setCaretPosition(todoText, 1);
  todo.container.scrollIntoView({ behavior: "smooth", block: "end" });
};

const removeTodo = (todo) => {
  todo.container.classList.remove("visible");
  todo.container.setAttribute(
    "style",
    "visibility: hidden; opacity: 0; transition: visibility 0.5s, opacity 0.5s ease;"
  );

  setTimeout(() => {
    todo.container.remove();
  }, 300);

  removeFromStorage(todo);
};

const addColorReset = (todo) => {
  const colorInput = todo.container.querySelector(".color-input");
  const removeBtn = todo.container.querySelector(".todo-btn_remove");

  colorInput.addEventListener("click", () => {
    if (todo.container.querySelector(".color-reset")) return;

    const colorReset = document.createElement("span");
    colorReset.classList.add("color-reset");
    colorReset.addEventListener(
      "click",
      (e) => {
        e.stopPropagation();

        todo.removeColor();
        saveToStorage(todo);
        colorReset.remove();
        document.removeEventListener("click", removeColorReset);
      },
      { once: true }
    );
    todo.container.insertBefore(colorReset, todo.container.firstChild);
    document.addEventListener("click", removeColorReset);
  });

  function removeColorReset(e) {
    if (e.target !== colorInput) {
      const colorReset = todo.container.querySelector(".color-reset");
      if (colorReset) {
        colorReset.remove();
        document.removeEventListener("click", removeColorReset);
      }
    }
  }

  removeBtn.addEventListener("click", () => {
    document.removeEventListener("click", removeColorReset);
  });
};

const attachListeners = (todo) => {
  const colorInput = todo.container.querySelector(".color-input");
  const editBtn = todo.container.querySelector(".todo-btn_edit");
  const removeBtn = todo.container.querySelector(".todo-btn_remove");

  colorInput.addEventListener("click", (e) => {
    e.stopPropagation();

    colorInput.value =
      todo.color ||
      getComputedStyle(document.documentElement).getPropertyValue(
        "--primary-color"
      );
  });
  colorInput.addEventListener("input", (e) => {
    todo.setColor(e.target.value);
  });
  colorInput.addEventListener("change", () => {
    saveToStorage(todo);
  });
  editBtn.addEventListener("click", () => {
    editTodo(todo);
  });
  removeBtn.addEventListener("click", () => {
    removeTodo(todo);
  });
};

const addSortAttrs = (todo, order) => {
  todo.container.setAttribute("data-created-at", todo.createdAt);
  todo.container.setAttribute("data-order", order);
};

const addTodos = (...newTodos) => {
  const fragment = document.createDocumentFragment();
  const isDesc = todoList.classList.contains("sort-desc");
  const lastOrder =
    (isDesc
      ? +todoList.firstElementChild?.dataset.order + 1
      : +todoList.lastElementChild?.dataset.order + 1) || 0;

  newTodos.flat().forEach((todo, index) => {
    attachListeners(todo);
    addColorReset(todo);
    addSortAttrs(todo, lastOrder + index);

    fragment.appendChild(todo.container);
  });

  if (isDesc) todoList.prepend(fragment);
  else todoList.appendChild(fragment);
};

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newTodo = new Todo(null, formTextarea.value);
  addTodos(newTodo);

  if (doSaveLocally) addToStorage(newTodo);

  formTextarea.value = "";
  formTextarea.dispatchEvent(new Event("input"));
  formTextarea.focus();

  newTodo.container.scrollIntoView({ block: "center" });
});
