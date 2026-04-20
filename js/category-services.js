/* ========================================================
   CATEGORY-SERVICES.JS - Dynamic Service Grid for Categories
   Dr. Batra's Dentistree
   ======================================================== */
(function () {
  "use strict";

  const SERVICES_URL = "data/services.json";
  const GRID_SELECTOR = "#servicesGrid";
  const MOBILE_WRAPPER_ID = "servicesMobileWrapper";
  const MOBILE_BREAKPOINT = 768;

  let mobileSwiper = null;

  function isMobile() {
    return window.innerWidth < MOBILE_BREAKPOINT;
  }

  function isValidIcon(icon) {
    return icon && icon.includes(':');
  }

  function renderServiceIcon(service) {
    const wrapper = document.createElement('div');
    wrapper.className = 'card-icon';

    if (isValidIcon(service.icon)) {
      wrapper.innerHTML = `<iconify-icon icon="${service.icon}"></iconify-icon>`;
    } else if (service.image) {
      wrapper.innerHTML = `<img src="${service.image}" alt="${service.title}" loading="lazy">`;
    } else {
      wrapper.innerHTML = `<div class="default-icon"></div>`;
    }
    return wrapper;
  }

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

  async function fetchServices() {
    try {
      const response = await fetch(SERVICES_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (err) {
      console.error("[Category Services] Failed to load:", err);
      return [];
    }
  }

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

  function initMobileSwiper(servicesCount) {
    if (typeof Swiper === "undefined") return;
    
    if (mobileSwiper && typeof mobileSwiper.destroy === 'function') {
      mobileSwiper.destroy(true, true);
      mobileSwiper = null;
    }

    if (servicesCount === 0) return;

    mobileSwiper = new Swiper('.servicesMobileSwiper', {
      slidesPerView: 1.2,
      spaceBetween: 16,
      centeredSlides: true,
      loop: servicesCount > 2,
      speed: 500,
      grabCursor: true,
      pagination: {
        el: '.services-mobile-pagination',
        clickable: true,
        dynamicBullets: servicesCount > 7,
      },
      breakpoints: {
        400: { slidesPerView: 1.25, spaceBetween: 18 },
        500: { slidesPerView: 1.4, spaceBetween: 20 },
        640: { slidesPerView: 1.6, spaceBetween: 20 },
      },
    });
  }

  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  document.addEventListener("DOMContentLoaded", async function () {
    const gridContainer = document.querySelector(GRID_SELECTOR);
    if (!gridContainer) return;

    const allServices = await fetchServices();
    if (allServices.length === 0) {
      gridContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <iconify-icon icon="ph:warning-circle" style="font-size:2rem;color:var(--text-muted);"></iconify-icon>
          <p class="mt-3">Unable to load services. Please try again.</p>
        </div>
      `;
      return;
    }

    const filterCat = window.CATEGORY_FILTER || 'dental-services';
    const services = allServices.filter(s => s.category === filterCat);

    renderGrid(services, gridContainer);
    renderMobileSlides(services);

    if (typeof ScrollTrigger !== "undefined" && typeof gsap !== "undefined") {
      setTimeout(() => ScrollTrigger.refresh(), 300);
    }

    function handleResponsiveSwitch() {
      if (isMobile()) {
        if (!mobileSwiper) {
          initMobileSwiper(services.length);
        }
      } else {
        if (mobileSwiper && typeof mobileSwiper.destroy === 'function') {
          mobileSwiper.destroy(true, true);
          mobileSwiper = null;
        }
      }
    }

    if (isMobile()) {
      initMobileSwiper(services.length);
    }

    window.addEventListener("resize", debounce(handleResponsiveSwitch, 250));
  });
})();
