const DARK_THEME = "dark",
  LIGHT_THEME = "light";
export class Theme {
  constructor(btn, light_icon, dark_icon) {
    this.btn = document.getElementById(btn);
    this.light_icon = document.getElementById(light_icon);
    this.dark_icon = document.getElementById(dark_icon);
    this.root = document.documentElement;
    this.init();
  }

  init() {
    this.setTheme(this.getTheme());
    this.btn.onclick = () => this.setTheme(this.toggleTheme());
  }

  getTheme() {
    return (
      localStorage.getItem("theme") || this.root.dataset.theme || DARK_THEME
    );
  }

  toggleTheme() {
    return this.getTheme() === DARK_THEME ? LIGHT_THEME : DARK_THEME;
  }

  setTheme(theme) {
    this.root.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    this.light_icon.classList.toggle("hidden", theme === LIGHT_THEME);
    this.dark_icon.classList.toggle("hidden", theme === DARK_THEME);
  }
}
