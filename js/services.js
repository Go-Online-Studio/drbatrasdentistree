!function(){"use strict";let e=".filter-bar",t="servicesMobileWrapper",i=null,r=null,n=[];function l(){return window.innerWidth<768}async function c(){try{let e=await fetch("data/services.json");if(!e.ok)throw Error(`HTTP ${e.status}`);return await e.json()}catch(t){return console.error("[Services] Failed to load:",t),[]}}function s(e){var t;let i=document.createElement("div");return(i.className="card-icon",(t=e.icon)&&t.includes(":"))?i.innerHTML=`<iconify-icon icon="${e.icon}"></iconify-icon>`:e.image?i.innerHTML=`<img src="${e.image}" alt="${e.title}" loading="lazy">`:i.innerHTML='<div class="default-icon"></div>',i}function a(e){if("undefined"==typeof Swiper)return;o();let i=document.getElementById(t);if(!i)return;let n=i.querySelectorAll(".swiper-slide");n.forEach(t=>{let i=t.getAttribute("data-category");if(e&&"*"!==e){let r=e.replace(/^\./,"");i===r?(t.style.display="",t.classList.remove("swiper-slide-hidden")):(t.style.display="none",t.classList.add("swiper-slide-hidden"))}else t.style.display="",t.classList.remove("swiper-slide-hidden")});let l=i.querySelectorAll(".swiper-slide:not(.swiper-slide-hidden)").length;0!==l&&(r=new Swiper(".servicesMobileSwiper",{slidesPerView:1.2,spaceBetween:16,centeredSlides:!0,loop:l>2,speed:500,grabCursor:!0,pagination:{el:".services-mobile-pagination",clickable:!0,dynamicBullets:l>7},breakpoints:{400:{slidesPerView:1.25,spaceBetween:18},500:{slidesPerView:1.4,spaceBetween:20},640:{slidesPerView:1.6,spaceBetween:20}}}))}function o(){r&&"function"==typeof r.destroy&&(r.destroy(!0,!0),r=null)}function d(){let e=function e(){let t=document.querySelector(".filter-btn.active");return t?t.getAttribute("data-filter"):"*"}();l()?r||a(e):(o(),i&&i.layout())}document.addEventListener("DOMContentLoaded",async function(){var r,o;let f=document.querySelector("#servicesGrid");if(!f)return;let u=await c();if(0===u.length){f.innerHTML=`
        <div class="col-12 text-center py-5">
          <iconify-icon icon="ph:warning-circle" style="font-size:2rem;color:var(--text-muted);"></iconify-icon>
          <p class="mt-3">Unable to load services. Please try again.</p>
        </div>
      `;return}n=u,function e(t,i){let r=document.createDocumentFragment(),n=document.createElement("div");t.forEach(e=>{var t;n.innerHTML=(t=e,`
      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item ${t.category}">
        <div class="service-card reveal-item">
          <h5>${t.title}</h5>
          <p class="card-desc">${t.shortDesc}</p>
          <a href="${t.id}.html" class="know-more" data-service="${t.id}">
            Know More
            <iconify-icon icon="ph:arrow-right-bold"></iconify-icon>
          </a>
        </div>
      </div>
    `);let i=n.firstElementChild;if(i){let l=i.querySelector(".service-card");l&&l.prepend(s(e)),r.appendChild(i)}}),i.innerHTML="",i.appendChild(r)}(u,f),function e(i){let r=document.getElementById(t);if(!r)return;let n=document.createDocumentFragment(),l=document.createElement("div");i.forEach(e=>{var t;l.innerHTML=(t=e,`
      <div class="swiper-slide" data-category="${t.category}">
        <div class="service-card">
          <h5>${t.title}</h5>
          <p class="card-desc">${t.shortDesc}</p>
          <a href="${t.id}.html" class="know-more" data-service="${t.id}">
            Know More
            <iconify-icon icon="ph:arrow-right-bold"></iconify-icon>
          </a>
        </div>
      </div>
    `);let i=l.firstElementChild;if(i){let r=i.querySelector(".service-card");r&&r.prepend(s(e)),n.appendChild(i)}}),r.innerHTML="",r.appendChild(n)}(u),await (r=f,new Promise(e=>{let t=()=>{"undefined"!=typeof Isotope?(i=new Isotope(r,{itemSelector:".grid-item",layoutMode:"fitRows",fitRows:{gutter:0},percentPosition:!0,transitionDuration:"0.5s",stagger:30}),e(i)):setTimeout(t,100)};setTimeout(t,300)}));let p=localStorage.getItem("activeServiceFilter");if(p&&"*"!==p){i&&i.arrange({filter:p});let v=document.querySelector(e);if(v){v.querySelectorAll(".filter-btn").forEach(e=>e.classList.remove("active"));let y=v.querySelector(`.filter-btn[data-filter="${p}"]`);y&&y.classList.add("active")}}l()&&a(p||"*"),function t(){let r=document.querySelector(e);r&&r.addEventListener("click",function(e){let t=e.target.closest(".filter-btn");if(!t)return;let n=t.getAttribute("data-filter");r.querySelectorAll(".filter-btn").forEach(e=>e.classList.remove("active")),t.classList.add("active"),"*"===n?localStorage.removeItem("activeServiceFilter"):localStorage.setItem("activeServiceFilter",n),l()?a(n):i&&i.arrange({filter:n}),"undefined"!=typeof ScrollTrigger&&setTimeout(()=>ScrollTrigger.refresh(),600);let c=document.getElementById("filterBtnList");if(c){let s=c.getBoundingClientRect().top,o=s+window.pageYOffset-100;window.scrollTo({top:o,behavior:"smooth"})}})}();let m;window.addEventListener("resize",(o=d,function(...e){clearTimeout(m),m=setTimeout(()=>o.apply(this,e),250)})),window.servicesIso=i})}();