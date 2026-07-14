/* ========================================================
   SCRIPT.JS - Global UI, Footer, FABs, GSAP & Animations
   Dr. Batra's Dentistree
   ======================================================== */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  /* ── Global Config ── */
  const CONFIG = {
    whatsappNumber: "919879625787",
    whatsappMessage:
      "Hi Dr. Batra's Dentistree! I'd like to book an appointment.\n\nPlease share available slots.\n\nThank you!",
    clinicName: "Dr. Batra's Dentistree",
    animationDuration: 800,
  };
  window.CLINIC_CONFIG = CONFIG;

  /* ══════════════════════════════════════════════
     1. FOOTER INJECTION
     ══════════════════════════════════════════════ */

  /* <div class="footer-map">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3689.978310763274!2d73.1992098!3d22.3544478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fcf9988a9773b%3A0x2b808d0c55732bc2!2sDr.%20Batra&#39;s%20Dentistree!5e0!3m2!1sen!2sin!4v1775815107268!5m2!1sen!2sin"
    allowfullscreen="" loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
    title="Dr. Batra's Dentistree Location">
  </iframe>
</div> */

  const footerEl = document.getElementById("footer");
  if (footerEl) {
    footerEl.classList.add("clinic-footer", "spacer-y");
    footerEl.innerHTML = `
      <div class="container">
        <div class="row gy-5 mb-5">
          <!-- Col 1: About & Social -->
          <div class="col-lg-3 col-md-6">
            <img src="img/DR_BatraDentistreeLogoFooter.webp" alt="DR Batra Dentistree Logo" class="footer-logo">
            <p class="footer-desc">
              Your smile is in expert hands. We provide world-class dental care using cutting-edge technology and a patient-first approach. Every treatment is designed for lasting results.
            </p>
            <div class="footer-social">
              <a href="https://www.facebook.com/drbatrasdentistree/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><iconify-icon icon="mdi:facebook"></iconify-icon></a>
              <a href="https://www.instagram.com/dr.batras_dentistree/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><iconify-icon icon="mdi:instagram"></iconify-icon></a>
              <a href="https://www.youtube.com/@DrBatrasDentistree" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><iconify-icon icon="mdi:youtube"></iconify-icon></a>
              <a href="https://www.linkedin.com/company/dr-batra-s-dentistree-clinic/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><iconify-icon icon="mdi:linkedin"></iconify-icon></a>
            </div>
          </div>

          <!-- Col 2: Quick Links -->
          <div class="col-lg-2 col-md-6">
            <h5 class="footer-heading">Quick Links</h5>
            <ul class="footer-links footer-links1">
              <li><a href="index.html">Home</a></li>
              <li><a href="about-clinic.html">About Us</a></li>
              <li><a href="index.html#services">Our Treatments</a></li>
              <li><a href="gallery.html">Gallery</a></li>
              <li><a href="contact.html">Contact Us</a></li>
              <li><a href="infection-control.html">Infection Control</a></li>
              <li><a href="blogs.html">Blogs</a></li>
            </ul>
          </div>

          <!-- Col 3: Our Services -->
          <div class="col-lg-3 col-md-6">
            <h5 class="footer-heading">Treatments</h5>
            <ul class="footer-links footer-links2">
              <li><a href="dental-implants.html">Dental Implants</a></li>
              <li><a href="orthodontic-braces.html">Orthodontic Braces</a></li>
              <li><a href="root-canal.html">Root Canal</a></li>
              <li><a href="crown-bridge.html">Crown & Bridge</a></li>
              <li><a href="dental-bleaching.html">Teeth Whitening</a></li>
              <li><a href="dental-veneers.html">Dental Veneers</a></li>
            </ul>
          </div>

          <!-- Col 4: Contact & Map -->
          <div class="col-lg-4 col-md-6">
            <h5 class="footer-heading">Contact Us</h5>
            <div class="footer-contact-item">
              <iconify-icon icon="ph:map-pin-bold"></iconify-icon>
              <div>
                
                <a href="https://maps.app.goo.gl/PkRdWAydQGrwxQ2y6" target="_blank" style="color:rgba(255,255,255,0.85); text-decoration: none;">
                  FF- 145, S9 Square, Opp. Lotus Aura,<br>
                  Near Lillleria Party Plot, Above Patanjali Store,<br>
                  Sama-Savli Road, Vemali, Vadodara-390008
                </a>
              </div>
            </div>
            <div class="footer-contact-item">
              <iconify-icon icon="ph:phone-bold"></iconify-icon>
              <div>
                <a href="tel:+919879625787" style="color:rgba(255,255,255,0.85);">+91 9879625787</a><br>
                <a href="tel:+919825007975" style="color:rgba(255,255,255,0.85);">+91 9825007975</a>
              </div>
            </div>
            <div class="footer-contact-item">
              <iconify-icon icon="ph:clock-bold"></iconify-icon>
              <div>Mon – Sat: 10:00 AM – 7:30 PM<br>Sunday: By Appointment</div>
            </div>
            
          </div>
        </div>

        <!-- Disclaimer -->
        <div class="row mb-3">
          <div class="col-12">
            <p style="font-size:0.72rem;color:rgba(255,255,255,0.4);line-height:1.6; text-align: center;">
              <strong>DISCLAIMER:</strong> ${CONFIG.clinicName} ensures content accuracy. Information provided is for educational purposes only and cannot substitute professional dental consultation.
            </p>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
          <p>© <span id="year"></span> All Rights Reserved by ${CONFIG.clinicName} | Developed by <a href="javascript:void(0)" target="_blank">
                    <b>SM&nbsp;Enterprise</b>
                  </a></p>
        </div>
      </div>
    `;
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ══════════════════════════════════════════════
     2. FLOATING FAB BUTTONS (WhatsApp + Back-to-Top)
     ══════════════════════════════════════════════ */
  const fabContainer = document.createElement("div");
  fabContainer.className = "fab-container";
  fabContainer.innerHTML = `
    <button class="fab-btn fab-scroll-top" id="scrollTopBtn" aria-label="Back to top">
      <iconify-icon icon="ph:caret-up-bold"></iconify-icon>
    </button>
    <a class="fab-btn fab-whatsapp" href="https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}&text=${encodeURIComponent(CONFIG.whatsappMessage)}"
       target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <span class="fab-pulse"></span>
      <iconify-icon icon="mdi:whatsapp"></iconify-icon>
    </a>
  `;
  document.body.appendChild(fabContainer);

  // Back-to-top visibility
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    },
    { passive: true },
  );

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ══════════════════════════════════════════════
     3. CUSTOM CURSOR
     ══════════════════════════════════════════════ */
  const cursor = document.querySelector(".custom-cursor");
  if (cursor && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX - 10 + "px";
      cursor.style.top = e.clientY - 10 + "px";
      cursor.classList.add("active");
    });

    // Hover effect on interactive elements
    const hoverTargets =
      "a, button, .service-card, .filter-btn, .fab-btn, input, textarea, .nav-link";
    document.querySelectorAll(hoverTargets).forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });

    // Re-bind for dynamically loaded elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll(hoverTargets).forEach((el) => {
        if (!el.dataset.cursorBound) {
          el.dataset.cursorBound = "true";
          el.addEventListener("mouseenter", () =>
            cursor.classList.add("hover"),
          );
          el.addEventListener("mouseleave", () =>
            cursor.classList.remove("hover"),
          );
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  /* ══════════════════════════════════════════════
     4. PRELOADER DISMISSAL
     ══════════════════════════════════════════════ */
  function dismissPreloader() {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;
    preloader.classList.add("preloader-hidden");
    setTimeout(() => {
      if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      document.body.classList.remove("loading");
    }, 360);
  }

  /* ══════════════════════════════════════════════
     5. WHATSAPP FORM HANDLER
     (Moved to whatsapp-form.js)
     ══════════════════════════════════════════════ */

  // Create Global AppUtils Namespace
  window.AppUtils = window.AppUtils || {};

  /* ══════════════════════════════════════════════
     6. GENERIC GSAP ANIMATIONS
     ══════════════════════════════════════════════ */

  // Single-run guard – prevents double-animation when both the
  // performance-optimizer Promise callback AND the setTimeout fallback fire.
  var _gsapInitDone = false;

  /**
   * Split a .gsap-text-reveal element into animated word spans,
   * preserving any child <span> elements (e.g. the coloured accent spans).
   *
   * Strategy: walk childNodes. For TEXT nodes, split on whitespace and
   * wrap each word. For ELEMENT nodes (spans), treat the element's
   * textContent as a single "word unit" and wrap the whole element.
   */
  function _splitTextReveal(el) {
    // Collect (word | element) units from existing children
    var units = [];

    el.childNodes.forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        // Split plain text on whitespace, ignore empty tokens
        node.textContent.split(/\s+/).forEach(function (w) {
          if (w) units.push({ type: "text", value: w });
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Clone the accent span and mark it with .word-accent so the CSS
        // gradient-clip rule targets it precisely (not the wrapper spans).
        var cloned = node.cloneNode(true);
        cloned.classList.add("word-accent");
        units.push({ type: "element", node: cloned });
      }
    });

    // Replace element content with wrapped word spans.
    // Space is kept INSIDE the .word inner span so it's contained within
    // the overflow:hidden wrapper — no stray bare text nodes outside.
    el.innerHTML = "";
    units.forEach(function (unit, i) {
      var wrapper = document.createElement("span");
      wrapper.className = "word-wrap";
      wrapper.style.display = "inline-block";
      wrapper.style.overflow = "hidden";
      wrapper.style.verticalAlign = "bottom";
      wrapper.style.lineHeight = "inherit";

      var inner = document.createElement("span");
      inner.className = "word";
      inner.style.display = "inline-block";
      inner.style.transform = "translateY(110%)";
      inner.style.willChange = "transform";
      inner.style.lineHeight = "inherit";

      if (unit.type === "text") {
        // Trailing space inside the clipped span — avoids stray bare text nodes
        inner.textContent = unit.value + (i < units.length - 1 ? " " : "");
      } else {
        inner.appendChild(unit.node);
      }

      wrapper.appendChild(inner);
      el.appendChild(wrapper);
    });
  }

  window.AppUtils.initGenericGSAP = function () {
    // Hard guard: run animations exactly once per page load
    if (_gsapInitDone) return;

    // Ensure GSAP + plugin are both present before proceeding
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
      return;

    // Always register the plugin here – safe to call multiple times in GSAP
    gsap.registerPlugin(ScrollTrigger);

    _gsapInitDone = true;

    // Add activation class to document element
    document.documentElement.classList.add("gsap-activated");

    /* ── Text Reveal (word-by-word, <span>-aware) ── */
    document.querySelectorAll(".gsap-text-reveal").forEach(function (el) {
      // DOM split (idempotent – already checked by _gsapInitDone above,
      // but keep the attribute as a safety net for late-injected elements)
      if (el.dataset.gsapSplit) return;
      el.dataset.gsapSplit = "true";

      _splitTextReveal(el);

      gsap.to(el.querySelectorAll(".word"), {
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
        y: "0%",
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
      });
    });

    /* ── General Fade Up ── */
    gsap.utils.toArray(".gsap-fade-up").forEach(function (el) {
      if (el.dataset.gsapFade) return;
      el.dataset.gsapFade = "true";
      gsap.fromTo(el, 
        {
          y: 40,
          opacity: 0
        },
        {
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          clearProps: "all",
        }
      );
    });
  };

  /* ══════════════════════════════════════════════
     8. RESIZE DEBOUNCE & RESPONSIVE HANDLER
     ══════════════════════════════════════════════ */
  function debounce(fn, delay) {
    var timer;
    return function () {
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(this, args);
      }, delay);
    };
  }

  var handleResize = debounce(function () {
    // Refresh ScrollTrigger positions after layout reflow.
    // Word animations use once:true so they don't need to be re-run;
    // ScrollTrigger.refresh() is enough to recalculate trigger offsets.
    if (window.ScrollTrigger) {
      window.ScrollTrigger.refresh(true);
    }

    // Re-layout Isotope if available
    if (window.servicesIso) {
      window.servicesIso.layout();
    }
  }, 300);

  window.addEventListener("resize", handleResize, { passive: true });

  /* ══════════════════════════════════════════════
     7. REVEAL OBSERVER (Modular Generic Init)
     ══════════════════════════════════════════════ */
  window.AppUtils.initRevealObserver = function () {
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          // Handle stat counters if present inside or on the element itself
          const statCounters = entry.target.querySelectorAll(".stat-number");
          const countersToRun =
            statCounters.length > 0
              ? Array.from(statCounters)
              : entry.target.classList.contains("stat-number")
                ? [entry.target]
                : [];

          countersToRun.forEach((statNumber) => {
            if (!statNumber.dataset.counted) {
              statNumber.dataset.counted = "true";
              runCounter(statNumber);
            }
          });

          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    function runCounter(el) {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      const duration = 2000;
      const start = performance.now();

      function update(time) {
        const progress = Math.min((time - start) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeProgress * target);
        el.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toLocaleString() + suffix;
        }
      }
      requestAnimationFrame(update);
    }

    // Mutation observer to catch dynamically added .reveal-item components
    const DOMObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.classList.contains("reveal-item")) {
              revealObserver.observe(node);
            }
            node.querySelectorAll(".reveal-item").forEach((child) => {
              revealObserver.observe(child);
            });
          }
        });
      });
    });
    DOMObserver.observe(document.body, { childList: true, subtree: true });

    // Initial observe
    document
      .querySelectorAll(".reveal-item")
      .forEach((el) => revealObserver.observe(el));
  };

  /* ══════════════════════════════════════════════
     8. APP INITIALIZATION SEQUENCE
     ══════════════════════════════════════════════ */
  // Initialize non-blocking observers immediately.
  if (window.AppUtils) {
    window.AppUtils.initRevealObserver();
  }

  // If performance optimizer is not loaded, fallback to quick loader dismissal.
  window.setTimeout(function () {
    if (!document.documentElement.classList.contains("fcp-ready")) {
      dismissPreloader();
    }
  }, 800);

  // Fallback: if GSAP was already loaded synchronously (e.g. inline script),
  // attempt to init now. The _gsapInitDone guard makes repeated calls a no-op.
  // The primary trigger is the performance-optimizer's Promise.all().then() callback.
  window.setTimeout(function () {
    if (window.AppUtils && !_gsapInitDone) {
      window.AppUtils.initGenericGSAP();
    }
  }, 1500);
});
