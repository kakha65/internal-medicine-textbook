(() => {
  const searchInput = document.getElementById("topicSearch");
  const cards = [...document.querySelectorAll(".topic-card")];
  const resultsLabel = document.getElementById("resultsLabel");
  const emptyState = document.getElementById("emptyState");
  const resetButton = document.getElementById("resetSearch");
  const topicCount = document.getElementById("topicCount");
  const addTopicButton = document.getElementById("addTopicButton");

  /*
    ADMIN / GITHUB CONFIGURATION
    ----------------------------
    On a normal GitHub Pages project URL such as:
      https://USERNAME.github.io/REPOSITORY/
    the repository is detected automatically.

    If you use a custom domain, optionally put the repository URL below:
      const ADMIN_REPOSITORY_URL = "https://github.com/USERNAME/REPOSITORY";
  */
  const ADMIN_REPOSITORY_URL = "";
  const ADMIN_BRANCH = "main";
  const ADMIN_CHAPTERS_PATH = "chapters";
  const LOCAL_STORAGE_KEY = "cardiologyAdminRepository";

  topicCount.textContent = cards.length;

  const normalize = (value) =>
    value
      .toLocaleLowerCase("ka-GE")
      .normalize("NFKD")
      .replace(/\s+/g, " ")
      .trim();

  function applySearch() {
    const query = normalize(searchInput.value);
    let visible = 0;

    cards.forEach((card) => {
      const searchableText = normalize(
        `${card.dataset.search || ""} ${card.textContent}`
      );

      const shouldShow = !query || searchableText.includes(query);
      card.hidden = !shouldShow;

      if (shouldShow) visible += 1;
    });

    resultsLabel.textContent =
      visible === 1 ? "ნაჩვენებია 1 თემა" : `ნაჩვენებია ${visible} თემა`;

    emptyState.hidden = visible !== 0;
  }

  function cleanRepositoryUrl(url) {
    if (!url) return "";

    const clean = url.trim().replace(/\/+$/, "").replace(/\.git$/, "");
    const match = clean.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)$/i);

    return match ? `https://github.com/${match[1]}/${match[2]}` : "";
  }

  function detectRepositoryUrl() {
    const configured = cleanRepositoryUrl(ADMIN_REPOSITORY_URL);
    if (configured) return configured;

    const host = window.location.hostname.toLowerCase();

    // GitHub Pages project site: USERNAME.github.io/REPOSITORY/
    if (host.endsWith(".github.io")) {
      const owner = host.slice(0, -".github.io".length);
      const parts = window.location.pathname.split("/").filter(Boolean);

      // Project Pages repository
      if (parts.length > 0) {
        return `https://github.com/${owner}/${parts[0]}`;
      }

      // User/organization Pages repository
      return `https://github.com/${owner}/${owner}.github.io`;
    }

    const saved = cleanRepositoryUrl(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (saved) return saved;

    return "";
  }

  function getRepositoryForAdmin() {
    const detected = detectRepositoryUrl();
    if (detected) return detected;

    // Convenient fallback for local testing or a custom domain.
    const entered = window.prompt(
      "ჩასვით თქვენი GitHub Repository-ის URL:\n\nმაგალითი: https://github.com/USERNAME/REPOSITORY\n\nეს მხოლოდ ერთხელ დაგჭირდებათ ამ ბრაუზერში."
    );

    const cleaned = cleanRepositoryUrl(entered);

    if (!cleaned) {
      if (entered !== null) {
        window.alert(
          "Repository-ის მისამართი ვერ ამოვიცანი. გამოიყენეთ ფორმატი:\nhttps://github.com/USERNAME/REPOSITORY"
        );
      }
      return "";
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, cleaned);
    return cleaned;
  }

  function openNewTopicPage() {
    const repository = getRepositoryForAdmin();
    if (!repository) return;

    const target = `${repository}/new/${encodeURIComponent(
      ADMIN_BRANCH
    )}/${ADMIN_CHAPTERS_PATH}`;

    window.open(target, "_blank", "noopener,noreferrer");
  }

  searchInput.addEventListener("input", applySearch);

  resetButton.addEventListener("click", () => {
    searchInput.value = "";
    applySearch();
    searchInput.focus();
  });

  if (addTopicButton) {
    addTopicButton.addEventListener("click", openNewTopicPage);
  }

  window.addEventListener("keydown", (event) => {
    const isSearchShortcut =
      (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";

    if (isSearchShortcut) {
      event.preventDefault();
      searchInput.focus();
      searchInput.select();
    }

    if (event.key === "Escape" && document.activeElement === searchInput) {
      searchInput.value = "";
      applySearch();
      searchInput.blur();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const id = anchor.getAttribute("href");
      const target = document.querySelector(id);

      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  applySearch();
})();
