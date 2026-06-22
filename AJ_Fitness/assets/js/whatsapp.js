function initWhatsAppLinks() {
  document.addEventListener("click", function (t) {
    let e = t.target.closest(".enquiry-btn");
    if (!e) return;
    t.preventDefault();
    let n = e.dataset.program || "General Inquiry",
      a = encodeURIComponent(`Hello, I want enquiry for ${n}`),
      i = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    window.open(
      `${i ? "https://api.whatsapp.com" : "https://web.whatsapp.com"}/send?phone=918487042256&text=${a}`,
      "_blank",
    );
  });
}
document.addEventListener("DOMContentLoaded", function () {
  (initWhatsAppLinks(),
    document.querySelectorAll(".btn-whatsapp[data-program]").forEach((t) => {
      t.addEventListener("click", function (t) {
        t.preventDefault();
        let e = this.dataset.program || "General Inquiry",
          n = encodeURIComponent(`Hello, I want enquiry for ${e}`),
          a = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        window.open(
          `${a ? "https://api.whatsapp.com" : "https://web.whatsapp.com"}/send?phone=918487042256&text=${n}`,
          "_blank",
        );
      });
    }));
});
