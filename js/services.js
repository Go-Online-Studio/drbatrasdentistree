/* ========================================================
   SERVICES.JS - Dynamic Service Grid via JSON + Isotope
   Dr. Batra's Dentistree
   ======================================================== */
(function () {
  "use strict";

  const SERVICES_URL = "data/services.json";
  const GRID_SELECTOR = "#servicesGrid";
  const FILTER_SELECTOR = ".filter-bar";
  let isoInstance = null;

  /**
   * Fetch services data from JSON
   */
  async function fetchServices() {
    try {
      const response = await fetch(SERVICES_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.error("[Services] Failed to load:", err);
      return [];
    }
  }

  /**
   * Build a single service card HTML string
   */
  function buildCardHTML(service) {
    return `
      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item ${service.category}">
        <div class="service-card reveal-item">
          <div class="card-icon">
            <iconify-icon icon="${service.icon}"></iconify-icon>
          </div>
          <h5>${service.title}</h5>
          <p class="card-desc">${service.shortDesc}</p>
          <a href="#" class="know-more" data-service="${service.id}">
            Know More
            <iconify-icon icon="ph:arrow-right-bold"></iconify-icon>
          </a>
        </div>
      </div>
    `;
  }

  /**
   * Render all service cards into the grid
   */
  function renderGrid(services, container) {
    const fragment = document.createDocumentFragment();
    const tempDiv = document.createElement("div");

    services.forEach((service) => {
      tempDiv.innerHTML = buildCardHTML(service);
      const cardEl = tempDiv.firstElementChild;
      if (cardEl) fragment.appendChild(cardEl);
    });

    container.innerHTML = "";
    container.appendChild(fragment);
  }

  /**
   * Initialize Isotope layout engine
   */
  function initIsotope(container) {
    // Wait for Iconify icons to render
    return new Promise((resolve) => {
      const checkReady = () => {
        if (typeof Isotope !== "undefined") {
          isoInstance = new Isotope(container, {
            itemSelector: ".grid-item",
            layoutMode: "fitRows",
            fitRows: { gutter: 0 },
            percentPosition: true,
            transitionDuration: "0.5s",
            stagger: 30,
          });
          resolve(isoInstance);
        } else {
          setTimeout(checkReady, 100);
        }
      };
      // Small delay to let icons load
      setTimeout(checkReady, 300);
    });
  }

  /**
   * Bind filter button clicks
   */
  function bindFilters() {
    const filterBar = document.querySelector(FILTER_SELECTOR);
    if (!filterBar || !isoInstance) return;

    filterBar.addEventListener("click", function (e) {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;

      const filterValue = btn.getAttribute("data-filter");
      isoInstance.arrange({ filter: filterValue });

      // Update active state
      filterBar.querySelectorAll(".filter-btn").forEach((b) =>
        b.classList.remove("active")
      );
      btn.classList.add("active");

      // Refresh GSAP ScrollTrigger if available
      if (typeof ScrollTrigger !== "undefined") {
        setTimeout(() => ScrollTrigger.refresh(), 600);
      }
    });
  }

  /**
   * Bind "Know More" clicks → WhatsApp
   */
  function bindKnowMore(container) {
    container.addEventListener("click", function (e) {
      const link = e.target.closest(".know-more");
      if (!link) return;
      e.preventDefault();

      const serviceId = link.dataset.service;
      const serviceTitle = link.closest(".service-card")?.querySelector("h5")?.textContent || serviceId;
      const phone = window.CLINIC_CONFIG?.whatsappNumber || "919879625787";
      const message = encodeURIComponent(
        `Hi Dr. Batra's Dentistree!\nI'd like to know more about your *${serviceTitle}* service.\nPlease share details.\n\nThank you!`
      );
      window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${message}`, "_blank");
    });
  }

  /* ── Main Initialization ── */
  document.addEventListener("DOMContentLoaded", async function () {
    const gridContainer = document.querySelector(GRID_SELECTOR);
    if (!gridContainer) return;

    // 1. Fetch & Render
    const services = await fetchServices();
    if (services.length === 0) {
      gridContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <iconify-icon icon="ph:warning-circle" style="font-size:2rem;color:var(--text-muted);"></iconify-icon>
          <p class="mt-3">Unable to load services. Please try again.</p>
        </div>
      `;
      return;
    }

    renderGrid(services, gridContainer);

    // 2. Initialize Isotope
    await initIsotope(gridContainer);

    // 3. Bind filter buttons
    bindFilters();

    // 4. Bind Know More → WhatsApp
    bindKnowMore(gridContainer);

    // Expose for external use (e.g., resize handler in script.js)
    window.servicesIso = isoInstance;
  });
})();
