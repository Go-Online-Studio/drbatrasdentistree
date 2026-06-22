(document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("load", function () {
    let e = document.getElementById("preloader");
    e && setTimeout(() => e.classList.add("loaded"), 500);
  });
  let e = document.getElementById("mainNavbar");
  if (e) {
    let t = () => {
      window.scrollY > 50
        ? e.classList.add("scrolled")
        : e.classList.remove("scrolled");
    };
    (window.addEventListener("scroll", t, { passive: !0 }), t());
  }
  let l = window.location.pathname.split("/").pop() || "index.html";
  (document.querySelectorAll(".navbar-custom .nav-link").forEach((e) => {
    let t = e.getAttribute("href");
    t === l
      ? e.classList.add("active")
      : "index.html" !== l && e.classList.remove("active");
  }),
    document
      .querySelectorAll(".offcanvas .nav-link:not(.dropdown-toggle)")
      .forEach((e) => {
        e.addEventListener("click", () => {
          let e = bootstrap.Offcanvas.getInstance(
            document.getElementById("offcanvasNav"),
          );
          e && e.hide();
        });
      }),
    "undefined" != typeof AOS &&
      AOS.init({
        once: !0,
        duration: 800,
        easing: "ease-out-cubic",
        offset: 50,
      }));
  let s = document.getElementById("backToTop");
  if (
    (s &&
      (window.addEventListener(
        "scroll",
        () => {
          window.scrollY > 400
            ? s.classList.add("show")
            : s.classList.remove("show");
        },
        { passive: !0 },
      ),
      s.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      })),
    window.innerWidth > 991)
  ) {
    let o = document.getElementById("cursorDot"),
      r = document.getElementById("cursorOutline");
    o &&
      r &&
      (document.addEventListener("mousemove", (e) => {
        ((o.style.left = e.clientX + "px"),
          (o.style.top = e.clientY + "px"),
          (r.style.left = e.clientX + "px"),
          (r.style.top = e.clientY + "px"));
      }),
      document
        .querySelectorAll(
          "a, button, .btn-primary-custom, .btn-outline-custom, .program-card, .trainer-card, .feature-item",
        )
        .forEach((e) => {
          (e.addEventListener("mouseenter", () => r.classList.add("hover")),
            e.addEventListener("mouseleave", () =>
              r.classList.remove("hover"),
            ));
        }));
  }
  document.querySelectorAll('a[href^="#"]').forEach((e) => {
    e.addEventListener("click", function (e) {
      let t = document.querySelector(this.getAttribute("href"));
      t && (e.preventDefault(), t.scrollIntoView({ behavior: "smooth" }));
    });
  });
}),
  "serviceWorker" in navigator &&
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((e) => console.log("SW registered:", e.scope))
        .catch((e) => console.log("SW registration failed:", e));
    }));
