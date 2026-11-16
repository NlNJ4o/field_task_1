// Dark / light mode
const root = document.documentElement;
const themeBtn = document.getElementById("theme-toggle");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeBtn.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
  );
}

// We read the saved preference, and if none exists, we use the device setting
let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(saved || (prefersDark ? "dark" : "light"));

themeBtn.addEventListener("click", function () {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Copy email to clipboard
const copyBtn = document.getElementById("copy-email");
const emailLink = document.getElementById("email");

copyBtn.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(emailLink.textContent);
    copyBtn.textContent = "Copied";
  } catch (e) {
    copyBtn.textContent = "Copy failed";
  }
  setTimeout(function () { copyBtn.textContent = "Copy email"; }, 2000);
});

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();