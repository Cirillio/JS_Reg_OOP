function isLetter(char) {
  return char.toLowerCase() !== char.toUpperCase();
  //  если есть различия у регистров символа, то скорее всего этодействительно буква
}
function isDigit(char) {
  return char >= "0" && char <= "9";
}

const name_specials = ["-", "'"];
const email_specials = ["-", "_", "."];

export const validators = {
  length:
    (min = null, max = null) =>
    (value) => {
      if (value === null) value = "";
      const msg =
        value.length < 1
          ? "Required"
          : value.length < min && min
          ? `At least ${min} characters`
          : value.length > max && max
          ? `At most ${max} characters`
          : null;

      if (msg) {
        throw { id: 303, msg };
      }
    },
  name_spec_symbols: (value) => {
    const check_spec_symbols = value
      .trim()
      .split("")
      .filter((sym, i) => {
        return (
          name_specials.includes(sym) &&
          (sym === value[i - 1] || sym === value[i + 1])
        );
      });

    if (check_spec_symbols.length > 0) {
      throw {
        id: 303,
        msg: "Repeating special characters are not allowed",
      };
    }
  },

  name_symbols: (value) => {
    for (const sym of value) {
      if (!isLetter(sym) && !name_specials.includes(sym)) {
        throw {
          id: 302,
          msg: "Only letters, hyphens and apostrophes are allowed",
        };
      }
    }
  },
  // Коды ошибок условные)

  email: (value) => {
    const trimmed = value.trim();

    const [local, domain] = trimmed.split("@");

    if (!local || !domain) {
      throw { id: 341, msg: "Invalid email structure" };
    }
  },

  email_structure: (value) => {
    if (!value.trim().includes("@") || !value.trim().includes(".")) {
      throw { id: 313, msg: "Must contain '@' and '.'" };
    }
  },

  email_local_symbols: (value) => {
    const [local, domain] = value.trim().split("@");
    if (!local) return;

    for (const sym of local) {
      if (!isLetter(sym) && !isDigit(sym) && !email_specials.includes(sym)) {
        throw {
          id: 317,
          msg: "Only letters, digits, hyphens, underscores and dots are allowed",
        };
      }
    }
  },

  email_local_spec_symbols: (value) => {
    const [local, domain] = value.trim().split("@");
    if (!local) return;

    const email_specials = ["-", "_", "."];
    const check_spec_symbols = local
      .trim()
      .split("")
      .filter((sym, i) => {
        return (
          email_specials.includes(sym) &&
          (sym === local[i - 1] || sym === local[i + 1])
        );
      });

    if (check_spec_symbols.length > 0) {
      throw {
        id: 304,
        msg: "Repeating special characters are not allowed",
      };
    }
  },

  email_local_spec_borders: (value) => {
    const [local, domain] = value.trim().split("@");
    if (!local) return;

    const start = local[0];
    const end = local[local.length - 1];

    if (email_specials.includes(start) || email_specials.includes(end)) {
      throw {
        id: 311,
        msg: "Special characters are not allowed at the beginning and end",
      };
    }
  },

  email_domain_symbols: (value) => {
    const [local, domain] = value.trim().split("@");

    if (!domain) return;

    function validDomain(domain) {
      const trimmed = domain.trim();
      const parts = trimmed.split(".");

      if (parts.length !== 2 || parts.some((p) => p.length === 0)) return false;

      for (const part of parts) {
        for (const char of part) {
          if (!isLetter(char) && !isDigit(char)) return false;
        }
      }

      return true;
    }

    if (!validDomain(domain)) {
      throw {
        id: 309,
        msg: "Email domain must contain only letters and digits separated by one dot",
      };
    }
  },

  pass_digits: (value) => {
    const pass_symbols = value
      .trim()
      .split("")
      .some((sym) => isDigit(sym));

    if (!pass_symbols) {
      throw {
        id: 333,
        msg: "Password must contain at least one digit",
      };
    }
  },

  pass_symbols: (value) => {
    const pass_symbols = value
      .trim()
      .split("")
      .some((sym) => !isLetter(sym) && !isDigit(sym));

    if (!pass_symbols) {
      throw {
        id: 334,
        msg: "Password must contain at least one special symbol",
      };
    }
  },

  pass_cases: (value) => {
    function isUpper(char) {
      return char === char.toUpperCase() && char !== char.toLowerCase();
    }

    function isLower(char) {
      return char === char.toLowerCase() && char !== char.toUpperCase();
    }

    const uppers = value.trim().split("").filter(isUpper);
    const lowers = value.trim().split("").filter(isLower);

    if (uppers.length < 1 || lowers.length < 1) {
      throw {
        id: 335,
        msg: "Password must contain at least one uppercase and lowercase letter",
      };
    }
  },

  matchPass: (getPasswordValue) => (value) => {
    const pass = getPasswordValue();
    if (value !== pass) {
      throw {
        id: 336,
        msg: "Passwords do not match",
      };
    }
  },

  year_valid: (value) => {
    const birthDate = new Date(value);
    const year = birthDate.getFullYear();

    if (year < 1901 || birthDate > new Date()) {
      throw {
        id: 340,
        msg: "Year must be greater than 1901 and not in the future =)",
      };
    }
  },

  old_enough: (value) => {
    const birthDate = new Date(value);
    const now = new Date();

    const age = now.getFullYear() - birthDate.getFullYear();
    const isOldEnough =
      age > 18 ||
      (age === 18 &&
        (now.getMonth() > birthDate.getMonth() ||
          (now.getMonth() === birthDate.getMonth() &&
            now.getDate() >= birthDate.getDate())));

    if (!isOldEnough) {
      throw { id: 339, msg: "Your age is too small" };
    }
  },
};
