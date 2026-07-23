!function(){"use strict";let t=[],e=[],l=1,i="all",a="";async function n(){try{let l=await fetch("data/blogsData.json");if(!l.ok)throw Error("Failed to fetch blog data");e=[...t=await l.json()],c(),function t(){let e=document.getElementById("blogFilterBar");e&&e.addEventListener("click",function(t){let l=t.target.closest(".filter-btn");l&&(e.querySelectorAll(".filter-btn").forEach(function(t){t.classList.remove("active")}),l.classList.add("active"),i=l.dataset.category,s())})}(),function t(){let e=document.getElementById("blogSearch");if(!e)return;let l;e.addEventListener("input",function(){clearTimeout(l),l=setTimeout(function(){a=e.value.trim().toLowerCase(),s()},300)})}()}catch(n){console.error("[Blog] Error:",n)}}function o(t){return`
      <div class="col-lg-4 col-md-6" data-category="${t.category}">
        <a href="blog-post.html?slug=${t.slug}" class="blog-card reveal-item" style="position:relative; display:flex;">
          <div class="blog-card-img">
            <img src="${t.featuredImage}" alt="${t.title}" loading="lazy" width="400" height="250" class="img-loading-state" onload="this.classList.remove('img-loading-state'); this.classList.add('img-loaded-state');">
            <span class="blog-card-category">${t.categoryLabel}</span>
          </div>
          <div class="blog-card-body">
            <div class="blog-card-meta">
              <span><iconify-icon icon="ph:calendar-bold" width="14"></iconify-icon> ${function t(e){let l=new Date(e);return l.toLocaleDateString("gu-IN",{year:"numeric",month:"long",day:"numeric"})}(t.publishDate)}</span>
              <span><iconify-icon icon="ph:clock-bold" width="14"></iconify-icon> ${t.readingTime}</span>
            </div>
            <h3 class="blog-card-title">${t.title}</h3>
            <p class="blog-card-excerpt">${t.excerpt}</p>
            <div class="blog-card-footer">
              <span class="blog-card-author">${t.author}</span>
              <span class="blog-card-readmore">
                Read More <iconify-icon icon="ph:arrow-right-bold" width="14"></iconify-icon>
              </span>
            </div>
          </div>
        </a>
      </div>
    `}function c(){let t=document.getElementById("blogGrid"),i=document.getElementById("blogNoResults"),a=document.getElementById("blogLoadMore");if(!t)return;let n=6*l,c=e.slice(0,n);if(0===c.length){t.innerHTML="",i.style.display="block",a.style.display="none";return}i.style.display="none",t.innerHTML=c.map(o).join(""),n<e.length?a.style.display="block":a.style.display="none",window.AppUtils&&window.AppUtils.initRevealObserver}function s(){l=1,e=t.filter(function(t){let e="all"===i||t.category===i,l=!a||t.title.toLowerCase().includes(a)||t.excerpt.toLowerCase().includes(a)||t.title.includes(a);return e&&l}),c()}function r(){n(),function t(){let e=document.getElementById("loadMoreBtn");e&&e.addEventListener("click",function(){l++,c()})}()}"loading"===document.readyState?document.addEventListener("DOMContentLoaded",r):r()}();