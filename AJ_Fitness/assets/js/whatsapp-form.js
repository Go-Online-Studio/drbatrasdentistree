document.addEventListener("DOMContentLoaded", function () {
  let e = document.getElementById("contactForm");
  e &&
    e.addEventListener("submit", function (t) {
      t.preventDefault();
      let a = e.querySelectorAll("input, select, textarea"),
        n = {};
      if (
        (a.forEach(function (e) {
          let t = e.placeholder || "",
            a = e.type || e.tagName.toLowerCase();
          "text" === a || t.toLowerCase().includes("name")
            ? (n.name = e.value.trim())
            : "email" === a || t.toLowerCase().includes("email")
              ? (n.email = e.value.trim())
              : "tel" === a || t.toLowerCase().includes("phone")
                ? (n.phone = e.value.trim())
                : "SELECT" === e.tagName
                  ? (n.service = e.value.trim())
                  : "TEXTAREA" === e.tagName && (n.message = e.value.trim());
        }),
        !n.name)
      ) {
        var r;
        ((r = e.querySelector(
          'input[type="text"], input[placeholder*="Name"]',
        )),
          r &&
            ((r.style.borderColor = "var(--secondary)"),
            r.focus(),
            setTimeout(function () {
              r.style.borderColor = "";
            }, 2500)));
        return;
      }
      let o = `*New Inquiry — AJ Fitness*`;
      ((o += `*Name:* ${n.name || "N/A"}`),
        (o += `*Phone:* ${n.phone || "N/A"}`),
        (o += `*Email:* ${n.email || "N/A"}`),
        (o += `*Service:* ${n.service || "N/A"}`),
        (o += `*Message:* ${n.message || "N/A"}`));
      let i =
          (window.AJ_CONFIG && window.AJ_CONFIG.WHATSAPP_PHONE) || "918487042256", l = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), s = `${l ? "https://api.whatsapp.com" : "https://web.whatsapp.com"}/send?phone=${i}&text=${encodeURIComponent(o)}`;
          (window.open(s, "_blank"), e.reset());
    });
});
