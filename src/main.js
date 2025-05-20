import { Theme } from "./theme";
import { Input } from "./registrator/input";
import { Form } from "./registrator/form";
import { validators } from "./registrator/validators";

document.addEventListener("DOMContentLoaded", () => {
  new Theme("theme-toggle", "icon-light", "icon-dark");

  const name_validators = [
    validators.name_spec_symbols,
    validators.name_symbols,
    validators.length(1, 40),
  ];

  const email_validators = [
    validators.length(),
    validators.email,
    validators.email_structure,
    validators.email_local_symbols,
    validators.email_local_spec_symbols,
    validators.email_local_spec_borders,
    validators.email_domain_symbols,
  ];

  const pass_validators = [
    validators.pass_digits,
    validators.pass_cases,
    validators.pass_symbols,
    validators.length(8),
  ];

  const match_pass_validators = [
    validators.length(8),
    validators.matchPass(() => form.inputs[3].getValue()),
  ];

  const age_validators = [
    validators.length(),
    validators.year_valid,
    validators.old_enough,
  ];

  const form = new Form([
    new Input({
      name: "First name",
      type: "text",
      placeholder: "Your name is...",
      validators: name_validators,
      // оставил 40, тк погуглил и в среднем русские имена, фамилии длинною около 30 +-
    }),
    new Input({
      name: "Last name",
      type: "text",
      placeholder: "Enter your last name",
      validators: name_validators,
    }),
    new Input({
      name: "Email",
      type: "email",
      placeholder: "Enter your email",
      validators: email_validators,
    }),
    new Input({
      name: "Password",
      type: "password",
      placeholder: "Enter your password",
      desc: "Your password must be strong enough",
      validators: pass_validators,
    }),
    new Input({
      name: "Password confirm",
      type: "password",
      placeholder: "Repeat your password",
      validators: match_pass_validators,
    }),
    new Input({
      name: "Birth day",
      type: "date",
      placeholder: "When were you born?",
      desc: "You must be at least 18 years old",
      validators: age_validators,
    }),
    // Иконка календаря криво из-за паддинга справа, который ограничивает текст до иконки ✓/✗
    // такую конечно надо кастомную делать
  ]);

  form.render(".form-outer");
});
