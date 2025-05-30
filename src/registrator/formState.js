import { Input as _Input } from "./input";

// Хранилище состояния для формы
export class FormState {
  constructor() {
    this.inputs = {};
    // Объект из инпутов (имя инпута: экземпляр инпута), как именованный массив
  }

  registerInput(Input) {
    // принадлежит ли классу Инпут
    if (Input instanceof _Input) {
      this.inputs[Input.name] = Input;
      return;
    }
    throw new Error("Input must be an instance of the Input class");
  }

  getValue(name) {
    return this.inputs[name].getValue();
  }

  getFormValues() {
    const form_data = {};
    for (const name in this.inputs) {
      form_data[name] = this.inputs[name].getValue();
    }
    return form_data;
  }

  formValid() {
    // прохожусь по значениями объекта (т.е. по экземплярам инпутов)
    return Object.values(this.inputs).every((i) => i.getValid());
  }

  validateInput(name) {
    this.inputs[name].handleValidate();
  }

  validateForm() {
    Object.values(this.inputs).forEach((i) => i.handleValidate());
  }

  onChangeInput(name, callback) {
    // записываю инпуту функцию, вызываемую, когда инпут меняется
    this.inputs[name].onChange(callback);
  }
}
