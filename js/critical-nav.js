/* Navigation-critical bootstrap-free header injection */
(function () {
  "use strict";

  function injectNav() {
    var headerEl = document.getElementById("mainNavbar");
    if (!headerEl) return;
    if (headerEl.dataset.navReady === "true") return;
    headerEl.dataset.navReady = "true";

    headerEl.innerHTML = window.__DRB_NAV_HTML__ || "";
    if (!headerEl.innerHTML) return;

    var currentPage = window.location.pathname.split("/").pop() || "index.html";
    headerEl.querySelectorAll(".navbar-nav .nav-link").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href && href.split("?")[0].split("#")[0] === currentPage) {
        link.classList.add("active");
        var parentDropdown = link.closest(".dropdown");
        if (parentDropdown) {
          var toggle = parentDropdown.querySelector(".dropdown-toggle");
          if (toggle) toggle.classList.add("active");
        }
      }
    });
  }

  window.triggerServiceFilter = function (filter) {
    try {
      localStorage.setItem("activeServiceFilter", filter);
    } catch (_err) {}

    var offcanvasEl = document.getElementById("offcanvasNav");
    if (offcanvasEl && window.bootstrap && window.bootstrap.Offcanvas) {
      var bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvasEl) || new window.bootstrap.Offcanvas(offcanvasEl);
      bsOffcanvas.hide();
    }

    if (window.servicesIso) {
      var btn = document.querySelector('.filter-btn[data-filter="' + filter + '"]');
      if (btn) btn.click();
      var servicesSection = document.getElementById("filterBtnList");
      if (servicesSection) {
        var headerOffset = 100;
        var elementPosition = servicesSection.getBoundingClientRect().top;
        var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    } else {
      window.location.href = "index.html#services";
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectNav, { once: true });
  } else {
    injectNav();
  }
})();
