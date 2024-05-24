const sortBtn = document.getElementById("sort-btn");
const icon = sortBtn.querySelector(".sort-btn__icon");

function replaceList(sortedItems) {
  todoList.replaceChildren(...sortedItems);
}

function sortDesc() {
  return [...todoList.children].toSorted(
    (a, b) => new Date(b.dataset.createdAt) - new Date(a.dataset.createdAt)
  );
}

function sortAsc() {
  return [...todoList.children].reverse();
}

function resetOrder() {
  return [...todoList.children].toSorted(
    (a, b) => a.dataset.order - b.dataset.order
  );
}

sortBtn.addEventListener("click", () => {
  const isActive = icon.classList.contains("sort-btn_icon-active");
  const isDesc = icon.classList.contains("sort-btn_icon-desc");
  let sorted;

  if (isActive) {
    if (isDesc) {
      sorted = sortAsc();
      icon.classList.remove("sort-btn_icon-desc");
      todoList.classList.remove("sort-desc");
      sortBtn.ariaLabel = "reset sorting by creation time";
    } else {
      sorted = resetOrder();
      icon.classList.remove("sort-btn_icon-active");
      sortBtn.ariaLabel = "sort from latest to earliest";
    }
  } else {
    sorted = sortDesc();
    icon.classList.add("sort-btn_icon-active", "sort-btn_icon-desc");
    todoList.classList.add("sort-desc");

    sortBtn.ariaLabel = "sort from earliest to latest";
  }
  replaceList(sorted);
});
