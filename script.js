const STORAGE_KEYS = {
    theme: "preferredTheme",
    modalDismissed: "contactModalDismissed",
};

const SYSTEM_INFO_PREFIX = "system.";
const COMMENT_VARIANT = 26;
const DAY_START_HOUR = 7;
const NIGHT_START_HOUR = 21;

const themeToggle = document.getElementById("themeToggle");
const themeToggleText = document.getElementById("themeToggleText");
const storageInfo = document.getElementById("storageInfo");
const reviewsStatus = document.getElementById("reviewsStatus");
const reviewsList = document.getElementById("reviewsList");
const contactModal = document.getElementById("contactModal");
const closeModalButton = document.getElementById("closeModalButton");

function getAutoTheme() {
    const hours = new Date().getHours();
    return hours >= DAY_START_HOUR && hours < NIGHT_START_HOUR
        ? "light"
        : "dark";
}

function setTheme(theme) {
    document.body.classList.toggle("light-theme", theme === "light");
    document.body.classList.toggle("dark-theme", theme === "dark");
    localStorage.setItem(STORAGE_KEYS.theme, theme);
    themeToggleText.textContent =
        theme === "light" ? "Dark Mode" : "Light Mode";
    renderStorageInfo();
}

function initializeTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
    setTheme(savedTheme || getAutoTheme());
}

function collectSystemInfo() {
    const info = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages.join(", "),
        vendor: navigator.vendor || "Unknown",
        cookieEnabled: String(navigator.cookieEnabled),
        onLine: String(navigator.onLine),
        hardwareConcurrency: String(navigator.hardwareConcurrency || "Unknown"),
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        colorDepth: String(window.screen.colorDepth),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    Object.entries(info).forEach(([key, value]) => {
        localStorage.setItem(`${SYSTEM_INFO_PREFIX}${key}`, value);
    });
}

function renderStorageInfo() {
    const entries = Object.keys(localStorage)
        .sort()
        .map((key) => ({ key, value: localStorage.getItem(key) }));

    if (!entries.length) {
        storageInfo.innerHTML = "<p>No data in localStorage.</p>";
        return;
    }

    storageInfo.innerHTML = `
    <h3>LocalStorage Data</h3>
    <div class="storage-grid">
      ${entries
          .map(
              ({ key, value }) => `
            <article class="storage-item">
              <strong>${key}</strong>
              <span>${value}</span>
            </article>
          `,
          )
          .join("")}
    </div>
  `;
}

function renderReviews(comments) {
    reviewsStatus.textContent = `Received ${comments.length} comments.`;
    reviewsList.innerHTML = comments
        .map(
            (comment) => `
        <article class="review-card">
          <div class="review-card-header">
            <h3>${comment.name}</h3>
            <a href="mailto:${comment.email}">${comment.email}</a>
          </div>
          <p>${comment.body}</p>
        </article>
      `,
        )
        .join("");
}

async function loadReviews() {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${COMMENT_VARIANT}/comments`,
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const comments = await response.json();
        renderReviews(comments);
    } catch (error) {
        reviewsStatus.textContent = `Failed to load comments: ${error.message}`;
    }
}

function openModal() {
    contactModal.classList.remove("hidden");
    contactModal.setAttribute("aria-hidden", "false");
}

function closeModal(persistDismissal = false) {
    contactModal.classList.add("hidden");
    contactModal.setAttribute("aria-hidden", "true");

    if (persistDismissal) {
        sessionStorage.setItem(STORAGE_KEYS.modalDismissed, "true");
    }
}

function initializeModal() {
    if (sessionStorage.getItem(STORAGE_KEYS.modalDismissed) === "true") {
        return;
    }

    window.setTimeout(() => {
        openModal();
    }, 6000);
}

themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light-theme")
        ? "dark"
        : "light";
    setTheme(nextTheme);
});

closeModalButton.addEventListener("click", () => {
    closeModal(true);
});

contactModal.addEventListener("click", (event) => {
    if (event.target.dataset.closeModal === "true") {
        closeModal(true);
    }
});

collectSystemInfo();
initializeTheme();
renderStorageInfo();
loadReviews();
initializeModal();
