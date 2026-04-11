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

  function isValidIcon(icon) {
    return icon && icon.includes(':');
  }

  function renderServiceIcon(service) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-icon';

    if (isValidIcon(service.icon)) {
      wrapper.innerHTML = `<iconify-icon icon="${service.icon}"></iconify-icon>`;
    } 
    else if (service.image) {
      wrapper.innerHTML = `<img src="${service.image}" alt="${service.title}" loading="lazy">`;
    } 
    else {
      wrapper.innerHTML = `<div class="default-icon"></div>`;
    }

    return wrapper;
  }

  /**
   * Build a single service card HTML string
   */
  function buildCardHTML(service) {
    let pageLink = `${service.id}.html`;

    return `
      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item ${service.category}">
        <div class="service-card reveal-item">
          <h5>${service.title}</h5>
          <p class="card-desc">${service.shortDesc}</p>
          <a href="${pageLink}" class="know-more" data-service="${service.id}">
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
      const gridItem = tempDiv.firstElementChild;
      if (gridItem) {
        const card = gridItem.querySelector('.service-card');
        if (card) {
          card.prepend(renderServiceIcon(service));
        }
        fragment.appendChild(gridItem);
      }
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

      // Local storage logic
      if (filterValue === "*") {
        localStorage.removeItem("activeServiceFilter");
      } else {
        localStorage.setItem("activeServiceFilter", filterValue);
      }

      // Update active state
      filterBar.querySelectorAll(".filter-btn").forEach((b) =>
        b.classList.remove("active")
      );
      btn.classList.add("active");

      // Refresh GSAP ScrollTrigger if available
      if (typeof ScrollTrigger !== "undefined") {
        setTimeout(() => ScrollTrigger.refresh(), 600);
      }

      // Smooth scroll to focus on the services section 
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        const headerOffset = 100; // Account for sticky navbar height
        const elementPosition = servicesSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    });
  }

  /**
   * Bind "Know More" clicks → WhatsApp
   */
  // function bindKnowMore(container) {
  //   container.addEventListener("click", function (e) {
  //     const link = e.target.closest(".know-more");
  //     if (!link) return;
  //     e.preventDefault();

  //     const serviceId = link.dataset.service;
  //     const serviceTitle = link.closest(".service-card")?.querySelector("h5")?.textContent || serviceId;
  //     const phone = window.CLINIC_CONFIG?.whatsappNumber || "919879625787";
  //     const message = encodeURIComponent(
  //       `Hi Dr. Batra's Dentistree!\nI'd like to know more about your *${serviceTitle}* service.\nPlease share details.\n\nThank you!`
  //     );
  //     window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${message}`, "_blank");
  //   });
  // }

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

    // Apply localStorage filter if exists
    const savedFilter = localStorage.getItem("activeServiceFilter");
    if (savedFilter && savedFilter !== "*") {
      isoInstance.arrange({ filter: savedFilter });
      const filterBar = document.querySelector(FILTER_SELECTOR);
      if (filterBar) {
        filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        const activeBtn = filterBar.querySelector(`.filter-btn[data-filter="${savedFilter}"]`);
        if (activeBtn) activeBtn.classList.add("active");
      }
    }

    // 3. Bind filter buttons
    bindFilters();

    // 4. Bind Know More → WhatsApp
    // bindKnowMore(gridContainer);

    // Expose for external use (e.g., resize handler in script.js)
    window.servicesIso = isoInstance;
  });
})();
