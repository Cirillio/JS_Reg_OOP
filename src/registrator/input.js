export class Input {
  constructor(formState, name, type, placeholder) {
    this.name = name;
    this.id =
      name.split(" ").length > 1
        ? name.split(" ").join("-").toLowerCase()
        : name.toLowerCase();
    this.type = type;
    this.placeholder = placeholder;
    this.elem = this.init();
  }

  init() {
    const label = document.createElement("label");
    label.classList.add("form-label");
    const span = document.createElement("span");
    span.classList.add("form-label-text");
    span.textContent = this.name;
    label.appendChild(span);
    const input = document.createElement("input");
    input.classList.add("form-input");
    input.setAttribute("type", this.type);
    input.setAttribute("name", this.name);
    input.setAttribute("id", this.id);
    input.setAttribute("placeholder", this.placeholder);
    label.appendChild(input);
    return label;
  }
}
