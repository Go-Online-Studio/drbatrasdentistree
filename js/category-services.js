!function(){"use strict";let e=null;function i(){return window.innerWidth<768}function n(e){var i;let n=document.createElement("div");return(n.className="card-icon",(i=e.icon)&&i.includes(":"))?n.innerHTML=`<iconify-icon icon="${e.icon}"></iconify-icon>`:e.image?n.innerHTML=`<img src="${e.image}" alt="${e.title}" loading="lazy">`:n.innerHTML='<div class="default-icon"></div>',n}async function t(){try{let e=await fetch("data/services.json");if(!e.ok)throw Error(`HTTP ${e.status}`);return await e.json()}catch(i){return console.error("[Category Services] Failed to load:",i),[]}}function r(i){"undefined"!=typeof Swiper&&(e&&"function"==typeof e.destroy&&(e.destroy(!0,!0),e=null),0!==i&&(e=new Swiper(".servicesMobileSwiper",{slidesPerView:1.2,spaceBetween:16,centeredSlides:!0,loop:i>2,speed:500,grabCursor:!0,pagination:{el:".services-mobile-pagination",clickable:!0,dynamicBullets:i>7},breakpoints:{400:{slidesPerView:1.25,spaceBetween:18},500:{slidesPerView:1.4,spaceBetween:20},640:{slidesPerView:1.6,spaceBetween:20}}})))}document.addEventListener("DOMContentLoaded",async function(){var c;let a=document.querySelector("#servicesGrid");if(!a)return;let o=await t();if(0===o.length){a.innerHTML=`
        <div class="col-12 text-center py-5">
          <iconify-icon icon="ph:warning-circle" style="font-size:2rem;color:var(--text-muted);"></iconify-icon>
          <p class="mt-3">Unable to load services. Please try again.</p>
        </div>
      `;return}let l=window.CATEGORY_FILTER||"dental-services",s=o.filter(e=>e.category===l);!function e(i,t){let r=document.createDocumentFragment(),c=document.createElement("div");i.forEach(e=>{var i;c.innerHTML=(i=e,`
      <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 grid-item ${i.category}">
        <div class="service-card reveal-item">
          <h5>${i.title}</h5>
          <p class="card-desc">${i.shortDesc}</p>
          <a href="${i.id}.html" class="know-more" data-service="${i.id}">
            Know More
            <iconify-icon icon="ph:arrow-right-bold"></iconify-icon>
          </a>
        </div>
      </div>
    `);let t=c.firstElementChild;if(t){let a=t.querySelector(".service-card");a&&a.prepend(n(e)),r.appendChild(t)}}),t.innerHTML="",t.appendChild(r)}(s,a),function e(i){let t=document.getElementById("servicesMobileWrapper");if(!t)return;let r=document.createDocumentFragment(),c=document.createElement("div");i.forEach(e=>{var i;c.innerHTML=(i=e,`
      <div class="swiper-slide" data-category="${i.category}">
        <div class="service-card">
          <h5>${i.title}</h5>
          <p class="card-desc">${i.shortDesc}</p>
          <a href="${i.id}.html" class="know-more" data-service="${i.id}">
            Know More
            <iconify-icon icon="ph:arrow-right-bold"></iconify-icon>
          </a>
        </div>
      </div>
    `);let t=c.firstElementChild;if(t){let a=t.querySelector(".service-card");a&&a.prepend(n(e)),r.appendChild(t)}}),t.innerHTML="",t.appendChild(r)}(s),"undefined"!=typeof ScrollTrigger&&"undefined"!=typeof gsap&&setTimeout(()=>ScrollTrigger.refresh(),300),i()&&r(s.length);let d;window.addEventListener("resize",(c=function n(){i()?e||r(s.length):e&&"function"==typeof e.destroy&&(e.destroy(!0,!0),e=null)},function(...e){clearTimeout(d),d=setTimeout(()=>c.apply(this,e),250)}))})}();