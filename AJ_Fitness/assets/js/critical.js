!function(){
  "use strict";
  document.addEventListener("DOMContentLoaded", function(){
    // Active class logic
    !function a(){
      let t=window.location.pathname.split("/").pop()||"index.html",
          e=document.querySelectorAll("#navbarMain .nav-link");
      e.forEach(a=>{
        a.classList.remove("active");
        let e=a.getAttribute("href");
        e===t&&a.classList.add("active")
      })
    }();

    // Scroll background logic
    !function a(){
      let t=document.getElementById("navbarMain");
      function e(){
        window.scrollY>50?t.classList.add("scrolled"):t.classList.remove("scrolled")
      }
      t&&(window.addEventListener("scroll",e,{passive:!0}),e())
    }();

    // Offcanvas menu close logic
    !function a(){
      let t=document.getElementById("offcanvasNav");
      t&&document.querySelectorAll("#offcanvasNav .nav-link").forEach(a=>{
        a.addEventListener("click",function(){
          let a=bootstrap.Offcanvas.getInstance(t);
          a&&a.hide()
        })
      })
    }();

    // Smooth scroll for anchor links
    document.addEventListener("click",function(a){
      let t=a.target.closest('a[href^="#"]');
      if(!t)return;
      let e=t.getAttribute("href");
      if("#"===e||e.length<2)return;
      let n=document.querySelector(e);
      n&&(a.preventDefault(),n.scrollIntoView({behavior:"smooth"}))
    })
  })
}();