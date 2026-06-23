/* ========================================================
   CRITICAL.JS - Navbar Injection & Sticky Header Logic
   Dr. Batra's Dentistree
   ======================================================== */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const headerEl = document.getElementById("mainNavbar");
  if (!headerEl) return;

  /* ── Global Filter Trigger for Navbar Links ── */
  window.triggerServiceFilter = function (filter) {
    localStorage.setItem('activeServiceFilter', filter);

    // Close offcanvas if mobile menu is open
    const offcanvasEl = document.getElementById('offcanvasNav');
    if (offcanvasEl) {
      const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
      bsOffcanvas.hide();
    }

    if (window.servicesIso) {
      // If we are already on index.html with grid loaded, trigger the filter button directly
      const btn = document.querySelector('.filter-btn[data-filter="' + filter + '"]');
      if (btn) btn.click();

      // Smooth scroll to the services section, offset for sticky header
      const servicesSection = document.getElementById('filterBtnList');
      if (servicesSection) {
        const headerOffset = 100; // Account for sticky navbar height
        const elementPosition = servicesSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    } else {
      // If on another page, just navigate to index.html
      window.location.href = 'index.html#services';
    }
  };

  /* ── Navigation Setup ── */

  /* ── Active Link Detection ── */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  headerEl.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.split("?")[0].split("#")[0] === currentPage) {
      link.classList.add("active");
      const parentDropdown = link.closest(".dropdown");
      if (parentDropdown) {
        parentDropdown.querySelector(".dropdown-toggle")?.classList.add("active");
      }
    }
  });

  /* ── Sticky Header Scroll Effect ── */
  const stickyNav = document.getElementById("stickyNav");
  if (stickyNav) {
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      if (scrollY > 80) {
        stickyNav.classList.add("scrolled");
      } else {
        stickyNav.classList.remove("scrolled");
      }
      lastScroll = scrollY;
    }, { passive: true });
  }
});