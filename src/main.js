import { Input } from "./registrator/input";
import { Form } from "./registrator/form";

document.addEventListener("DOMContentLoaded", () => {
  // регулярки мне иишка сделала
  const validators = {
    name: (value) => {
      const valid = /^[A-Za-zА-Яа-яёЁ'\\-]{2,40}$/.test(value.trim());
      if (!valid) return "Only letters, hyphens and apostrophes are allowed";
      return null;
    },
    email: (value) => {
      const valid = /^\S+@\S+\.\S+$/.test(value.trim());
      return valid ? null : "Incorrect email";
    },

    pass: (value) => {
      if (value.length < 8) return "At least 8 characters";
      if (!/[a-z]/.test(value)) return "At least one lowercase letter";
      if (!/[A-Z]/.test(value)) return "At least one uppercase letter";
      if (!/[0-9]/.test(value)) return "At least one digit";
      if (!/[^a-zA-Z0-9]/.test(value)) return "At least one special character";
      return null;
    },

    matchPass: (getPasswordValue) => (value) => {
      return value === getPasswordValue() ? null : "Passwords do not match";
    },

    age: (value) => {
      if (!value) return "Required";
      const birthDate = new Date(value);
      const now = new Date();
      const age = now.getFullYear() - birthDate.getFullYear();
      const isOldEnough =
        age > 18 ||
        (age === 18 &&
          (now.getMonth() > birthDate.getMonth() ||
            (now.getMonth() === birthDate.getMonth() &&
              now.getDate() >= birthDate.getDate())));
      const isYearValid = birthDate.getFullYear() >= 1901;
      if (!isYearValid) return "Year must be 1901 or later";
      return isOldEnough ? null : "You must be at least 18 years old";
    },
  };

  const form = new Form([
    new Input("First name", "text", "Your name is...", [validators.name]),
    new Input("Last name", "text", "Enter your last name", [validators.name]),
    new Input("Email", "email", "Enter your email", [validators.email]),
    new Input("Password", "password", "Enter your password", [validators.pass]),
    new Input("Password confirm", "password", "Repeat your password", [
      validators.matchPass(() => form.inputs[3].getValue()),
    ]),
    new Input("Birth day", "date", "When were you born?", [validators.age]),
  ]);

  form.render(".form-outer");
});
