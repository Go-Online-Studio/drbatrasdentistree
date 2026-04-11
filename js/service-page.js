/* ==============================================
   SERVICE PAGE RENDERER
   Reads data-service-id from <body>, fetches JSON,
   populates page sections, and initializes GSAP.
   ============================================== */
(function () {
  'use strict';

  const SERVICE_DATA_URL = 'data/serviceMainPagesData.json';

  /* --- Utility: Debounce --- */
  function debounce(fn, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }

  /* --- Utility: Get Service ID --- */
  function getServiceId() {
    return document.body.getAttribute('data-service-id');
  }

  /* --- Fetch Service Data --- */
  async function fetchServiceData(serviceId) {
    try {
      const res = await fetch(SERVICE_DATA_URL);
      if (!res.ok) throw new Error('Failed to fetch service data');
      const data = await res.json();
      return data.find(s => s.id === serviceId) || null;
    } catch (err) {
      console.error('[ServicePage] Error fetching data:', err);
      return null;
    }
  }

  /* --- Populate Intro Section --- */
  function renderIntro(data) {
    const el = document.getElementById('serviceIntro');
    if (!el || !data.intro) return;

    const paragraphs = (data.intro.paragraphs || [])
      .map(p => `<p class="reveal-item">${p}</p>`)
      .join('');

    el.innerHTML = paragraphs;
  }

  /* --- Populate Benefits (advantage-card grid) --- */
  function renderBenefits(data) {
    const el = document.getElementById('benefitsList');
    if (!el || !data.benefits || !data.benefits.length) {
      const section = document.getElementById('benefitsSection');
      if (section) section.style.display = 'none';
      return;
    }

    el.innerHTML = data.benefits.map((b, i) => `
      <div class="col-md-6 mb-4">
        <div class="advantage-card reveal-item">
          <div class="adv-num">${String(i + 1).padStart(2, '0')}</div>
          <div>
            <h6>${b.title}</h6>
            <p>${b.desc}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* --- Populate Steps (process-step) --- */
  function renderSteps(data) {
    const el = document.getElementById('stepsList');
    if (!el || !data.steps || !data.steps.length) {
      const section = document.getElementById('stepsSection');
      if (section) section.style.display = 'none';
      return;
    }

    /* Preserve the process-connector, append step columns */
    const connector = el.querySelector('.process-connector');
    const stepsHTML = data.steps.map((s, i) => `
      <div class="col-md-3 col-sm-6 mb-4">
        <div class="process-step reveal-item">
          <div class="step-number">${i + 1}</div>
          <h5>${s.title}</h5>
          <p>${s.desc}</p>
        </div>
      </div>
    `).join('');

    if (connector) {
      connector.insertAdjacentHTML('afterend', stepsHTML);
    } else {
      el.innerHTML = stepsHTML;
    }
  }

  /* --- Populate Features (usecase-card) --- */
  function renderFeatures(data) {
    const el = document.getElementById('featuresList');
    if (!el || !data.features || !data.features.length) {
      const section = document.getElementById('featuresSection');
      if (section) section.style.display = 'none';
      return;
    }

    el.innerHTML = data.features.map(f => `
      <div class="col-md-4 col-sm-6 mb-4">
        <div class="usecase-card reveal-item">
          <div class="uc-icon">
            <iconify-icon icon="${f.icon}" width="32" height="32"></iconify-icon>
          </div>
          <h5>${f.title}</h5>
          <p>${f.desc}</p>
        </div>
      </div>
    `).join('');
  }

  /* --- Populate FAQs (accordion) --- */
  function renderFAQs(data) {
    const el = document.getElementById('faqList');
    if (!el || !data.faqs || !data.faqs.length) {
      const section = document.getElementById('faqSection');
      if (section) section.style.display = 'none';
      return;
    }

    const serviceId = data.id;
    el.innerHTML = data.faqs.map((faq, i) => {
      const collapseId = `faq-${serviceId}-${i}`;
      const isFirst = i === 0;
      return `
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button ${isFirst ? '' : 'collapsed'}" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="${isFirst}">
              ${faq.q}
            </button>
          </h2>
          <div id="${collapseId}" class="accordion-collapse collapse ${isFirst ? 'show' : ''}" data-bs-parent="#faqList">
            <div class="accordion-body">${faq.a}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  /* --- Populate CTA --- */
  function renderCTA(data) {
    const heading = document.getElementById('ctaHeading');
    const desc = document.getElementById('ctaDesc');
    const btn = document.getElementById('ctaButton');

    if (!data.cta) return;
    if (heading) heading.innerHTML = data.cta.heading;
    if (desc) desc.textContent = data.cta.desc;
    if (btn) {
      btn.textContent = data.cta.buttonText;
      btn.href = data.cta.buttonLink;
    }
  }

  /* --- Populate Related Services --- */
  async function renderRelated(data, allServices) {
    const el = document.getElementById('relatedGrid');
    if (!el || !data.relatedServices || !data.relatedServices.length) {
      const section = document.getElementById('relatedSection');
      if (section) section.style.display = 'none';
      return;
    }

    const relatedItems = data.relatedServices
      .map(id => allServices.find(s => s.id === id))
      .filter(Boolean);

    if (!relatedItems.length) {
      const section = document.getElementById('relatedSection');
      if (section) section.style.display = 'none';
      return;
    }

    el.innerHTML = relatedItems.map(service => `
      <div class="col-lg-4 col-md-6 mb-4">
        <a href="${service.id}.html" class="text-decoration-none">
          <div class="service-card reveal-item h-100">
            <div class="card-icon">
              <iconify-icon icon="${service.hero.subtitleIcon || 'ph:tooth-bold'}" width="48" height="48"></iconify-icon>
            </div>
            <h5>${service.title}</h5>
            <p class="card-desc">${service.intro.paragraphs[0].substring(0, 120)}...</p>
            <span class="know-more">
              Learn More <iconify-icon icon="ph:arrow-right-bold" width="16"></iconify-icon>
            </span>
          </div>
        </a>
      </div>
    `).join('');
  }

  /* --- Insert Schema Markup --- */
  function renderSchema(data) {
    const schema = {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      "name": data.title,
      "description": data.metaDescription,
      "url": `https://drbatrasdentistree.com/${data.id}.html`,
      "performedBy": {
        "@type": "Dentist",
        "name": "Dr. Batra's Dentistree",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Vadodara",
          "addressRegion": "Gujarat",
          "addressCountry": "IN"
        }
      }
    };

    // FAQ Schema
    if (data.faqs && data.faqs.length) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      };

      const faqScript = document.createElement('script');
      faqScript.type = 'application/ld+json';
      faqScript.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(faqScript);
    }

    const procScript = document.createElement('script');
    procScript.type = 'application/ld+json';
    procScript.textContent = JSON.stringify(schema);
    document.head.appendChild(procScript);
  }

  /* --- GSAP Animation Init --- */
  function initServiceGSAP() {
    /* Call global text reveal only — do NOT call initRevealObserver here.
       IntersectionObserver from script.js adds .is-visible but its CSS
       sets opacity:1 via a class, which conflicts with GSAP inline opacity:0.
       We handle all reveal animations below via GSAP exclusively. */
    if (window.AppUtils && typeof window.AppUtils.initGenericGSAP === 'function') {
      window.AppUtils.initGenericGSAP();
    }

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    /* Helper: build a ScrollTrigger gsap.fromTo() that always finishes cleanly.
       Using fromTo() instead of from() guarantees the "to" end-state is always
       applied, even if the element is already in-view when the trigger fires. */
    function animateIn(targets, fromVars, { stagger = 0.1, triggerEl, start = 'top 90%' } = {}) {
      const toVars = {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: fromVars.duration || 0.6,
        ease: fromVars.ease || 'power2.out',
        clearProps: 'all',           /* remove inline styles so CSS takes over */
        stagger: stagger,
        scrollTrigger: {
          trigger: triggerEl || (Array.isArray(targets) ? targets[0] : targets),
          start: start,
          once: true               /* fire once and never re-animate */
        }
      };

      const from = Object.assign({ opacity: 0, y: 0, x: 0, scale: 1 }, fromVars);
      delete from.duration;
      delete from.ease;

      // Prevent CSS transitions from fighting GSAP by stripping the classes
      const elementArray = Array.isArray(targets) ? targets : [targets];
      elementArray.forEach(el => {
        el.classList.remove('reveal-item', 'is-visible');
      });

      gsap.fromTo(targets, from, toVars);
    }

    /* --- Advantage Cards (benefits grid) --- */
    const advCards = gsap.utils.toArray('.advantage-card');
    if (advCards.length) {
      animateIn(advCards, { y: 40, opacity: 0, duration: 0.65 }, {
        stagger: 0.1,
        triggerEl: advCards[0],
        start: 'top 90%'
      });
    }

    /* --- Usecase / Feature Cards --- */
    const ucCards = gsap.utils.toArray('.usecase-card');
    if (ucCards.length) {
      animateIn(ucCards, { y: 40, opacity: 0, scale: 0.95, duration: 0.65 }, {
        stagger: 0.12,
        triggerEl: ucCards[0],
        start: 'top 88%'
      });
    }

    /* --- Process Steps --- */
    const steps = gsap.utils.toArray('.process-step');
    if (steps.length) {
      animateIn(steps, { y: 30, opacity: 0, duration: 0.55 }, {
        stagger: 0.15,
        triggerEl: steps[0],
        start: 'top 90%'
      });
    }

    /* --- FAQ Accordion Items --- */
    const faqItems = gsap.utils.toArray('.faq-accordion .accordion-item');
    if (faqItems.length) {
      animateIn(faqItems, { x: -30, opacity: 0, duration: 0.5 }, {
        stagger: 0.08,
        triggerEl: faqItems[0],
        start: 'top 92%'
      });
    }

    /* --- Related Service Cards --- */
    const relCards = gsap.utils.toArray('#relatedGrid .service-card');
    if (relCards.length) {
      animateIn(relCards, { y: 40, opacity: 0, duration: 0.65 }, {
        stagger: 0.12,
        triggerEl: relCards[0],
        start: 'top 90%'
      });
    }

    /* --- Reveal items injected by JS (paragraphs, etc.) --- */
    const revealItems = gsap.utils.toArray('#serviceIntro .reveal-item');
    if (revealItems.length) {
      animateIn(revealItems, { y: 24, opacity: 0, duration: 0.55 }, {
        stagger: 0.1,
        triggerEl: revealItems[0],
        start: 'top 92%'
      });
    }

    /* Refresh once after all tweens are set, then listen for resize */
    ScrollTrigger.refresh();

    window.addEventListener('resize', debounce(() => {
      ScrollTrigger.refresh();
    }, 300));
  }

  /* --- Main Init --- */
  async function init() {
    const serviceId = getServiceId();
    if (!serviceId) {
      console.warn('[ServicePage] No data-service-id found on <body>');
      return;
    }

    let allServices;
    try {
      const res = await fetch(SERVICE_DATA_URL);
      allServices = await res.json();
    } catch (err) {
      console.error('[ServicePage] Failed to fetch service data:', err);
      return;
    }

    const data = allServices.find(s => s.id === serviceId);
    if (!data) {
      console.warn(`[ServicePage] Service "${serviceId}" not found in data`);
      return;
    }

    /* Populate all sections first */
    renderIntro(data);
    renderBenefits(data);
    renderSteps(data);
    renderFeatures(data);
    renderFAQs(data);
    renderCTA(data);
    renderSchema(data);
    await renderRelated(data, allServices);

    /* Wait for layout to settle (2 frames + 300ms) before measuring positions
       and setting up ScrollTrigger. This prevents the "stuck at opacity:0"
       bug caused by GSAP measuring elements before they have layout. */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(initServiceGSAP, 300);
      });
    });
  }

  /* --- Boot --- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
