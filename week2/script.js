// Light/dark theme toggle. The choice is saved in localStorage.
(() => {
  const root = document.documentElement;
  const KEY = "theme";
  const osDark = window.matchMedia("(prefers-color-scheme: dark)");
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) root.dataset.theme = saved;
  } catch (e) { /* storage unavailable: fall back to the OS setting */ }

  const current = () => root.dataset.theme || (osDark.matches ? "dark" : "light");

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    const sync = () => btn.setAttribute("aria-pressed", String(current() === "dark"));
    btn.addEventListener("click", () => {
      const next = current() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem(KEY, next); } catch (e) {}
      sync();
    });
    sync();
  });
})();
