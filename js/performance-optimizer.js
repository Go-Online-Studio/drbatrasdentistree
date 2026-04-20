/* Performance optimizer: FCP-first loader + progressive libraries */
(function () {
  "use strict";

  const state = {
    loaderHidden: false,
    gsapRequested: false,
    fancyRequested: false,
    swiperRequested: false,
    isotopeRequested: false,
    iconifyRequested: false,
  };

  function hideLoader() {
    if (state.loaderHidden) return;
    state.loaderHidden = true;
    document.documentElement.classList.add("fcp-ready");
    const preloader = document.getElementById("preloader");
    if (preloader) {
      preloader.classList.add("preloader-hidden");
      window.setTimeout(function () {
        if (preloader && preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, 360);
    }
    document.body.classList.remove("loading");
  }

  function setupFastLoaderDismiss() {
    const maxWait = 800;
    window.setTimeout(hideLoader, maxWait);

    if ("PerformanceObserver" in window) {
      try {
        const po = new PerformanceObserver(function (list) {
          if (list.getEntries().length > 0) {
            hideLoader();
            po.disconnect();
          }
        });
        po.observe({ type: "paint", buffered: true });
      } catch (_err) {
        window.requestAnimationFrame(hideLoader);
      }
    } else {
      window.requestAnimationFrame(hideLoader);
    }
  }

  function whenIdle(cb) {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(cb, { timeout: 1200 });
    } else {
      window.setTimeout(cb, 250);
    }
  }

  function loadGSAPIfNeeded() {
    if (state.gsapRequested || !window.LazyAssets) return;
    if (!document.querySelector(".gsap-fade-up, .gsap-text-reveal, [data-animate]")) return;
    state.gsapRequested = true;
    Promise.all([
      window.LazyAssets.loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"),
      window.LazyAssets.loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"),
    ]).then(function () {
      if (window.AppUtils && typeof window.AppUtils.initGenericGSAP === "function") {
        window.AppUtils.initGenericGSAP();
      }
    }).catch(function () {});
  }

  function loadIconifyIfNeeded() {
    if (state.iconifyRequested || !window.LazyAssets) return;
    if (!document.querySelector("iconify-icon")) return;
    state.iconifyRequested = true;
    window.LazyAssets.loadScript("https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js").catch(function () {});
  }

  function loadFancyboxIfNeeded() {
    if (state.fancyRequested || !window.LazyAssets) return;
    if (!document.querySelector("[data-fancybox]")) return;
    state.fancyRequested = true;
    Promise.all([
      window.LazyAssets.loadStyle("https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css"),
      window.LazyAssets.loadScript("https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"),
    ]).then(function () {
      if (window.Fancybox) {
        window.Fancybox.bind("[data-fancybox]", {
          Thumbs: false,
          Toolbar: { display: { left: [], middle: [], right: ["close"] } },
        });
      }
    }).catch(function () {});
  }

  function loadSwiperIfNeeded() {
    if (state.swiperRequested || !window.LazyAssets) return;
    if (!document.querySelector(".swiper")) return;
    state.swiperRequested = true;
    Promise.all([
      window.LazyAssets.loadStyle("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"),
      window.LazyAssets.loadScript("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"),
    ]).catch(function () {});
  }

  function loadIsotopeIfNeeded() {
    if (state.isotopeRequested || !window.LazyAssets) return;
    if (!document.querySelector(".grid, .gallery-grid")) return;
    state.isotopeRequested = true;
    window.LazyAssets.loadScript("https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js").catch(function () {});
  }

  function setupViewportDrivenLoading() {
    if (!("IntersectionObserver" in window)) {
      loadGSAPIfNeeded();
      loadSwiperIfNeeded();
      loadIsotopeIfNeeded();
      loadFancyboxIfNeeded();
      return;
    }

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.matches(".gsap-fade-up, .gsap-text-reveal, [data-animate]")) loadGSAPIfNeeded();
        if (el.matches(".swiper, .heroSwiper, .testimonialSwiper, .servicesMobileSwiper")) loadSwiperIfNeeded();
        if (el.matches(".grid, .gallery-grid")) loadIsotopeIfNeeded();
        if (el.matches("[data-fancybox]")) loadFancyboxIfNeeded();
        io.unobserve(el);
      });
    }, { rootMargin: "250px 0px" });

    document.querySelectorAll(".gsap-fade-up, .gsap-text-reveal, [data-animate], .swiper, .heroSwiper, .testimonialSwiper, .servicesMobileSwiper, .grid, .gallery-grid, [data-fancybox]").forEach(function (el) {
      io.observe(el);
    });
  }

  function setupInteractionDrivenLoading() {
    document.addEventListener("pointerdown", function () {
      loadIconifyIfNeeded();
      whenIdle(loadGSAPIfNeeded);
    }, { once: true, passive: true });

    document.addEventListener("click", function (e) {
      const t = e.target;
      if (!t) return;
      if (t.closest("[data-fancybox]")) loadFancyboxIfNeeded();
      if (t.closest(".gallery-filter-btn")) loadIsotopeIfNeeded();
      if (t.closest(".navbar-toggler")) {
        if (window.LazyAssets) {
          window.LazyAssets.loadScript("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js").catch(function () {});
        }
      }
    }, { passive: true });
  }

  function boot() {
    setupFastLoaderDismiss();
    loadIconifyIfNeeded();
    setupViewportDrivenLoading();
    setupInteractionDrivenLoading();
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("service-worker.js").catch(function () {});
      }, { once: true });
    }
    whenIdle(function () {
      loadGSAPIfNeeded();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
