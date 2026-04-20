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
    whatsappMessage: "Hi Dr. Batra's Dentistree! I'd like to book an appointment.\n\nPlease share available slots.\n\nThank you!",
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
              <a href="#" aria-label="Facebook"><iconify-icon icon="mdi:facebook"></iconify-icon></a>
              <a href="#" aria-label="Instagram"><iconify-icon icon="mdi:instagram"></iconify-icon></a>
              <a href="#" aria-label="YouTube"><iconify-icon icon="mdi:youtube"></iconify-icon></a>
              <a href="#" aria-label="LinkedIn"><iconify-icon icon="mdi:linkedin"></iconify-icon></a>
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
          <p>© <span id="year"></span> ${CONFIG.clinicName}. All Rights Reserved.</p>
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
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  }, { passive: true });

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
    const hoverTargets = "a, button, .service-card, .filter-btn, .fab-btn, input, textarea, .nav-link";
    document.querySelectorAll(hoverTargets).forEach((el) => {
      el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
      el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });

    // Re-bind for dynamically loaded elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll(hoverTargets).forEach((el) => {
        if (!el.dataset.cursorBound) {
          el.dataset.cursorBound = "true";
          el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
          el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
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
  window.AppUtils.initGenericGSAP = function () {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    /* ── Text Reveal (word-by-word) ── */
    document.querySelectorAll(".gsap-text-reveal").forEach((text) => {
      if (text.dataset.initialized) return;
      text.dataset.initialized = "true";
      const words = text.textContent.trim().split(/\s+/);
      text.innerHTML = "";
      words.forEach((word) => {
        const wrapper = document.createElement("span");
        wrapper.className = "word-wrap";
        const inner = document.createElement("span");
        inner.className = "word";
        inner.style.display = "inline-block";
        inner.style.transform = "translateY(110%)";
        inner.innerHTML = word + "&nbsp;";
        wrapper.appendChild(inner);
        text.appendChild(wrapper);
      });

      gsap.to(text.querySelectorAll(".word"), {
        scrollTrigger: { trigger: text, start: "top 90%", once: true },
        y: "0%",
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
      });
    });

    /* ── General Fade Up ── */
    gsap.utils.toArray(".gsap-fade-up").forEach((el) => {
      if (el.dataset.initialized) return;
      el.dataset.initialized = "true";
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        clearProps: "all"
      });
    });
  };

  /* ══════════════════════════════════════════════
     8. RESIZE DEBOUNCE & RESPONSIVE HANDLER
     ══════════════════════════════════════════════ */
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  const handleResize = debounce(function () {
    // Reset word-wrap text splits
    document.querySelectorAll(".gsap-text-reveal").forEach((el) => {
      const words = el.querySelectorAll(".word");
      words.forEach((w) => (w.style.transform = "translateY(0%)"));
    });

    // Refresh ScrollTrigger
    if (window.ScrollTrigger) {
      window.ScrollTrigger.refresh(true);
    }

    // Re-layout Isotope if available
    if (window.servicesIso) {
      window.servicesIso.layout();
    }
  }, 300);

  window.addEventListener("resize", handleResize);

  /* ══════════════════════════════════════════════
     7. REVEAL OBSERVER (Modular Generic Init)
     ══════════════════════════════════════════════ */
  window.AppUtils.initRevealObserver = function () {
    const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          // Handle stat counters if present inside or on the element itself
          const statCounters = entry.target.querySelectorAll('.stat-number');
          const countersToRun = statCounters.length > 0 ? Array.from(statCounters) : (entry.target.classList.contains('stat-number') ? [entry.target] : []);

          countersToRun.forEach(statNumber => {
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
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            if (node.classList.contains('reveal-item')) {
              revealObserver.observe(node);
            }
            node.querySelectorAll('.reveal-item').forEach(child => {
              revealObserver.observe(child);
            });
          }
        });
      });
    });
    DOMObserver.observe(document.body, { childList: true, subtree: true });

    // Initial observe
    document.querySelectorAll('.reveal-item').forEach(el => revealObserver.observe(el));
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

  // Re-run animation setup when gsap is lazy-loaded later.
  window.setTimeout(function () {
    if (window.AppUtils) {
      window.AppUtils.initGenericGSAP();
    }
  }, 1200);

});