/* ========================================================
   WHATSAPP-FORM.JS - Shared WhatsApp Form Handler
   Dr. Batra's Dentistree
   
   Applied to: index.html (#whatsappForm), contact.html (#contactForm)
   Features: Device detection, debounced resize, toast, validation, form reset
   ======================================================== */
(function () {
  "use strict";

  const WA_CONFIG = {
    phone: "919879625787",
    clinicName: "Dr. Batra's Dentistree",
  };

  /* ── Device Detection ── */
  function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth <= 768;
  }

  function getWhatsAppURL(message) {
    const encoded = encodeURIComponent(message);
    const baseURL = isMobileDevice()
      ? "https://api.whatsapp.com/send"
      : "https://web.whatsapp.com/send";
    return `${baseURL}?phone=${WA_CONFIG.phone}&text=${encoded}`;
  }

  /* ── Debounce Utility ── */
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  /* ── Toast Notification ── */
  function showToast(text) {
    // Remove existing toast
    const existing = document.querySelector(".wa-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "wa-toast";
    toast.innerHTML = `
      <iconify-icon icon="mdi:whatsapp" style="font-size:1.3rem;"></iconify-icon>
      ${text}
    `;
    document.body.appendChild(toast);

    // Trigger show
    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    // Auto hide after 3s
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  /* ── Upgrade Submit Button to WhatsApp Style ── */
  function upgradeSubmitButton(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn || submitBtn.classList.contains("btn-whatsapp")) return;

    submitBtn.className = "btn-whatsapp";
    submitBtn.innerHTML = `
      <iconify-icon icon="mdi:whatsapp" style="font-size:1.4rem;"></iconify-icon>
      Send via WhatsApp
    `;
  }

  /* ── Form Handler ── */
  function initWhatsAppForm(formSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    // Upgrade button appearance
    upgradeSubmitButton(form);

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Bootstrap validation
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      // Collect form data
      const name = form.querySelector('[name="name"]')?.value.trim() || "";
      const phone = form.querySelector('[name="phone"]')?.value.trim() || "";
      const service = form.querySelector('[name="service"]')?.value || "General Consultation";
      const message = form.querySelector('[name="message"]')?.value.trim() || "";

      // Build WhatsApp message
      const formattedMsg =
        `🦷 *New Appointment Request*\n\n` +
        `*Name:* ${name}\n` +
        `*Phone:* ${phone}\n` +
        `*Service:* ${service}\n` +
        `*Message:* ${message || "N/A"}\n\n` +
        `_Sent from ${WA_CONFIG.clinicName} Website_`;

      // Show toast
      showToast("Redirecting to WhatsApp...");

      // Open WhatsApp after brief UX delay
      setTimeout(() => {
        const url = getWhatsAppURL(formattedMsg);
        window.open(url, "_blank");
      }, 800);

      // Reset form
      form.reset();
      form.classList.remove("was-validated");
    });
  }

  /* ── Recalculate on Resize (debounced) ── */
  window.addEventListener(
    "resize",
    debounce(() => {
      // WhatsApp URL type may change on resize (mobile ↔ desktop)
      // No action needed until next submit — getWhatsAppURL is called fresh each time
    }, 300)
  );

  /* ── Initialize on DOM Ready ── */
  document.addEventListener("DOMContentLoaded", function () {
    // Index page form
    initWhatsAppForm("#whatsappForm");
    // Contact page form
    initWhatsAppForm("#contactForm");
  });
})();
