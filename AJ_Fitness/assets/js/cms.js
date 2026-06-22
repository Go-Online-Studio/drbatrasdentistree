document.addEventListener("DOMContentLoaded",function(){let a=document.getElementById("programsSlider"),i=document.getElementById("programsGrid");a&&fetch("data/programs.json").then(a=>a.json()).then(i=>{a.innerHTML=i.map(a=>`
          <div class="swiper-slide">
            <div class="program-card" id="${a.id}">
              <div class="program-card-img">
                <img src="${a.image}" alt="${a.name}" loading="lazy" width="400" height="220">
                <div class="program-icon">
                  <span class="iconify" data-icon="${a.icon}"></span>
                </div>
              </div>
              <div class="program-card-body">
                <h3>${a.name}</h3>
                <p>${a.description}</p>
              </div>
            </div>
          </div>
        `).join(""),"function"==typeof initProgramsSwiper&&initProgramsSwiper(),"function"==typeof initWhatsAppLinks&&initWhatsAppLinks()}).catch(a=>console.error("Error loading programs:",a)),i&&fetch("data/programs.json").then(a=>a.json()).then(a=>{i.innerHTML=a.map(a=>`
          <div class="col-lg-4 col-md-6 program-grid-item" data-category="${a.category}">
            <div class="program-card" id="${a.id}">
              <div class="program-card-img">
                <img src="${a.image}" alt="${a.name}" loading="lazy" width="400" height="220">
                <div class="program-icon">
                  <span class="iconify" data-icon="${a.icon}"></span>
                </div>
              </div>
              <div class="program-card-body">
                <h3>${a.name}</h3>
                <p>${a.description}</p>
                <div class="d-flex justify-content-between align-items-center mt-2">
                  <span class="text-muted" style="font-size:0.8rem;">
                    <span class="iconify" data-icon="mdi:clock-outline"></span> ${a.duration} • ${a.level}
                  </span>
                </div>
                <a href="#" class="btn-primary-custom mt-3 w-100 justify-content-center enquiry-btn" data-program="${a.name}" style="font-size:0.8rem;padding:10px 20px;">
                  Enquiry Now <span class="iconify" data-icon="mdi:whatsapp"></span>
                </a>
              </div>
            </div>
          </div>
        `).join(""),"function"==typeof initIsotope&&setTimeout(initIsotope,100),"function"==typeof initWhatsAppLinks&&initWhatsAppLinks()}).catch(a=>console.error("Error loading programs:",a));let n=document.getElementById("trainersGrid");n&&fetch("data/trainers.json").then(a=>a.json()).then(a=>{n.innerHTML=a.map(a=>`
          <div class="col-lg-3 col-md-6" data-aos="fade-up">
            <div class="trainer-card">
              <div class="trainer-img">
                <img src="${a.image}" alt="${a.name}" loading="lazy" width="400" height="320">
                <div class="trainer-overlay">
                  <div class="trainer-social">
                    <a href="${a.social.instagram}"><span class="iconify" data-icon="mdi:instagram"></span></a>
                    <a href="${a.social.twitter}"><span class="iconify" data-icon="mdi:twitter"></span></a>
                    <a href="${a.social.linkedin}"><span class="iconify" data-icon="mdi:linkedin"></span></a>
                  </div>
                </div>
              </div>
              <div class="trainer-info">
                <h3>${a.name}</h3>
                <p class="trainer-role">${a.role}</p>
                <p class="trainer-specialty">${a.specialty}</p>
              </div>
            </div>
          </div>
        `).join("")}).catch(a=>console.error("Error loading trainers:",a))});