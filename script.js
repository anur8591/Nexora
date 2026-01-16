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

/* ================= MODAL ================= */
let selectedType = "image";

function openModal() {
  const modal = document.getElementById("mediaModal");
  const resultBox = document.getElementById("resultBox");

  if (modal) modal.style.display = "flex";
  if (resultBox) resultBox.style.display = "none";
}

function closeModal() {
  const modal = document.getElementById("mediaModal");
  if (modal) modal.style.display = "none";
}

function selectType(btn, type) {
  selectedType = type;
  document.querySelectorAll(".type-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function uploadMedia() {
  const input = document.getElementById("mediaInput");
  const box = document.getElementById("resultBox");
  const text = document.getElementById("resultText");

  if (!input || !box || !text) return;

  if (!input.files.length) {
    alert("Please select a file");
    return;
  }

  box.style.display = "block";
  text.innerText = `Analyzing ${selectedType}...`;

  setTimeout(() => {
    text.innerText = "Deepfake probability: 72% (demo)";
  }, 2000);
}

/* ================= CARD ACTIONS ================= */
function analyzeText() {
  const r = document.getElementById("textResult");
  if (!r) return;

  r.style.display = "block";
  r.innerText = "Analyzing text authenticity...";

  setTimeout(() => {
    r.innerText = "Possible AI-generated content detected (demo)";
  }, 1800);
}

function analyzeLink() {
  const r = document.getElementById("linkResult");
  if (!r) return;

  r.style.display = "block";
  r.innerText = "Scanning website for risks...";

  setTimeout(() => {
    r.innerText = "Suspicious signals found (demo)";
  }, 1800);
}

function analyzeBatch() {
  const r = document.getElementById("batchResult");
  if (!r) return;

  r.style.display = "block";
  r.innerText = "Batch analysis started...";

  setTimeout(() => {
    r.innerText = "Multiple files flagged as suspicious (demo)";
  }, 2200);
}

/* ================= 3rd SLIDE SCROLL HIGHLIGHT ================= */
const scenarioWrapper = document.querySelector(".scenario-wrapper");
const scenarioCards = document.querySelectorAll(".scenario-card");

if (scenarioWrapper && scenarioCards.length > 0) {
  scenarioWrapper.addEventListener("scroll", () => {
    const center = scenarioWrapper.scrollLeft + scenarioWrapper.offsetWidth / 2;

    scenarioCards.forEach(card => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;

      if (Math.abs(center - cardCenter) < card.offsetWidth / 2) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });
  });
}