const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();

/**
 * Reveal on scroll (IntersectionObserver)
 * - Ajoute la classe .reveal sur les éléments à animer
 * - JS ajoute .is-visible quand c'est dans le viewport
 */
(function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  // Stagger automatique si tu mets data-stagger="true" sur un conteneur
  document.querySelectorAll('[data-stagger="true"]').forEach((container) => {
    const items = container.querySelectorAll(".reveal");
    items.forEach((el, i) => el.style.setProperty("--d", `${i * 70}ms`));
  });

  // Fallback si navigateur ancien
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          obs.unobserve(e.target); // une seule fois (meilleure perf)
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  els.forEach((el) => io.observe(el));
})();
