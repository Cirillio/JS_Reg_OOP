export class Input {
  constructor(name, type, placeholder = "", validators = []) {
    this.name = name;
    this.id =
      name.split(" ").length > 1
        ? name.split(" ").join("-").toLowerCase()
        : name.toLowerCase();
    this.type = type;
    this.placeholder = placeholder;
    this.value = null;
    this.error = null;
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

    form_field.appendChild(label);

    const input = document.createElement("input");
    input.classList.add("form-input");
    input.setAttribute("type", this.type);
    input.setAttribute("name", this.id);
    input.setAttribute("id", this.id);
    input.setAttribute("placeholder", this.placeholder);

    form_field.appendChild(input);
    this.input = input;
    this.label = label;
    this.form_field = form_field;

    this.input.oninput = (e) => {
      this.setValue(e.target.value);
      this.notify();
    };
  }

  getInput() {
    return this.input;
  }

  getLabeledInput() {
    return this.label;
  }

  setValue(value) {
    this.value = value;
    this.input.value = value;
    this.validate();
  }

  getValue() {
    return this.value;
  }

  getValid() {
    return this.valid;
  }

  getError() {
    return this.error;
  }

  validate() {
    this.validators.forEach((validator) => {
      const validation = validator(this.value);
      // валидатор должен вернуть нулл в случае успеха, иначе сообщение об ошибке
      this.toggleValid(validation);
    });
    console.log(this.name, this.value, this.error, this.valid);
  }

  onChange(callback) {
    this.listeners.push(callback);
  }

  notify() {
    this.listeners.forEach((cb) =>
      cb({
        value: this.value,
        error: this.error,
        valid: this.valid,
      })
    );
  }

  toggleValid(validation) {
    this.error = validation;
    this.valid = this.error ? false : true;
    this.valid ? this.setValidClass() : this.setInvalidClass();
  }

  setValidClass() {
    this.input.classList.remove("invalid");
  }

  setInvalidClass() {
    this.input.classList.add("invalid");
  }
}
