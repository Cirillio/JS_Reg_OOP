import { Input as _Input } from "./input";
import { FormState } from "./formState";

export class Form {
  constructor(inputs = []) {
    this.state = new FormState();
    this.inputs = inputs;
    this.validaty = null;
    this.form_data = {};

    this.init();
    this.initFormChange();
  }

  init() {
    const form = document.createElement("form");
    form.classList.add("form");
    form.onsubmit = (e) => e.preventDefault();

    this.inputs.forEach((i) => form.appendChild(i.form_field));

    const submit_btn = document.createElement("button");
    submit_btn.classList.add("form-button");
    submit_btn.disabled = true;
    submit_btn.textContent = "Send";
    this.submit_btn = submit_btn;
    this.submit_btn.onclick = () => this.onSubmit();

    form.appendChild(submit_btn);
    this.form = form;
  }

  initFormChange() {
    if (!this.inputs.every((i) => i instanceof _Input)) {
      throw new Error("Input must be an instance of the Input class");
    }
    this.inputs.forEach((input) => {
      this.state.registerInput(input);
      this.state.onChangeInput(input.name, () => {
        const valid = this.state.formValid();
        this.toggleFormButton(valid);
      });
    });
    this.state.onChangeInput("Password", () => {
      this.state.validateInput("Password confirm");
    });
  }

  render(elem) {
    const el = document.querySelector(elem);
    el.appendChild(this.form);
  }

  checkResult() {
    if (!this.form_data || !this.validaty) {
      throw new Error("Form is not valid");
    }
  }

  async onSubmit() {
    try {
      this.makeResult();
      this.checkResult();
      await this.sendResult()
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }

  makeResult() {
    this.state.validateForm();
    this.validaty = this.state.formValid();
    this.form_data = this.state.getFormValues();
  }

  async sendResult(method = "post", url = "https://httpbin.org") {
    return fetch(url + "/" + method, {
      method: method.toUpperCase(),
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.form_data),
    });
  }
  toggleFormButton(valid) {
    this.submit_btn.disabled = !valid;
  }
}
