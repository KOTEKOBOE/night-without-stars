class Todo {
  constructor(id, value, color, active = true, createdAt) {
    this.id =
      id || (Math.random() * value.length).toString().replace(/\./g, "");
    this.value = value;
    this.color = color;
    this.active = active;
    this.createdAt = createdAt || new Date().toISOString();
    this.container = this.createTodoContainer();
  }

  setValue(value) {
    const cleanValue = value.replace(/<[^>]+>/g, "");
    if (/\S/.test(cleanValue)) this.value = cleanValue;
  }

  setColor(value) {
    this.color = value;
    this.container.style.setProperty("--todo-color", value);
  }

  removeColor() {
    this.color = undefined;
    this.container.style.removeProperty("--todo-color");
  }

  setActive(value) {
    this.active = value;
  }

  createTodoText() {
    const text = document.createElement("p");

    text.innerText = text.areaLabel = this.value;
    text.tabIndex = 0;
    text.classList.add("todo-container__text");

    return text;
  }

  createColorBlock() {
    const colorBlock = document.createElement("div");
    colorBlock.classList.add("todo-container__color-block");

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.tabIndex = -1;
    colorInput.ariaLabel = "color picker";
    colorInput.classList.add("color-input");
    colorBlock.append(colorInput);

    return colorBlock;
  }

  createBtnContainer() {
    const createEditBtn = () => {
      const btn = document.createElement("button");
      btn.classList.add("todo-btn-container__todo-btn", "todo-btn_edit");
      btn.ariaLabel = "edit todo";
      return btn;
    };

    const createRemoveBtn = () => {
      const btn = document.createElement("button");
      btn.classList.add("todo-btn-container__todo-btn", "todo-btn_remove");
      btn.ariaLabel = "remove todo";
      return btn;
    };

    const container = document.createElement("div");

    const editBtn = createEditBtn();
    const removeBtn = createRemoveBtn();
    container.append(editBtn, removeBtn);
    container.classList.add("todo-container__todo-btn-container");

    return container;
  }
  createTodoContainer() {
    const container = document.createElement("li");

    const todoText = this.createTodoText();
    const colorBlock = this.createColorBlock();
    const btnsContainer = this.createBtnContainer();

    if (this.color) container.style.setProperty("--todo-color", this.color);
    container.classList.add("todo-list__todo-container");

    container.append(colorBlock, todoText, btnsContainer);

    return container;
  }
}
