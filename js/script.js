document.addEventListener("DOMContentLoaded",function(){"use strict";window.gsap&&window.ScrollTrigger&&window.gsap.registerPlugin(window.ScrollTrigger);let e={whatsappNumber:"919879625787",whatsappMessage:"Hi Dr. Batra's Dentistree! I'd like to book an appointment.\n\nPlease share available slots.\n\nThank you!",clinicName:"Dr. Batra's Dentistree",animationDuration:800};window.CLINIC_CONFIG=e;let t=document.getElementById("footer");if(t){t.classList.add("clinic-footer","spacer-y"),t.innerHTML=`
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
              <strong>DISCLAIMER:</strong> ${e.clinicName} ensures content accuracy. Information provided is for educational purposes only and cannot substitute professional dental consultation.
            </p>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
          <p>\xa9 <span id="year"></span> All Rights Reserved by ${e.clinicName} | Developed by <a href="javascript:void(0)" target="_blank">
                    <b>SM&nbsp;Enterprise</b>
                  </a></p>
        </div>
      </div>
    `;let a=document.getElementById("year");a&&(a.textContent=new Date().getFullYear())}let i=document.createElement("div");i.className="fab-container",i.innerHTML=`
    <button class="fab-btn fab-scroll-top" id="scrollTopBtn" aria-label="Back to top">
      <iconify-icon icon="ph:caret-up-bold"></iconify-icon>
    </button>
    <a class="fab-btn fab-whatsapp" href="https://api.whatsapp.com/send?phone=${e.whatsappNumber}&text=${encodeURIComponent(e.whatsappMessage)}"
       target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <span class="fab-pulse"></span>
      <iconify-icon icon="mdi:whatsapp"></iconify-icon>
    </a>
  `,document.body.appendChild(i);let o=document.getElementById("scrollTopBtn");window.addEventListener("scroll",()=>{window.scrollY>500?o.classList.add("visible"):o.classList.remove("visible")},{passive:!0}),o.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})});let n=document.querySelector(".custom-cursor");if(n&&window.matchMedia("(pointer: fine)").matches){document.addEventListener("mousemove",e=>{n.style.left=e.clientX-10+"px",n.style.top=e.clientY-10+"px",n.classList.add("active")});let r="a, button, .service-card, .filter-btn, .fab-btn, input, textarea, .nav-link";document.querySelectorAll(r).forEach(e=>{e.addEventListener("mouseenter",()=>n.classList.add("hover")),e.addEventListener("mouseleave",()=>n.classList.remove("hover"))});let l=new MutationObserver(()=>{document.querySelectorAll(r).forEach(e=>{e.dataset.cursorBound||(e.dataset.cursorBound="true",e.addEventListener("mouseenter",()=>n.classList.add("hover")),e.addEventListener("mouseleave",()=>n.classList.remove("hover")))})});l.observe(document.body,{childList:!0,subtree:!0})}window.AppUtils=window.AppUtils||{};var s=!1;window.AppUtils.initGenericGSAP=function(){!s&&"undefined"!=typeof gsap&&"undefined"!=typeof ScrollTrigger&&(gsap.registerPlugin(ScrollTrigger),s=!0,document.documentElement.classList.add("gsap-activated"),document.querySelectorAll(".gsap-text-reveal").forEach(function(e){if(!e.dataset.gsapSplit){var t,a;e.dataset.gsapSplit="true",a=[],(t=e).childNodes.forEach(function(e){if(e.nodeType===Node.TEXT_NODE)e.textContent.split(/\s+/).forEach(function(e){e&&a.push({type:"text",value:e})});else if(e.nodeType===Node.ELEMENT_NODE){var t=e.cloneNode(!0);t.classList.add("word-accent"),a.push({type:"element",node:t})}}),t.innerHTML="",a.forEach(function(e,i){var o=document.createElement("span");o.className="word-wrap",o.style.display="inline-block",o.style.overflow="hidden",o.style.verticalAlign="bottom",o.style.lineHeight="inherit";var n=document.createElement("span");n.className="word",n.style.display="inline-block",n.style.transform="translateY(110%)",n.style.willChange="transform",n.style.lineHeight="inherit","text"===e.type?n.textContent=e.value+(i<a.length-1?" ":""):n.appendChild(e.node),o.appendChild(n),t.appendChild(o)}),gsap.to(e.querySelectorAll(".word"),{scrollTrigger:{trigger:e,start:"top 90%",once:!0},y:"0%",duration:.8,stagger:.06,ease:"power3.out"})}}),gsap.utils.toArray(".gsap-fade-up").forEach(function(e){e.dataset.gsapFade||(e.dataset.gsapFade="true",gsap.fromTo(e,{y:40,opacity:0},{scrollTrigger:{trigger:e,start:"top 90%",once:!0},y:0,opacity:1,duration:1,ease:"power2.out",clearProps:"all"}))}))};var c,d,p=(c=function(){window.ScrollTrigger&&window.ScrollTrigger.refresh(!0),window.servicesIso&&window.servicesIso.layout()},function(){var e=arguments;clearTimeout(d),d=setTimeout(function(){c.apply(this,e)},300)});window.addEventListener("resize",p,{passive:!0}),window.AppUtils.initRevealObserver=function(){let e=new IntersectionObserver((e,t)=>{e.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");let a=e.target.querySelectorAll(".stat-number"),i=a.length>0?Array.from(a):e.target.classList.contains("stat-number")?[e.target]:[];i.forEach(e=>{e.dataset.counted||(e.dataset.counted="true",function e(t){let a=parseInt(t.dataset.count,10),i=t.dataset.suffix||"",o=performance.now();function n(e){let r=Math.min((e-o)/2e3,1);t.textContent=Math.floor((1-Math.pow(1-r,4))*a).toLocaleString()+i,r<1?requestAnimationFrame(n):t.textContent=a.toLocaleString()+i}requestAnimationFrame(n)}(e))}),t.unobserve(e.target)}})},{threshold:.1,rootMargin:"0px 0px -50px 0px"}),t=new MutationObserver(t=>{t.forEach(t=>{t.addedNodes.forEach(t=>{1===t.nodeType&&(t.classList.contains("reveal-item")&&e.observe(t),t.querySelectorAll(".reveal-item").forEach(t=>{e.observe(t)}))})})});t.observe(document.body,{childList:!0,subtree:!0}),document.querySelectorAll(".reveal-item").forEach(t=>e.observe(t))},window.AppUtils&&window.AppUtils.initRevealObserver(),window.setTimeout(function(){document.documentElement.classList.contains("fcp-ready")||function e(){let t=document.getElementById("preloader");t&&(t.classList.add("preloader-hidden"),setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t),document.body.classList.remove("loading")},360))}()},800),window.setTimeout(function(){window.AppUtils&&!s&&window.AppUtils.initGenericGSAP()},1500)});