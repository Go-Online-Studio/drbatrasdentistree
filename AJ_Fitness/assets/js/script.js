!function(){
  "use strict";
  let e = "918487042256";
  let a = {
    phone: "+91 84870 42256",
    phoneHref: "tel:+918487042256",
    email: "info@ajfitness.com",
    emailHref: "mailto:info@ajfitness.com",
    address: "1st Floor, Pushp Hub, Old Chhani Rd, opp. L&T Health Care, Chistia Nagar, Chhani Jakatnaka, Vadodara, Gujarat 390002",
    addressHref: "https://maps.google.com/?q=AJ+Fitness+Vadodara",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14760.96025075036!2d73.16024202012265!3d22.34456263378423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc9562c56aad3%3A0xb5ba37f40b28c84c!2sAJ%20fitness!5e0!3m2!1sen!2sin!4v1777878475057!5m2!1sen!2sin",
    social: {
      facebook: "https://www.facebook.com/people/AJ-Fitness/61589411332666/",
      instagram: "https://www.instagram.com/aj_fitness_vadodara/"
    }
  };

  document.addEventListener("DOMContentLoaded", function(){
    // Preloader insertion
    !function t(){
      if(document.getElementById("preloader")) return;
      let a = `
        <div id="preloader">
          <div class="loader-content">
            <div class="shriii-loader"></div>
            <div class="loader-text">AJ FITNESS</div>
          </div>
        </div>`;
      document.body.insertAdjacentHTML("afterbegin", a);
    }();

    // Preloader fadeout
    !function t(){
      let a = document.getElementById("preloader");
      a && window.addEventListener("load", function(){
        setTimeout(function(){
          a.classList.add("loaded");
          setTimeout(function(){ a.remove(); }, 600);
        }, 400);
      });
    }();

    // Dynamic Footer Year Update
    !function t(){
      let y = document.getElementById("year");
      if (y) {
        y.textContent = new Date().getFullYear();
      }
    }();

    // FAB Button Insertion and Logic
    !function t(){
      let old = document.getElementById("backToTop");
      old && old.remove();
      document.body.insertAdjacentHTML("beforeend", `
        <div class="fab-container" id="fabContainer">
          <!-- WhatsApp FAB -->
          <a href="https://api.whatsapp.com/send?phone=${e}&text=${encodeURIComponent("Hello, I am interested in AJ Fitness. Please share more details.")}"
             class="fab-btn fab-whatsapp" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" id="fabWhatsApp">
            <span class="iconify" data-icon="mdi:whatsapp" data-width="26"></span>
          </a>
          <!-- Back to Top FAB -->
          <button class="fab-btn fab-top" id="fabBackToTop" aria-label="Back to top">
            <span class="iconify" data-icon="mdi:chevron-up" data-width="24"></span>
          </button>
        </div>`);
      let i = document.getElementById("fabBackToTop");
      if(i) {
        window.addEventListener("scroll", function(){
          window.scrollY > 500 ? i.classList.add("show") : i.classList.remove("show");
        }, {passive: true});
        i.addEventListener("click", function(){
          window.scrollTo({top: 0, behavior: "smooth"});
        });
      }
    }();

    // Custom Cursor Dot logic
    !function t(){
      if(window.innerWidth <= 991 || "ontouchstart" in window) return;
      if(!document.getElementById("cursorDot")) {
        document.body.insertAdjacentHTML("beforeend", `
          <div class="cursor-dot" id="cursorDot"></div>
          <div class="cursor-outline" id="cursorOutline"></div>
        `);
      }
      let a = document.getElementById("cursorDot"),
          t = document.getElementById("cursorOutline");
      if(!a || !t) return;
      let i = 0, s = 0, o = 0, n = 0;
      document.addEventListener("mousemove", function(e){
        i = e.clientX;
        s = e.clientY;
        a.style.left = i + "px";
        a.style.top = s + "px";
      });
      !function e(){
        o += (i - o) * 0.15;
        n += (s - n) * 0.15;
        t.style.left = o + "px";
        t.style.top = n + "px";
        requestAnimationFrame(e);
      }();
      let r = "a, button, .btn-primary-custom, .btn-outline-custom, .btn-nav, .program-card, .trainer-card, .feature-item, .stat-card, .filter-btn, .nav-link, .fab-btn";
      document.addEventListener("mouseover", function(e){
        e.target.closest(r) && t.classList.add("hover");
      });
      document.addEventListener("mouseout", function(e){
        e.target.closest(r) && t.classList.remove("hover");
      });
    }();

    // AOS and Cursor Resize adaptation
    !function t(){
      let timeout;
      let resizeHandler = function(){
        if(typeof AOS !== "undefined") AOS.refresh();
        let e = document.getElementById("cursorDot"),
            a = document.getElementById("cursorOutline");
        if(window.innerWidth <= 991) {
          if(e) e.style.display = "none";
          if(a) a.style.display = "none";
        } else {
          if(e) e.style.display = "";
          if(a) a.style.display = "";
        }
      };
      window.addEventListener("resize", function(){
        clearTimeout(timeout);
        timeout = setTimeout(resizeHandler, 250);
      }, {passive: true});
    }();

    // Init AOS
    window.addEventListener("load", function(){
      if(typeof AOS !== "undefined") {
        AOS.init({
          once: true,
          duration: 800,
          easing: "ease-out-cubic",
          offset: 50
        });
      }
    });
  });

  window.AJ_CONFIG = {
    WHATSAPP_PHONE: e,
    SITE_INFO: a
  };
}();