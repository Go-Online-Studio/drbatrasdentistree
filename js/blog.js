/* ==============================================
   BLOG.JS - Blog Listing Page Logic
   Dr. Batra's Dentistree
   ============================================== */
(function () {
  "use strict";

  const BLOG_DATA_URL = "data/blogsData.json";
  const POSTS_PER_PAGE = 6;

  let allBlogs = [];
  let filteredBlogs = [];
  let currentPage = 1;
  let activeCategory = "all";
  let searchQuery = "";

  /* --- Fetch Blog Data --- */
  async function fetchBlogs() {
    try {
      const res = await fetch(BLOG_DATA_URL);
      if (!res.ok) throw new Error("Failed to fetch blog data");
      allBlogs = await res.json();
      filteredBlogs = [...allBlogs];
      renderBlogs();
      initFilters();
      initSearch();
    } catch (err) {
      console.error("[Blog] Error:", err);
    }
  }

  /* --- Format Date --- */
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("gu-IN", { year: "numeric", month: "long", day: "numeric" });
  }

  /* --- Create Blog Card HTML --- */
  function createBlogCard(blog) {
    return `
      <div class="col-lg-4 col-md-6" data-category="${blog.category}">
        <a href="blog-post.html?slug=${blog.slug}" class="blog-card reveal-item" style="position:relative; display:flex;">
          <div class="blog-card-img">
            <img src="${blog.featuredImage}" alt="${blog.title}" loading="lazy" width="400" height="250" class="img-loading-state" onload="this.classList.remove('img-loading-state'); this.classList.add('img-loaded-state');">
            <span class="blog-card-category">${blog.categoryLabel}</span>
          </div>
          <div class="blog-card-body">
            <div class="blog-card-meta">
              <span><iconify-icon icon="ph:calendar-bold" width="14"></iconify-icon> ${formatDate(blog.publishDate)}</span>
              <span><iconify-icon icon="ph:clock-bold" width="14"></iconify-icon> ${blog.readingTime}</span>
            </div>
            <h3 class="blog-card-title">${blog.title}</h3>
            <p class="blog-card-excerpt">${blog.excerpt}</p>
            <div class="blog-card-footer">
              <span class="blog-card-author">${blog.author}</span>
              <span class="blog-card-readmore">
                Read More <iconify-icon icon="ph:arrow-right-bold" width="14"></iconify-icon>
              </span>
            </div>
          </div>
        </a>
      </div>
    `;
  }

  /* --- Render Blogs --- */
  function renderBlogs() {
    const grid = document.getElementById("blogGrid");
    const noResults = document.getElementById("blogNoResults");
    const loadMoreWrap = document.getElementById("blogLoadMore");
    if (!grid) return;

    const end = currentPage * POSTS_PER_PAGE;
    const visible = filteredBlogs.slice(0, end);

    if (visible.length === 0) {
      grid.innerHTML = "";
      noResults.style.display = "block";
      loadMoreWrap.style.display = "none";
      return;
    }

    noResults.style.display = "none";
    grid.innerHTML = visible.map(createBlogCard).join("");

    // Show/hide load more
    if (end < filteredBlogs.length) {
      loadMoreWrap.style.display = "block";
    } else {
      loadMoreWrap.style.display = "none";
    }

    // Re-init reveal observer for new cards
    if (window.AppUtils && window.AppUtils.initRevealObserver) {
      // The MutationObserver in script.js will auto-detect new .reveal-item elements
    }
  }

  /* --- Filter Logic --- */
  function applyFilters() {
    currentPage = 1;
    filteredBlogs = allBlogs.filter(function (blog) {
      const matchCategory = activeCategory === "all" || blog.category === activeCategory;
      const matchSearch = !searchQuery ||
        blog.title.toLowerCase().includes(searchQuery) ||
        blog.excerpt.toLowerCase().includes(searchQuery) ||
        blog.title.includes(searchQuery); // Gujarati search (no toLowerCase needed for Unicode)
      return matchCategory && matchSearch;
    });
    renderBlogs();
  }

  function initFilters() {
    const filterBar = document.getElementById("blogFilterBar");
    if (!filterBar) return;

    filterBar.addEventListener("click", function (e) {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;

      filterBar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      activeCategory = btn.dataset.category;
      applyFilters();
    });
  }

  function initSearch() {
    const searchInput = document.getElementById("blogSearch");
    if (!searchInput) return;

    let debounceTimer;
    searchInput.addEventListener("input", function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(function () {
        searchQuery = searchInput.value.trim().toLowerCase();
        applyFilters();
      }, 300);
    });
  }

  /* --- Load More --- */
  function initLoadMore() {
    const btn = document.getElementById("loadMoreBtn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      currentPage++;
      renderBlogs();
    });
  }

  /* --- Init --- */
  function init() {
    fetchBlogs();
    initLoadMore();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
