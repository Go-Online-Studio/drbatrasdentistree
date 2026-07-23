!function(){"use strict";let e="data/serviceMainPagesData.json";async function t(t){try{let i=await fetch(e);if(!i.ok)throw Error("Failed to fetch service data");let a=await i.json();return a.find(e=>e.id===t)||null}catch(n){return console.error("[ServicePage] Error fetching data:",n),null}}async function i(e,t){let i=document.getElementById("relatedGrid");if(!i||!e.relatedServices||!e.relatedServices.length){let a=document.getElementById("relatedSection");a&&(a.style.display="none");return}let n=e.relatedServices.map(e=>t.find(t=>t.id===e)).filter(Boolean);if(!n.length){let r=document.getElementById("relatedSection");r&&(r.style.display="none");return}i.innerHTML=n.map(e=>`
      <div class="col-lg-4 col-md-6 mb-4">
        <a href="${e.id}.html" class="text-decoration-none">
          <div class="service-card reveal-item h-100">
            <div class="card-icon">
              <iconify-icon icon="${e.hero.subtitleIcon||"ph:tooth-bold"}" width="48" height="48"></iconify-icon>
            </div>
            <h5>${e.title}</h5>
            <p class="card-desc">${e.intro.paragraphs[0].substring(0,120)}...</p>
            <span class="know-more">
              Learn More <iconify-icon icon="ph:arrow-right-bold" width="16"></iconify-icon>
            </span>
          </div>
        </a>
      </div>
    `).join("")}function a(){var e;if(window.AppUtils&&"function"==typeof window.AppUtils.initGenericGSAP&&window.AppUtils.initGenericGSAP(),"undefined"==typeof gsap||"undefined"==typeof ScrollTrigger)return;function t(e,t,{stagger:i=.1,triggerEl:a,start:n="top 90%"}={}){let r={opacity:1,y:0,x:0,scale:1,duration:t.duration||.6,ease:t.ease||"power2.out",clearProps:"all",stagger:i,scrollTrigger:{trigger:a||(Array.isArray(e)?e[0]:e),start:n,once:!0}},s=Object.assign({opacity:0,y:0,x:0,scale:1},t);delete s.duration,delete s.ease;let l=Array.isArray(e)?e:[e];l.forEach(e=>{e.classList.remove("reveal-item","is-visible")}),gsap.fromTo(e,s,r)}gsap.registerPlugin(ScrollTrigger);let i=gsap.utils.toArray(".advantage-card");i.length&&t(i,{y:40,opacity:0,duration:.65},{stagger:.1,triggerEl:i[0],start:"top 90%"});let a=gsap.utils.toArray("#featuresList .usecase-card");a.length&&t(a,{y:40,opacity:0,scale:.95,duration:.65},{stagger:.12,triggerEl:a[0],start:"top 88%"});let n=gsap.utils.toArray("#alignersList .usecase-card");n.length&&t(n,{y:40,opacity:0,scale:.95,duration:.65},{stagger:.12,triggerEl:n[0],start:"top 88%"});let r=gsap.utils.toArray("#demographicsList .usecase-card");r.length&&t(r,{y:40,opacity:0,scale:.95,duration:.65},{stagger:.12,triggerEl:r[0],start:"top 88%"});let s=gsap.utils.toArray(".process-step");s.length&&t(s,{y:30,opacity:0,duration:.55},{stagger:.15,triggerEl:s[0],start:"top 90%"});let l=gsap.utils.toArray(".faq-accordion .accordion-item");l.length&&t(l,{x:-30,opacity:0,duration:.5},{stagger:.08,triggerEl:l[0],start:"top 92%"});let o=gsap.utils.toArray("#relatedGrid .service-card");o.length&&t(o,{y:40,opacity:0,duration:.65},{stagger:.12,triggerEl:o[0],start:"top 90%"});let d=gsap.utils.toArray("#serviceIntro .reveal-item");d.length&&t(d,{y:24,opacity:0,duration:.55},{stagger:.1,triggerEl:d[0],start:"top 92%"}),ScrollTrigger.refresh();let c;window.addEventListener("resize",(e=()=>{ScrollTrigger.refresh()},function(){clearTimeout(c),c=setTimeout(e,300)}))}async function n(){let t=document.body.getAttribute("data-service-id");if(!t){console.warn("[ServicePage] No data-service-id found on <body>");return}let n;try{let r=await fetch(e);n=await r.json()}catch(s){console.error("[ServicePage] Failed to fetch service data:",s);return}let l=n.find(e=>e.id===t);if(!l){console.warn(`[ServicePage] Service "${t}" not found in data`);return}!function e(t){let i=document.getElementById("serviceIntro");if(!i||!t.intro)return;let a=(t.intro.paragraphs||[]).map(e=>`<p class="reveal-item">${e}</p>`).join("");i.innerHTML=a}(l),function e(t){let i=document.getElementById("benefitsList");if(!i||!t.benefits||!t.benefits.length){let a=document.getElementById("benefitsSection");a&&(a.style.display="none");return}i.innerHTML=t.benefits.map((e,t)=>`
      <div class="col-md-6 mb-4">
        <div class="advantage-card reveal-item">
          <div class="adv-num">${String(t+1).padStart(2,"0")}</div>
          <div>
            <h6>${e.title}</h6>
            <p>${e.desc}</p>
          </div>
        </div>
      </div>
    `).join("")}(l),function e(t){let i=document.getElementById("stepsList");if(!i||!t.steps||!t.steps.length){let a=document.getElementById("stepsSection");a&&(a.style.display="none");return}let n=i.querySelector(".process-connector"),r=t.steps.map((e,t)=>`
      <div class="col-md-3 col-sm-6 mb-4">
        <div class="process-step reveal-item">
          <div class="step-number">${t+1}</div>
          <h5>${e.title}</h5>
          <p>${e.desc}</p>
        </div>
      </div>
    `).join("");n?n.insertAdjacentHTML("afterend",r):i.innerHTML=r}(l),function e(t){let i=document.getElementById("featuresList");if(!i||!t.features||!t.features.length){let a=document.getElementById("featuresSection");a&&(a.style.display="none");return}i.innerHTML=t.features.map(e=>`
      <div class="col-md-4 col-sm-6 mb-4">
        <div class="usecase-card reveal-item">
          ${e.image?`<img src="${e.image}" alt="${e.title}" class="img-fluid rounded mb-3" />`:`<div class="uc-icon"><iconify-icon icon="${e.icon}" width="32" height="32"></iconify-icon></div>`}
          <h5>${e.title}</h5>
          <p>${e.desc}</p>
        </div>
      </div>
    `).join("")}(l),function e(t){let i=document.getElementById("alignersList");if(!i||!t.alignersFeatures||!t.alignersFeatures.length){let a=document.getElementById("alignersSection");a&&(a.style.display="none");return}i.innerHTML=t.alignersFeatures.map(e=>`
      <div class="col-md-4 col-sm-6 mb-4">
        <div class="usecase-card reveal-item">
          ${e.image?`<img src="${e.image}" alt="${e.title}" class="img-fluid rounded mb-3" />`:`<div class="uc-icon"><iconify-icon icon="${e.icon}" width="32" height="32"></iconify-icon></div>`}
          <h5>${e.title}</h5>
          <p>${e.desc}</p>
        </div>
      </div>
    `).join("")}(l),function e(t){let i=document.getElementById("demographicsList");if(!i||!t.treatmentsByAge||!t.treatmentsByAge.length){let a=document.getElementById("demographicsSection");a&&(a.style.display="none");return}i.innerHTML=t.treatmentsByAge.map(e=>`
      <div class="col-md-4 col-sm-6 mb-4">
        <div class="usecase-card reveal-item">
          ${e.image?`<img src="${e.image}" alt="${e.title}" class="img-fluid rounded mb-3" />`:""}
          <h5>${e.title}</h5>
          <p>${e.desc}</p>
        </div>
      </div>
    `).join("")}(l),function e(t){let i=document.getElementById("faqList");if(!i||!t.faqs||!t.faqs.length){let a=document.getElementById("faqSection");a&&(a.style.display="none");return}let n=t.id;i.innerHTML=t.faqs.map((e,t)=>{let i=`faq-${n}-${t}`,a=0===t;return`
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button ${a?"":"collapsed"}" type="button" data-bs-toggle="collapse" data-bs-target="#${i}" aria-expanded="${a}">
              ${e.q}
            </button>
          </h2>
          <div id="${i}" class="accordion-collapse collapse ${a?"show":""}" data-bs-parent="#faqList">
            <div class="accordion-body">${e.a}</div>
          </div>
        </div>
      `}).join("")}(l),function e(t){let i=document.getElementById("ctaHeading"),a=document.getElementById("ctaDesc"),n=document.getElementById("ctaButton");t.cta&&(i&&(i.innerHTML=t.cta.heading),a&&(a.textContent=t.cta.desc),n&&(n.textContent=t.cta.buttonText,n.href=t.cta.buttonLink))}(l),function e(t){let i={"@context":"https://schema.org","@type":"MedicalProcedure",name:t.title,description:t.metaDescription,url:`https://drbatrasdentistree.in/${t.id}.html`,procedureType:"http://schema.org/TherapeuticProcedure",performedBy:{"@type":"Dentist","@id":"https://drbatrasdentistree.in/#dentist",name:"Dr. Batra's Dentistree",url:"https://drbatrasdentistree.in/",telephone:["+919879625787","+919825007975"],address:{"@type":"PostalAddress",streetAddress:"FF-145, S9 Square, Opp. Lotus Aura, Sama-Savli Road, Vemali",addressLocality:"Vadodara",addressRegion:"Gujarat",postalCode:"390008",addressCountry:"IN"},geo:{"@type":"GeoCoordinates",latitude:22.3544478,longitude:73.1992098}}};if(t.faqs&&t.faqs.length){let a={"@context":"https://schema.org","@type":"FAQPage",mainEntity:t.faqs.map(e=>({"@type":"Question",name:e.q,acceptedAnswer:{"@type":"Answer",text:e.a}}))},n=document.createElement("script");n.type="application/ld+json",n.textContent=JSON.stringify(a),document.head.appendChild(n)}let r=document.createElement("script");r.type="application/ld+json",r.textContent=JSON.stringify(i),document.head.appendChild(r)}(l),await i(l,n),requestAnimationFrame(()=>{requestAnimationFrame(()=>{setTimeout(a,300)})})}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",n):n()}();