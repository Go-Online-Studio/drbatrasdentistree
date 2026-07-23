!function(){"use strict";var e;let t={phone:"919879625787",clinicName:"Dr. Batra's Dentistree"};function n(e){let n=document.querySelector(e);n&&(!function e(t){let n=t.querySelector('button[type="submit"]');!n||n.classList.contains("btn-whatsapp")||(n.className="btn-whatsapp",n.innerHTML=`
      <iconify-icon icon="mdi:whatsapp" style="font-size:1.4rem;"></iconify-icon>
      Send via WhatsApp
    `)}(n),n.addEventListener("submit",function(e){if(e.preventDefault(),!n.checkValidity()){n.classList.add("was-validated");return}if(typeof gtag_report_conversion==="function"){gtag_report_conversion()}let i=n.querySelector('[name="name"]')?.value.trim()||"",a=n.querySelector('[name="phone"]')?.value.trim()||"",s=n.querySelector('[name="service"]')?.value||"General Consultation",o=n.querySelector('[name="message"]')?.value.trim()||"",r=`🦷 *New Appointment Request*

*Name:* ${i}
*Phone:* ${a}
*Service:* ${s}
*Message:* ${o||"N/A"}

_Sent from ${t.clinicName} Website_`;(function e(t){let n=document.querySelector(".wa-toast");n&&n.remove();let i=document.createElement("div");i.className="wa-toast",i.innerHTML=`
      <iconify-icon icon="mdi:whatsapp" style="font-size:1.3rem;"></iconify-icon>
      ${t}
    `,document.body.appendChild(i),requestAnimationFrame(()=>{i.classList.add("show")}),setTimeout(()=>{i.classList.remove("show"),setTimeout(()=>i.remove(),500)},3e3)})("Redirecting to WhatsApp..."),setTimeout(()=>{let e=function e(n){let i=encodeURIComponent(n),a=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768?"https://api.whatsapp.com/send":"https://web.whatsapp.com/send";return`${a}?phone=${t.phone}&text=${i}`}(r);window.open(e,"_blank")},800),n.reset(),n.classList.remove("was-validated")}))}let i;window.addEventListener("resize",(e=()=>{},function(...t){clearTimeout(i),i=setTimeout(()=>e.apply(this,t),300)})),document.addEventListener("DOMContentLoaded",function(){n("#whatsappForm"),n("#contactForm")})}();