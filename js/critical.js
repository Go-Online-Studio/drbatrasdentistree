/* ========================================================
   CRITICAL.JS - Navbar Injection & Sticky Header Logic
   Dr. Batra's Dentistree
   ======================================================== */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const headerEl = document.getElementById("mainNavbar");
  if (!headerEl) return;

  /* ── Inject Full Header HTML ── */
  headerEl.innerHTML = `
    <!-- Top Info Bar (Desktop Only) -->
    <div class="top-header d-none d-lg-block">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <a class="navbar-brand m-0" href="index.html" aria-label="Dr. Batra's Dentistree Home">
            <img height="72px" width="174.3px" src="img/DR_BatraDentistreeLogo.webp" alt="Dr. Batra's Dentistree Logo">
          </a>
          <div class="d-flex align-items-center gap-4">
            <!-- Timing -->
            <div class="d-flex align-items-center gap-3">
              <div class="top-info-icon">
                <iconify-icon icon="ph:clock-bold" style="font-size:1.6rem;color:var(--primary-blue);"></iconify-icon>
              </div>
              <div class="lh-sm">
                <span class="d-block" style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">Mon - Sat</span>
                <span class="d-block fw-bold" style="font-size:0.88rem;color:var(--text-dark);">10:00 AM – 7:30 PM</span>
                <span class="d-block" style="font-size:0.65rem;color:var(--text-muted);">Sunday By Appointment</span>
              </div>
            </div>
            <!-- Phone -->
            <div class="d-flex align-items-center gap-3 ms-2" style="border-left:1px solid rgba(5,107,163,0.1);padding-left:20px;">
              <div class="top-info-icon">
                <iconify-icon icon="ph:phone-call-bold" style="font-size:1.6rem;color:var(--primary-blue);"></iconify-icon>
              </div>
              <div class="lh-sm">
                <span class="d-block" style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">Call Us</span>
                <a href="tel:+919879625787" class="d-block fw-bold" style="font-size:0.88rem;color:var(--text-dark);text-decoration:none;">(+91) 98796 25787</a>
              </div>
            </div>
            <!-- Emergency -->
            <div class="ms-2" style="border-left:1px solid rgba(5,107,163,0.1);padding-left:20px;">
              <a href="tel:+919825007975" class="btn-gradient" style="padding:10px 24px;font-size:0.78rem;border-radius:50px;">
                <iconify-icon icon="ph:first-aid-kit-bold"></iconify-icon>
                Emergency 24×7
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Navigation -->
    <nav class="navbar navbar-expand-lg main-navbar sticky-top" id="stickyNav">
      <div class="container">
        <a class="navbar-brand d-lg-none m-0 py-2" href="index.html" aria-label="Dr. Batra's Dentistree Home">
          <img height="72px" width="174.3px" src="img/DR_BatraDentistreeLogo.webp" alt="Dr. Batra's Dentistree Logo">
        </a>

        <button class="navbar-toggler border-0 px-0" type="button"
                data-bs-toggle="offcanvas" data-bs-target="#offcanvasNav"
                aria-controls="offcanvasNav" aria-label="Toggle Navigation">
          <iconify-icon icon="ph:list-bold" style="font-size:1.6rem;color:var(--primary-blue);"></iconify-icon>
        </button>

        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNav">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title text-white mb-0" style="font-family:'Outfit',sans-serif;">
              <iconify-icon icon="mdi:tooth-outline" class="me-2"></iconify-icon>Menu
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav ms-auto w-100 justify-content-center gap-lg-1 align-items-lg-center">
              <li class="nav-item">
                <a class="nav-link" href="index.html">Home</a>
              </li>

              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">About Us <iconify-icon icon="prime:caret-down"></iconify-icon></a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">
                    <iconify-icon icon="ph:user-circle" class="me-2"></iconify-icon>Dr. Samir Batra
                  </a></li>
                  <li><a class="dropdown-item" href="#">
                    <iconify-icon icon="ph:user-circle" class="me-2"></iconify-icon>Dr. Mira Batra
                  </a></li>
                  <li><a class="dropdown-item" href="#">
                    <iconify-icon icon="ph:buildings" class="me-2"></iconify-icon>About Clinic
                  </a></li>
                </ul>
              </li>

              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Dental Services <iconify-icon icon="prime:caret-down"></iconify-icon></a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#services">
                    <iconify-icon icon="ph:list-checks" class="me-2"></iconify-icon>All Treatments
                  </a></li>
                  <li><a class="dropdown-item" href="#">
                    <iconify-icon icon="healthicons:dental-hygiene-outline" class="me-2"></iconify-icon>Dental Implants
                  </a></li>
                  <li><a class="dropdown-item" href="#">
                    <iconify-icon icon="healthicons:teeth-outline" class="me-2"></iconify-icon>Orthodontic Braces
                  </a></li>
                  <li><a class="dropdown-item" href="#">
                    <iconify-icon icon="healthicons:odontology-outline" class="me-2"></iconify-icon>Root Canal
                  </a></li>
                  <li><a class="dropdown-item" href="#">
                    <iconify-icon icon="mdi:tooth-outline" class="me-2"></iconify-icon>Crown & Bridge
                  </a></li>
                  <li><a class="dropdown-item" href="#">
                    <iconify-icon icon="healthicons:mouth-outline" class="me-2"></iconify-icon>Gum Surgery
                  </a></li>
                  <li><a class="dropdown-item" href="#">
                    <iconify-icon icon="healthicons:odontology" class="me-2"></iconify-icon>Tooth Removal
                  </a></li>
                </ul>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#">Implant Dentistry</a>
              </li>

              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Cosmetic Care <iconify-icon icon="prime:caret-down"></iconify-icon></a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">
                    <iconify-icon icon="mdi:diamond-stone" class="me-2"></iconify-icon>All Cosmetic Care
                  </a></li>
                  <li><a class="dropdown-item" href="#">
                    <iconify-icon icon="mdi:white-balance-sunny" class="me-2"></iconify-icon>Dental Bleaching
                  </a></li>
                  <li><a class="dropdown-item" href="#">
                    <iconify-icon icon="mdi:emoticon-happy-outline" class="me-2"></iconify-icon>Smile Designing
                  </a></li>
                  <li><a class="dropdown-item" href="#">
                    <iconify-icon icon="mdi:shield-check-outline" class="me-2"></iconify-icon>Zirconia Crowns
                  </a></li>
                  <li><a class="dropdown-item" href="#">
                    <iconify-icon icon="mdi:blur" class="me-2"></iconify-icon>Invisalign
                  </a></li>
                </ul>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#">Infection Control</a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#">Gallery</a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#contact">Contact</a>
              </li>

              <li class="nav-item d-none d-xxl-block">
                <a class="nav-link nav-cta-btn" href="#contact">
                  <iconify-icon icon="ph:calendar-check-bold"></iconify-icon>
                  Book Now
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `;

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