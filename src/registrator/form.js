import { Input as _Input } from "./input";
import { FormState } from "./formState";
import { FormAlert } from "./formAlert";

export class Form {
  constructor(inputs = []) {
    // хранилище для формы
    this.state = new FormState();
    this.inputs = inputs;
    this.validaty = null;
    this.form_data = {};
    this.alert = new FormAlert(
      ".result-container",
      ".result-loading",
      ".result-error",
      ".result-response",
      ".result-close"
    );

    this.init();
    this.initFormChange();
  }

  init() {
    const form = document.createElement("form");
    form.classList.add("form");
    form.onsubmit = (e) => e.preventDefault();

    if (this.inputs.length === 0) {
      form.appendChild(
        (document.createElement("p").textContent = "You didn't add any inputs")
      );
      return;
    }

    this.inputs.forEach((i) => form.appendChild(i.form_field));

    const submit_btn = document.createElement("button");
    submit_btn.classList.add("form-button");
    submit_btn.disabled = true;
    submit_btn.textContent = "Send";
    this.submit_btn = submit_btn;
    this.submit_btn.onclick = () => this.onSubmit();

    const h_divider = document.createElement("div");
    h_divider.classList.add("horizontal-divider");
    form.appendChild(h_divider);

    form.appendChild(submit_btn);
    this.form = form;
  }

  initFormChange() {
    if (!this.inputs.every((i) => i instanceof _Input)) {
      throw new Error("Input must be an instance of the Input class");
    }
    // регистрация инпутов и подпись событий
    this.inputs.forEach((input) => {
      this.state.registerInput(input);
      this.state.onChangeInput(input.name, () => {
        const valid = this.state.formValid();
        this.toggleFormButton(valid);
      });
    });
    // доп проверка пароля
    this.state.onChangeInput("Password", () => {
      this.state.validateInput("Password confirm");
    });
  }

  // рендер в нужном месте
  render(elem) {
    const el = document.querySelector(elem);
    el.appendChild(this.form);
  }

  checkResult() {
    if (!this.form_data || !this.validaty) {
      throw new Error("Form is not valid");
    }
  }

  // метод отправки при клике и открытие окна с результатами
  async onSubmit() {
    try {
      this.makeResult();
      this.checkResult();
      this.alert.openAlert();
      await this.sendResult()
        .then((data) =>
          this.alert.setResponse(
            data.status === 200 ? "Registered successfully" : data.status
          )
        )
        .catch((error) => this.alert.setError(error.message));
    } catch (error) {
      this.alert.openAlert();
      this.alert.setError(error.message);
    }
  }

  makeResult() {
    this.state.validateForm();
    this.validaty = this.state.formValid();
    this.form_data = this.state.getFormValues();
  }

  // отправка результата
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
