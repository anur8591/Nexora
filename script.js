

/* ================= SCROLL REVEAL (2nd SLIDE CARDS) ================= */
const featureCards = document.querySelectorAll(".card");

if (featureCards.length > 0) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.2 }
  );

  featureCards.forEach(card => observer.observe(card));
}

