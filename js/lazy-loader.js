/* Lightweight one-time asset loader utilities */
(function () {
  "use strict";

  const scriptCache = new Map();
  const styleCache = new Map();

  function loadScript(src) {
    if (!src) return Promise.reject(new Error("Missing script src"));
    if (scriptCache.has(src)) return scriptCache.get(src);

    const existing = document.querySelector('script[src="' + src + '"]');
    if (existing && (existing.dataset.loaded === "true" || existing.readyState === "complete")) {
      return Promise.resolve();
    }

    const promise = new Promise((resolve, reject) => {
      if (existing) {
        existing.addEventListener("load", function onLoad() {
          existing.dataset.loaded = "true";
          existing.removeEventListener("load", onLoad);
          resolve();
        });
        existing.addEventListener("error", reject, { once: true });
        return;
      }

      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = function () {
        s.dataset.loaded = "true";
        resolve();
      };
      s.onerror = reject;
      document.body.appendChild(s);
    });

    scriptCache.set(src, promise);
    return promise;
  }

  function loadStyle(href) {
    if (!href) return Promise.reject(new Error("Missing stylesheet href"));
    if (styleCache.has(href)) return styleCache.get(href);

    const existing = document.querySelector('link[href="' + href + '"]');
    if (existing) return Promise.resolve();

    const promise = new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });

    styleCache.set(href, promise);
    return promise;
  }

  window.LazyAssets = {
    loadScript: loadScript,
    loadStyle: loadStyle,
  };
})();
