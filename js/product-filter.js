export function initProductFilter() {
  const tabs = document.querySelectorAll(".filter-tab");
  const cards = document.querySelectorAll(".product-card");
  const emptyMsg = document.getElementById("collection-empty");

  if (!tabs.length || !cards.length) return;

  function filterCategory(category) {
    let visibleCount = 0;

    tabs.forEach((tab) => {
      const isActive = tab.dataset.filter === category;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
    });

    cards.forEach((card) => {
      const match = category === "all" || card.dataset.category === category;
      card.classList.toggle("is-hidden", !match);
      if (match) visibleCount++;
    });

    if (emptyMsg) {
      emptyMsg.hidden = visibleCount > 0;
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => filterCategory(tab.dataset.filter));
  });
}
