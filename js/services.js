/* ========================================================
   SERVICES.JS - Dynamic Service Grid via JSON + Isotope
   + Mobile Swiper Carousel (≤768px)
   Dr. Batra's Dentistree
   ======================================================== */
(function () {
  "use strict";

  const SERVICES_URL = "data/services.json";
  const GRID_SELECTOR = "#servicesGrid";
  const FILTER_SELECTOR = ".filter-bar";
  const MOBILE_WRAPPER_ID = "servicesMobileWrapper";
  const MOBILE_BREAKPOINT = 768;

  let isoInstance = null;
  let mobileSwiper = null;
  let allServices = []; // cached services data for re-rendering

  /**
   * Check if we are currently at mobile viewport
   */
  function isMobile() {
    return window.innerWidth < MOBILE_BREAKPOINT;
  }

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
   * Build a single service card HTML string (for desktop Isotope grid)
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
   * Build a single Swiper slide HTML string (for mobile)
   */
  function buildSwiperSlideHTML(service) {
    let pageLink = `${service.id}.html`;

    return `
      <div class="swiper-slide" data-category="${service.category}">
        <div class="service-card">
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
   * Render all service cards into the desktop grid
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
   * Render all service slides into the mobile Swiper wrapper
   */
  function renderMobileSlides(services) {
    const mobileWrapper = document.getElementById(MOBILE_WRAPPER_ID);
    if (!mobileWrapper) return;

    const fragment = document.createDocumentFragment();
    const tempDiv = document.createElement("div");

    services.forEach((service) => {
      tempDiv.innerHTML = buildSwiperSlideHTML(service);
      const slide = tempDiv.firstElementChild;
      if (slide) {
        const card = slide.querySelector('.service-card');
        if (card) {
          card.prepend(renderServiceIcon(service));
        }
        fragment.appendChild(slide);
      }
    });

    mobileWrapper.innerHTML = "";
    mobileWrapper.appendChild(fragment);
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
   * Initialize or re-initialize mobile Swiper with only visible (filtered) slides
   */
  function initMobileSwiper(filterValue) {
    if (typeof Swiper === "undefined") return;

    // Destroy existing instance cleanly
    destroyMobileSwiper();

    const mobileWrapper = document.getElementById(MOBILE_WRAPPER_ID);
    if (!mobileWrapper) return;

    // Show/hide slides based on the current filter
    const allSlides = mobileWrapper.querySelectorAll('.swiper-slide');
    allSlides.forEach((slide) => {
      const cat = slide.getAttribute('data-category');
      if (!filterValue || filterValue === '*') {
        slide.style.display = '';
        slide.classList.remove('swiper-slide-hidden');
      } else {
        // filterValue is like ".dental-services" — strip the leading dot
        const filterCat = filterValue.replace(/^\./, '');
        if (cat === filterCat) {
          slide.style.display = '';
          slide.classList.remove('swiper-slide-hidden');
        } else {
          slide.style.display = 'none';
          slide.classList.add('swiper-slide-hidden');
        }
      }
    });

    // Count visible slides
    const visibleCount = mobileWrapper.querySelectorAll('.swiper-slide:not(.swiper-slide-hidden)').length;
    if (visibleCount === 0) return;

    mobileSwiper = new Swiper('.servicesMobileSwiper', {
      slidesPerView: 1.2,
      spaceBetween: 16,
      centeredSlides: true,
      loop: visibleCount > 2,
      speed: 500,
      grabCursor: true,
      pagination: {
        el: '.services-mobile-pagination',
        clickable: true,
        dynamicBullets: visibleCount > 7,
      },
      breakpoints: {
        400: {
          slidesPerView: 1.25,
          spaceBetween: 18,
        },
        500: {
          slidesPerView: 1.4,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 1.6,
          spaceBetween: 20,
        },
      },
    });
  }

  /**
   * Destroy mobile Swiper instance cleanly
   */
  function destroyMobileSwiper() {
    if (mobileSwiper && typeof mobileSwiper.destroy === 'function') {
      mobileSwiper.destroy(true, true);
      mobileSwiper = null;
    }
  }

  /**
   * Get the current active filter value
   */
  function getCurrentFilter() {
    const activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) {
      return activeBtn.getAttribute('data-filter');
    }
    return '*';
  }

  /**
   * Bind filter button clicks
   */
  function bindFilters() {
    const filterBar = document.querySelector(FILTER_SELECTOR);
    if (!filterBar) return;

    filterBar.addEventListener("click", function (e) {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;

      const filterValue = btn.getAttribute("data-filter");

      // Update active state
      filterBar.querySelectorAll(".filter-btn").forEach((b) =>
        b.classList.remove("active")
      );
      btn.classList.add("active");

      // Local storage logic
      if (filterValue === "*") {
        localStorage.removeItem("activeServiceFilter");
      } else {
        localStorage.setItem("activeServiceFilter", filterValue);
      }

      if (isMobile()) {
        // ── MOBILE: Update Swiper ──
        initMobileSwiper(filterValue);
      } else {
        // ── DESKTOP: Update Isotope ──
        if (isoInstance) {
          isoInstance.arrange({ filter: filterValue });
        }
      }

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
   * Handle responsive mode switching (resize)
   */
  function handleResponsiveSwitch() {
    const currentFilter = getCurrentFilter();

    if (isMobile()) {
      // We're on mobile — make sure Swiper is active
      if (!mobileSwiper) {
        initMobileSwiper(currentFilter);
      }
    } else {
      // We're on desktop/tablet — destroy Swiper, ensure Isotope layout
      destroyMobileSwiper();
      if (isoInstance) {
        isoInstance.layout();
      }
    }
  }

  /**
   * Debounce utility
   */
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
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

    // Cache services for responsive re-use
    allServices = services;

    // 2. Render both containers (CSS controls visibility)
    renderGrid(services, gridContainer);
    renderMobileSlides(services);

    // 3. Initialize Isotope (always init — it won't conflict since grid is hidden on mobile via CSS)
    await initIsotope(gridContainer);

    // 4. Apply localStorage filter if exists
    const savedFilter = localStorage.getItem("activeServiceFilter");
    if (savedFilter && savedFilter !== "*") {
      // Update Isotope
      if (isoInstance) {
        isoInstance.arrange({ filter: savedFilter });
      }

      // Update filter bar active state
      const filterBar = document.querySelector(FILTER_SELECTOR);
      if (filterBar) {
        filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        const activeBtn = filterBar.querySelector(`.filter-btn[data-filter="${savedFilter}"]`);
        if (activeBtn) activeBtn.classList.add("active");
      }
    }

    // 5. Initialize mobile Swiper if on mobile
    if (isMobile()) {
      const currentFilter = savedFilter || '*';
      initMobileSwiper(currentFilter);
    }

    // 6. Bind filter buttons
    bindFilters();

    // 7. Listen for window resize to switch modes
    window.addEventListener("resize", debounce(handleResponsiveSwitch, 250));

    // 8. Expose for external use (e.g., resize handler in script.js, triggerServiceFilter in critical.js)
    window.servicesIso = isoInstance;
  });
})();
