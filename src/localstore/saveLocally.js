function loadTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const activeTodos = savedTodos.filter((todo) => todo.active);
  const newTodos = activeTodos.map(
    (todo) =>
      new Todo(todo.id, todo.value, todo.color, todo.active, todo.createdAt)
  );

  addTodos(newTodos);
}

if (doSaveLocally) {
  saveLocallyCheckbox.checked = true;
  loadTodos();
} else {
  saveLocallyCheckbox.removeAttribute("checked");
}

saveLocallyCheckbox.addEventListener("click", (e) => {
  if (e.target.checked) {
    fetchRandCheckbox.checked = false;
    localStorage.setItem("fetch-rand", false);
    localStorage.setItem("save-locally", true);
  } else {
    localStorage.setItem("save-locally", false);
  }
});
