const pages = [...document.querySelectorAll("[data-page]")];
const navLinks = [...document.querySelectorAll("[data-route]")];
const header = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const siteNav = document.getElementById("siteNav");
let reloadingForServiceWorker = false;

function getRoute() {
  const route = location.hash.replace("#", "").trim();
  return pages.some(page => page.dataset.page === route) ? route : "home";
}

function closeMenu() {
  siteNav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  document.body.classList.remove("menu-open");
}

function showRoute() {
  const route = getRoute();

  pages.forEach(page => {
    page.classList.toggle("active", page.dataset.page === route);
  });

  navLinks.forEach(link => {
    const active = link.dataset.route === route;
    link.classList.toggle("active", active);
    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  closeMenu();
  window.scrollTo({ top: 0, behavior: "instant" });
  document.title = route === "home"
    ? "Fletcher-Jones Psychology"
    : `${route === "about" ? "About Kathryn" : "Contact"} | Fletcher-Jones Psychology`;
}

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 18);
}

menuButton.addEventListener("click", () => {
  const opening = menuButton.getAttribute("aria-expanded") !== "true";
  siteNav.classList.toggle("open", opening);
  menuButton.setAttribute("aria-expanded", String(opening));
  menuButton.setAttribute("aria-label", opening ? "Close navigation" : "Open navigation");
  document.body.classList.toggle("menu-open", opening);
});

window.addEventListener("hashchange", showRoute);
window.addEventListener("scroll", updateHeader, { passive: true });
document.getElementById("year").textContent = new Date().getFullYear();

showRoute();
updateHeader();

function preventGestureZoom() {
  document.addEventListener("gesturestart", event => event.preventDefault(), { passive: false });

  let lastTouchEnd = 0;
  document.addEventListener("touchend", event => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, { passive: false });
}
preventGestureZoom();

async function updateServiceWorkerRegistration(registration) {
  try {
    await registration.update();
  } catch (error) {
    console.debug("Service worker update check skipped:", error);
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register("./sw.js");
      updateServiceWorkerRegistration(registration);

      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
          updateServiceWorkerRegistration(registration);
        }
      });

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (reloadingForServiceWorker) return;
        reloadingForServiceWorker = true;
        window.location.reload();
      });
    } catch (error) {
      console.warn("Service worker registration failed:", error);
    }
  });
}
