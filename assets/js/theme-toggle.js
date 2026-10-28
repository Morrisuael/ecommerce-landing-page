(() => {
  const storageKey = "kagalarimart-theme";
  const previousStorageKey = "megamart-theme";
  const validThemes = ["light", "dark"];

  function readTheme() {
    try {
      const savedTheme = localStorage.getItem(storageKey) || localStorage.getItem(previousStorageKey);
      if (validThemes.includes(savedTheme)) localStorage.setItem(storageKey, savedTheme);
      return validThemes.includes(savedTheme) ? savedTheme : "light";
    } catch (error) {
      console.warn("Theme preference could not be read from local storage.", error);
      return "light";
    }
  }

  function applyTheme(theme) {
    const activeTheme = validThemes.includes(theme) ? theme : "light";
    document.documentElement.dataset.theme = activeTheme;
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const darkModeEnabled = activeTheme === "dark";
      button.setAttribute("aria-pressed", String(darkModeEnabled));
      button.setAttribute("aria-label", `Switch to ${darkModeEnabled ? "light" : "dark"} mode`);
      button.title = `Switch to ${darkModeEnabled ? "light" : "dark"} mode`;
      button.querySelector("[data-theme-icon]").textContent = darkModeEnabled ? "☀" : "☾";
    });
  }

  // Apply the stored choice before stylesheets render to avoid a light-mode flash.
  applyTheme(readTheme());

  document.addEventListener("DOMContentLoaded", () => {
    applyTheme(document.documentElement.dataset.theme);
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        try {
          localStorage.setItem(storageKey, nextTheme);
          localStorage.removeItem(previousStorageKey);
        } catch (error) {
          console.warn("Theme preference could not be saved to local storage.", error);
        }
      });
    });
  });

  window.addEventListener("storage", (event) => {
    if (event.key === storageKey) applyTheme(event.newValue);
    if (event.key === previousStorageKey) applyTheme(readTheme());
  });
})();
