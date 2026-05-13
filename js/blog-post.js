/* ==============================================
   BLOG-POST.JS - Individual Blog Page Renderer
   Dr. Batra's Dentistree
   ============================================== */
(function () {
  "use strict";

  const BLOG_DATA_URL = "data/blogsData.json";
  const BASE_URL = "https://drbatrasdentistree.com/";

  function getSlug() {
    const params = new URLSearchParams(window.location.search);
    return params.get("slug");
  }

  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString("gu-IN", { year: "numeric", month: "long", day: "numeric" });
  }

  /* --- Render Content Blocks --- */
  function renderContent(content) {
    return content.map(function (block) {
      switch (block.type) {
        case "paragraph":
          return '<p>' + block.text + '</p>';
        case "heading":
          var tag = "h" + (block.level || 2);
          return '<' + tag + '>' + block.text + '</' + tag + '>';
        case "list":
          return '<ul>' + block.items.map(function (item) { return '<li>' + item + '</li>'; }).join("") + '</ul>';
        case "highlight":
          var cls = block.style ? " " + block.style : "";
          return '<div class="blog-highlight' + cls + '">' + block.text + '</div>';
        case "quote":
          return '<div class="blog-quote">' + block.text + '</div>';
        case "attention":
          return '<div class="blog-attention"><div class="blog-attention-title">' +
            (block.title || "Important") + '</div><p style="margin:0;">' + block.text + '</p></div>';
        case "faq":
          var faqId = "blogFaq" + Math.random().toString(36).substr(2, 6);
          return '<div class="accordion faq-accordion my-4" id="' + faqId + '">' +
            block.items.map(function (faq, i) {
              var colId = faqId + "-" + i;
              var show = i === 0 ? " show" : "";
              var collapsed = i === 0 ? "" : " collapsed";
              return '<div class="accordion-item"><h2 class="accordion-header">' +
                '<button class="accordion-button' + collapsed + '" type="button" data-bs-toggle="collapse" data-bs-target="#' + colId + '">' +
                faq.q + '</button></h2>' +
                '<div id="' + colId + '" class="accordion-collapse collapse' + show + '" data-bs-parent="#' + faqId + '">' +
                '<div class="accordion-body">' + faq.a + '</div></div></div>';
            }).join("") + '</div>';
        case "internal-link":
          return '<p><a href="' + block.href + '">' + block.text + '</a></p>';
        default:
          return '';
      }
    }).join("");
  }

  /* --- Share Buttons HTML --- */
  function getShareButtons(url, title) {
    var encoded = encodeURIComponent(url);
    var encodedTitle = encodeURIComponent(title);
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var waBaseUrl = isMobile ? "https://api.whatsapp.com/send?text=" : "https://web.whatsapp.com/send?text=";

    return [
      { cls: "whatsapp", icon: "mdi:whatsapp", href: waBaseUrl + encodedTitle + "%20" + encoded },
      { cls: "facebook", icon: "mdi:facebook", href: "https://www.facebook.com/sharer/sharer.php?u=" + encoded },
      { cls: "twitter", icon: "mdi:twitter", href: "https://twitter.com/intent/tweet?url=" + encoded + "&text=" + encodedTitle },
      { cls: "linkedin", icon: "mdi:linkedin", href: "https://www.linkedin.com/sharing/share-offsite/?url=" + encoded },
      { cls: "copy-link", icon: "ph:link-bold", href: "#copy" }
    ].map(function (btn) {
      if (btn.cls === "copy-link") {
        return '<button class="blog-share-btn ' + btn.cls + '" data-url="' + url + '" aria-label="Copy link">' +
          '<iconify-icon icon="' + btn.icon + '"></iconify-icon></button>';
      }
      return '<a href="' + btn.href + '" target="_blank" rel="noopener noreferrer" class="blog-share-btn ' + btn.cls + '" aria-label="Share on ' + btn.cls + '">' +
        '<iconify-icon icon="' + btn.icon + '"></iconify-icon></a>';
    }).join("");
  }

  /* --- Copy Link Handler --- */
  function initCopyLink() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".copy-link");
      if (!btn) return;
      e.preventDefault();
      var url = btn.dataset.url || window.location.href;

      if (navigator.share) {
        navigator.share({ title: document.title, url: url }).catch(function () { });
        return;
      }

      navigator.clipboard.writeText(url).then(function () {
        var toast = document.getElementById("blogToast");
        if (toast) {
          toast.classList.add("show");
          setTimeout(function () { toast.classList.remove("show"); }, 2500);
        }
      });
    });
  }

  /* --- Render Blog Card (for related/sidebar) --- */
  function createMiniCard(blog) {
    return '<a href="blog-post.html?slug=' + blog.slug + '" style="text-decoration:none;display:block;margin-bottom:16px;">' +
      '<div class="blog-card" style="position:relative;">' +
      '<div class="blog-card-img"><img src="' + blog.featuredImage + '" alt="' + blog.title + '" loading="lazy" class="img-loading-state" onload="this.classList.remove(\'img-loading-state\'); this.classList.add(\'img-loaded-state\');"></div>' +
      '<div class="blog-card-body">' +
      '<div class="blog-card-meta"><span><iconify-icon icon="ph:calendar-bold" width="14"></iconify-icon> ' + formatDate(blog.publishDate) + '</span></div>' +
      '<h3 class="blog-card-title" style="font-size:0.95rem;">' + blog.title + '</h3>' +
      '<span class="blog-card-readmore">Read More <iconify-icon icon="ph:arrow-right-bold" width="14"></iconify-icon></span>' +
      '</div></div></a>';
  }

  function createRelatedCard(blog) {
    return '<div class="col-lg-4 col-md-6">' +
      '<a href="blog-post.html?slug=' + blog.slug + '" class="blog-card reveal-item" style="position:relative;display:flex;">' +
      '<div class="blog-card-img"><img src="' + blog.featuredImage + '" alt="' + blog.title + '" loading="lazy" width="400" height="250" class="img-loading-state" onload="this.classList.remove(\'img-loading-state\'); this.classList.add(\'img-loaded-state\');">' +
      '<span class="blog-card-category">' + blog.categoryLabel + '</span></div>' +
      '<div class="blog-card-body">' +
      '<div class="blog-card-meta"><span><iconify-icon icon="ph:calendar-bold" width="14"></iconify-icon> ' + formatDate(blog.publishDate) + '</span>' +
      '<span><iconify-icon icon="ph:clock-bold" width="14"></iconify-icon> ' + blog.readingTime + '</span></div>' +
      '<h3 class="blog-card-title">' + blog.title + '</h3>' +
      '<p class="blog-card-excerpt">' + blog.excerpt + '</p>' +
      '<div class="blog-card-footer"><span class="blog-card-author">' + blog.author + '</span>' +
      '<span class="blog-card-readmore">Read More <iconify-icon icon="ph:arrow-right-bold" width="14"></iconify-icon></span>' +
      '</div></div></a></div>';
  }

  /* --- Schema Markup --- */
  function injectSchema(blog) {
    var schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": blog.title,
      "description": blog.metaDescription,
      "image": BASE_URL + blog.featuredImage,
      "datePublished": blog.publishDate,
      "author": { "@type": "Person", "name": blog.author },
      "publisher": {
        "@type": "Organization",
        "name": "Dr. Batra's Dentistree",
        "url": BASE_URL
      },
      "url": BASE_URL + "blog-post.html?slug=" + blog.slug
    };
    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    // FAQ Schema
    var faqBlocks = blog.content.filter(function (b) { return b.type === "faq"; });
    if (faqBlocks.length) {
      var allFaqs = [];
      faqBlocks.forEach(function (b) { allFaqs = allFaqs.concat(b.items); });
      var faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": allFaqs.map(function (f) {
          return { "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } };
        })
      };
      var s2 = document.createElement("script");
      s2.type = "application/ld+json";
      s2.textContent = JSON.stringify(faqSchema);
      document.head.appendChild(s2);
    }
  }

  /* --- Set Meta Tags --- */
  function setMeta(blog) {
    var url = BASE_URL + "blog-post.html?slug=" + blog.slug;
    var imgUrl = BASE_URL + blog.featuredImage;

    document.title = blog.metaTitle;
    var setContent = function (id, val) { var el = document.getElementById(id); if (el) el.setAttribute("content", val); };
    setContent("metaDesc", blog.metaDescription);
    setContent("metaKeywords", (blog.seoKeywords || []).join(", "));
    setContent("ogTitle", blog.metaTitle);
    setContent("ogDesc", blog.metaDescription);
    setContent("ogImage", imgUrl);
    setContent("ogUrl", url);
    setContent("twTitle", blog.metaTitle);
    setContent("twDesc", blog.metaDescription);
    setContent("twImage", imgUrl);

    var canon = document.getElementById("canonicalUrl");
    if (canon) canon.setAttribute("href", url);
    document.getElementById("pageTitle").textContent = blog.metaTitle;
  }

  /* --- Main Render --- */
  async function init() {
    var slug = getSlug();
    if (!slug) { window.location.href = "blogs.html"; return; }

    var res, allBlogs;
    try {
      res = await fetch(BLOG_DATA_URL);
      allBlogs = await res.json();
    } catch (e) { console.error("[BlogPost]", e); return; }

    var blog = allBlogs.find(function (b) { return b.slug === slug; });
    if (!blog) { window.location.href = "blogs.html"; return; }

    // Meta
    setMeta(blog);

    var heroImgBlog = document.getElementById("heroImgBlog");
    if (heroImgBlog) { heroImgBlog.src = blog.featuredImage; heroImgBlog.alt = blog.title; }

    var heroTitle = document.getElementById("heroTitle");
    if (heroTitle) heroTitle.textContent = blog.title;
    var heroCat = document.getElementById("heroCategory");
    if (heroCat) heroCat.textContent = blog.categoryLabel;
    var heroBread = document.getElementById("heroBreadcrumb");
    if (heroBread) heroBread.textContent = blog.title.substring(0, 40) + "...";

    var heroMeta = document.getElementById("heroMeta");
    if (heroMeta) {
      heroMeta.innerHTML =
        '<span><iconify-icon icon="ph:user-bold"></iconify-icon> ' + blog.author + '</span>' +
        '<span><iconify-icon icon="ph:calendar-bold"></iconify-icon> ' + formatDate(blog.publishDate) + '</span>' +
        '<span><iconify-icon icon="ph:clock-bold"></iconify-icon> ' + blog.readingTime + '</span>';
    }

    // Author Card
    // var authorCard = document.getElementById("authorCard");
    // if (authorCard) {
    //   var initials = blog.author.split(" ").map(function (n) { return n[0]; }).join("");
    //   authorCard.innerHTML = '<div class="blog-author-avatar">' + initials + '</div>' +
    //     '<div><div class="blog-author-name">' + blog.author + '</div>' +
    //     '<div class="blog-author-role">' + blog.authorRole + '</div></div>';
    // }

    // Content
    var body = document.getElementById("blogBody");
    if (body) body.innerHTML = renderContent(blog.content);

    // Share Buttons
    var pageUrl = window.location.href;
    var shareHtml = getShareButtons(pageUrl, blog.title);
    var shareDesktop = document.getElementById("shareDesktop");
    if (shareDesktop) shareDesktop.innerHTML = shareHtml;
    var shareMobile = document.getElementById("shareMobile");
    if (shareMobile) shareMobile.innerHTML = shareHtml;

    // Related Blogs
    var relatedEl = document.getElementById("relatedBlogs");
    if (relatedEl && blog.relatedBlogs) {
      var related = blog.relatedBlogs.map(function (s) { return allBlogs.find(function (b) { return b.slug === s || b.id === s; }); }).filter(Boolean);
      relatedEl.innerHTML = related.map(createRelatedCard).join("");
    }

    // Sidebar Blogs
    var sidebarEl = document.getElementById("sidebarBlogs");
    if (sidebarEl) {
      var others = allBlogs.filter(function (b) { return b.slug !== slug; }).slice(0, 3);
      sidebarEl.innerHTML = others.map(createMiniCard).join("");
    }

    // Schema
    injectSchema(blog);

    // Copy Link
    initCopyLink();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
