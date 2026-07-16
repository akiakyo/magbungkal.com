document.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("analyticsStatus");
  const heroStatus = document.getElementById("heroServerStatus");
  const analyticsPlayers = document.getElementById("analyticsPlayers");
  const heroPlayers = document.getElementById("heroPlayers");

  const syncLiveSummary = () => {
    if (status && heroStatus) heroStatus.textContent = status.textContent || "Checking…";
    if (analyticsPlayers && heroPlayers) heroPlayers.textContent = analyticsPlayers.textContent || "0";
  };

  syncLiveSummary();
  const observer = new MutationObserver(syncLiveSummary);
  [status, analyticsPlayers].forEach(el => el && observer.observe(el, { childList:true, subtree:true, characterData:true }));

  document.querySelectorAll(".why-card,.update-item,.feature-card").forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index * 70, 350)}ms`);
    item.classList.add("home-reveal");
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold:0.12 });

  document.querySelectorAll(".home-reveal").forEach(el => revealObserver.observe(el));
});


// Accessible player-review carousel controls and progress indicator.
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".reviews-track");
  const previous = document.querySelector(".reviews-prev");
  const next = document.querySelector(".reviews-next");
  const progress = document.querySelector(".reviews-progress span");
  if (!track) return;
  const step = () => Math.min(track.clientWidth * 0.85, 398);
  previous?.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  next?.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
  const update = () => {
    const max = Math.max(1, track.scrollWidth - track.clientWidth);
    const ratio = Math.min(1, Math.max(0, track.scrollLeft / max));
    if (progress) progress.style.transform = `scaleX(${Math.max(.12, ratio)})`;
    if (previous) previous.disabled = track.scrollLeft < 4;
    if (next) next.disabled = track.scrollLeft > max - 4;
  };
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
});
