document.addEventListener("DOMContentLoaded", function () {
  let t = document.getElementById("timetableContent"),
    e = document.querySelectorAll(
      "#timetableTabs .nav-link, #timetableTabsFull .nav-link",
    );
  if (!t) return;
  let a = null;
  function n(e) {
    let n = a[e];
    if (!n) {
      t.innerHTML =
        '<p class="text-center text-muted mt-4">No classes scheduled.</p>';
      return;
    }
    t.innerHTML = n
      .map(
        (t) => `
      <div class="timetable-card">
        <span class="tt-time">${t.time}</span>
        <span class="tt-class">${t.class}</span>
        <span class="tt-trainer">${t.trainer}</span>
      </div>
    `,
      )
      .join("");
  }
  (fetch("data/timetable.json")
    .then((t) => t.json())
    .then((t) => {
      ((a = t), n("monday"));
    })
    .catch((t) => console.error("Error loading timetable:", t)),
    e.forEach((t) => {
      t.addEventListener("click", function () {
        (e.forEach((t) => t.classList.remove("active")),
          this.classList.add("active"));
        let t = this.dataset.day;
        a && n(t);
      });
    }));
});
