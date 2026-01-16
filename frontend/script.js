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

/* ================= LOGIN MODAL LOGIC ================= */

function openLoginModal() {
  document.getElementById("loginModal").style.display = "flex";
}

function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none";
}

/* ================= GOOGLE LOGIN ================= */

function continueWithGoogle() {

  alert("Redirecting to Google Sign-In...");
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

/* ================= TYPE SELECTION ================= */
function selectType(btn, type) {
  selectedType = type;

  document.querySelectorAll(".type-btn").forEach(b =>
    b.classList.remove("active")
  );
  btn.classList.add("active");

  // Reset file on type change (UX improvement)
  resetFilePreview();
}

/* ================= FILE PREVIEW ================= */
function handleFileSelect(input) {
  const preview = document.getElementById("filePreview");
  const fileName = document.getElementById("fileName");
  const fileType = document.getElementById("fileType");
  const fileIcon = document.getElementById("fileIcon");

  if (!input.files || !input.files[0]) return;

  const file = input.files[0];
  const type = file.type;

  fileName.textContent = file.name;
  fileType.textContent =
    `${type || "Unknown type"} • ${(file.size / 1024 / 1024).toFixed(2)} MB`;

  if (type.startsWith("image")) fileIcon.textContent = "🖼️";
  else if (type.startsWith("video")) fileIcon.textContent = "🎥";
  else if (type.startsWith("audio")) fileIcon.textContent = "🎧";
  else fileIcon.textContent = "📄";

  preview.classList.add("show");
}

/* ================= RESET PREVIEW ================= */
function resetFilePreview() {
  const input = document.getElementById("mediaInput");
  const preview = document.getElementById("filePreview");
  const fileName = document.getElementById("fileName");
  const fileType = document.getElementById("fileType");
  const fileIcon = document.getElementById("fileIcon");

  if (input) input.value = "";
  if (preview) preview.classList.remove("show");

  if (fileName) fileName.textContent = "No file selected";
  if (fileType) fileType.textContent = "";
  if (fileIcon) fileIcon.textContent = "📄";
}

/* ================= UPLOAD (DEMO ANALYSIS) ================= */
function uploadMedia() {
  const input = document.getElementById("mediaInput");
  const box = document.getElementById("resultBox");
  const text = document.getElementById("resultText");

  if (!input || !box || !text) return;

  if (!input.files.length) {
    alert("Please select a file first");
    return;
  }

  box.style.display = "block";
  text.innerText = `Analyzing ${selectedType} file...`;

  // Demo delay
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

/* ================= BATCH FILE HANDLING ================= */

const batchInput = document.getElementById("batchInput");
const batchResult = document.getElementById("batchResult");

// Create preview container dynamically
const batchPreview = document.createElement("div");
batchPreview.className = "batch-preview";

const batchCount = document.createElement("p");
batchCount.className = "batch-count";

const batchFileList = document.createElement("ul");
batchFileList.className = "batch-file-list";

batchPreview.appendChild(batchCount);
batchPreview.appendChild(batchFileList);

// Attach preview below result
batchResult.parentElement.insertBefore(batchPreview, batchResult);

// Hide initially
batchPreview.style.display = "none";

/* -------- On File Select -------- */
batchInput.addEventListener("change", () => {
  batchFileList.innerHTML = "";

  if (batchInput.files.length === 0) {
    batchPreview.style.display = "none";
    batchCount.innerText = "No files selected";
    return;
  }

  batchPreview.style.display = "block";
  batchCount.innerText = `${batchInput.files.length} file(s) selected`;

  Array.from(batchInput.files).forEach(file => {
    const li = document.createElement("li");
    li.textContent = file.name;
    batchFileList.appendChild(li);
  });
});

/* -------- Start Batch Analysis -------- */
function analyzeBatch() {
  if (!batchInput.files.length) {
    alert("Please select files before starting batch analysis.");
    return;
  }

  batchResult.style.display = "block";
  batchResult.innerText = "Batch analysis in progress...";

  setTimeout(() => {
    batchResult.innerText =
      `${batchInput.files.length} file(s) flagged as suspicious (demo)`;
  }, 2000);
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
/* ================= STAGGERED SCROLL REVEAL ================= */

const steps = document.querySelectorAll(".step-card");

const stepObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // stagger effect
        setTimeout(() => {
          entry.target.classList.add("reveal");
        }, index * 200); // 200ms delay between cards

        stepObserver.unobserve(entry.target); // animate once
      }
    });
  },
  {
    threshold: 0.3,
  }
);

steps.forEach(step => stepObserver.observe(step));


const trustCards = document.querySelectorAll(".trust-card");

const trustObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("reveal");
        }, index * 200);
        trustObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);

trustCards.forEach(card => trustObserver.observe(card));

const ctaContent = document.querySelector(".cta-content");

const ctaObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        ctaObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

ctaObserver.observe(ctaContent);

const footerItems = document.querySelectorAll(".footer-container > div");

const footerObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

footerItems.forEach(item => footerObserver.observe(item));
