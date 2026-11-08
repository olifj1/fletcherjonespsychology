const header = document.getElementById("siteHeader");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 18);
}

window.addEventListener("scroll", updateHeader, { passive: true });
document.getElementById("year").textContent = new Date().getFullYear();
updateHeader();

// Clean up the old offline/app service worker for anyone who visited before it was removed.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()));
}
