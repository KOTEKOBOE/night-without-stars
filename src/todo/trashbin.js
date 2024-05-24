const trashBtn = document.getElementById("trash-btn");

function cleanLocalStorage() {
  localStorage.removeItem("todos");
}

function cleanList() {
  while (todoList.firstChild) todoList.lastChild.remove();
}

trashBtn.addEventListener("click", () => {
  const confirmed = confirm("Are you sure?");
  if (!confirmed) return;

  cleanList();
  cleanLocalStorage();
});
