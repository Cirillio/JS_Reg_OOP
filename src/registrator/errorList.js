export class ErrorList {
  constructor() {
    this.errors = [];
    this.init();
  }

  init() {
    this.error_list = document.createElement("ul");
    this.error_list.classList.add("error-list");
  }

  getElement() {
    return this.error_list;
  }

  getErrors() {
    return this.errors;
  }

  newError(error) {
    const error_item = document.createElement("li");
    error_item.classList.add("error-item");
    error_item.textContent = error.msg;
    return error_item;
  }

  addError(error) {
    if (!this.errors.find((e) => e.id === error.id)) this.errors.push(error);
  }

  renderError(error) {
    this.error_list.appendChild(error);
  }

  showErrors() {
    if (this.errors.length === 0) return;
    this.errors.forEach((error) => this.renderError(this.newError(error)));
  }

  clearErrors() {
    this.error_list.innerHTML = "";
    this.errors = [];
  }

  checkErrors() {
    return !this.errors.length > 0;
  }
}
