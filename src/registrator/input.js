import { ErrorList } from "./errorList";

export class Input {
  constructor({ name, type, placeholder = "", desc, validators = [] }) {
    this.name = name;
    this.id =
      name.split(" ").length > 1
        ? name.split(" ").join("-").toLowerCase()
        : name.toLowerCase();
    this.type = type;
    this.placeholder = placeholder;
    this.desc = desc;
    this.value = null;
    this.errors = new ErrorList();
    this.valid = false;
    this.validators = validators;
    this.listeners = [];
    this.init();
  }

  init() {
    const form_field = document.createElement("div");
    form_field.classList.add("form-field");

    const label = document.createElement("label");
    label.classList.add("form-label");
    label.textContent = this.name;

    const input = document.createElement("input");
    input.classList.add("form-input");
    input.setAttribute("type", this.type);
    input.setAttribute("name", this.id);
    input.setAttribute("id", this.id);
    input.setAttribute("placeholder", this.placeholder);

    switch (this.type) {
      case "password":
        input.setAttribute("autocomplete", "new-password");
        break;
      case "email":
        input.setAttribute("autocomplete", "username");
        break;
    }

    const input_container = document.createElement("div");
    input_container.classList.add("form-input-container");
    input_container.appendChild(input);

    const input_add = document.createElement("div");
    input_add.classList.add("form-input-addittional");

    const input_clear = document.createElement("button");
    input_clear.classList.add("form-input-clear");
    input_clear.textContent = "Clear";
    input_clear.onclick = () => this.clearInput();
    input_add.appendChild(input_clear);

    let toggle_pass = null;
    if (this.type === "password") {
      toggle_pass = document.createElement("button");
      toggle_pass.classList.add("form-pass-toggle");
      toggle_pass.textContent = "👁️";
      toggle_pass.onclick = () => this.togglePass();
      this.toggle_pass = toggle_pass;
      input_add.appendChild(toggle_pass);
    }

    input_container.appendChild(input_add);

    let desc = null;
    if (this.desc) {
      desc = document.createElement("span");
      desc.classList.add("form-input-desc");
      desc.textContent = this.desc;
    }

    const error_list = this.errors.getElement();

    form_field.appendChild(label);
    form_field.appendChild(input_container);
    if (this.desc) form_field.appendChild(desc);
    form_field.appendChild(error_list);

    this.input = input;
    this.label = label;

    this.form_field = form_field;

    // СОБЫТИЕ ПРИ ВВОДЕ - УСТАНОВКА ЗНАЧЕНИЯ (+ВАЛИДАЦИЯ) И ВЫЗОВ ВСЕХ КОЛЛБЕКОВ (ПОДПИСЧИКОВ), НАПРИМЕР ИЗВНЕ ИНПУТА МЕТОДЫ ФОРМЫ (ТУГЛ КНОПКИ)
    this.input.oninput = (e) => {
      this.setValue(e.target.value);
      this.notify();
    };
  }

  getInput() {
    return this.input;
  }

  clearInput() {
    this.setValue("");
    this.input.focus();
  }

  togglePass() {
    console.log(this.input.type);
    if (this.input.type === "password") {
      this.input.type = "text";
      this.toggle_pass.textContent = "🙈";
    } else {
      this.input.type = "password";
      this.toggle_pass.textContent = "👁️";
    }
    this.input.focus();
  }

  getLabeledInput() {
    return this.label;
  }

  setValue(value) {
    this.value = value;
    this.input.value = value;
    this.handleValidate();
  }

  getValue() {
    return this.value;
  }

  getValid() {
    return this.valid;
  }

  handleValidate() {
    this.errors.clearErrors();
    this.validate();
    this.toggleValid(this.errors.checkErrors());
    this.errors.showErrors();
  }

  validate() {
    this.validators.forEach((validator) => {
      // валидатор выбрасывает ошибку если она есть
      try {
        validator(this.value);
      } catch (error) {
        // console.log(error.msg);
        this.errors.addError(error);
      }
    });
  }

  // ПОДПИСКА НА СОБЫТИЕ
  onChange(callback) {
    this.listeners.push(callback);
  }

  // ОТПРАВКА СОБЫТИЙ
  notify() {
    this.listeners.forEach((cb) =>
      cb({
        // вообще можно убрать т.к. у меня пока только для кнопки коллбеки, а кнопке не нужны эти аргументы
        value: this.value,
        errors: this.errors.getErrors(),
        valid: this.valid,
      })
    );
  }

  toggleValid(valid) {
    if (typeof valid !== "boolean") return;
    this.valid = valid;
    valid ? this.setValidClass() : this.setInvalidClass();
  }

  setValidClass() {
    this.input.classList.remove("invalid");
    this.input.classList.add("valid");
  }

  setInvalidClass() {
    this.input.classList.add("invalid");
    this.input.classList.remove("valid");
  }
}
