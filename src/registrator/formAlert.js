export class FormAlert {
  constructor(alert, loading, error, response, close) {
    this.status = false;
    this.alert = document.querySelector(alert);
    this.loading = document.querySelector(loading);
    this.error = document.querySelector(error);
    this.response = document.querySelector(response);
    this.button = document.querySelector(close);

    this.init();
  }

  init() {
    if (this.button) {
      this.button.onclick = () => this.closeAlert();
    }
  }

  openAlert() {
    if (!this.status && this.alert) {
      this.alert.classList.remove("hidden");
      this.alert.classList.add("flex");
      this.showLoading();
      this.status = true;
    }
  }

  closeAlert() {
    if (this.status && this.alert) {
      this.alert.classList.remove("flex");
      this.alert.classList.add("hidden");

      this.hideLoading();
      this.hideError();
      this.hideResponse();

      this.status = false;
    }
  }

  showLoading() {
    if (this.loading) {
      this.loading.classList.remove("result-hidden");
    }

    this.hideError();
    this.hideResponse();
  }

  hideLoading() {
    if (this.loading) {
      this.loading.classList.add("result-hidden");
    }
  }

  setError(errorText) {
    this.hideLoading();
    this.hideResponse();

    if (this.error && typeof errorText === "string") {
      this.error.textContent = errorText;
      this.error.classList.remove("result-hidden");
    }
  }

  hideError() {
    if (this.error) {
      this.error.classList.add("result-hidden");
    }
  }

  setResponse(responseText) {
    this.hideLoading();
    this.hideError();

    if (this.response && typeof responseText === "string") {
      this.response.textContent = responseText;
      this.response.classList.remove("result-hidden");
    }
  }

  hideResponse() {
    if (this.response) {
      this.response.classList.add("result-hidden");
    }
  }
}
