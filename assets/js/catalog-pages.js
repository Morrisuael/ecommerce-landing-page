const catalog = window.KagalariMartCatalog;
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

// Build cards from the shared catalog so each listing uses the same content and cart IDs.
function makeCatalogCard(id) {
  const item = catalog.items[id];
  if (!item) throw new Error(`Catalog item "${id}" is missing.`);

  const card = document.createElement("article");
  card.className = "catalog-card";

  const image = document.createElement("div");
  image.className = "catalog-card__image";
  if (item.image) {
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = "";
    img.loading = "lazy";
    img.addEventListener("error", () => img.remove(), { once: true });
    image.append(img);
  } else {
    image.textContent = "Product image coming soon";
  }

  const details = document.createElement("div");
  details.className = "catalog-card__details";
  const eyebrow = document.createElement("p");
  eyebrow.className = "catalog-card__eyebrow";
  eyebrow.textContent = `${item.brand} · ${item.category}`;
  const title = document.createElement("h2");
  title.textContent = item.name;
  const description = document.createElement("p");
  description.className = "catalog-card__description";
  description.textContent = item.description;
  const specificationList = document.createElement("ul");
  specificationList.className = "catalog-card__specs";
  item.specs.slice(0, 3).forEach((specification) => {
    const entry = document.createElement("li");
    entry.textContent = specification;
    specificationList.append(entry);
  });
  const price = document.createElement("p");
  price.className = "catalog-card__price";
  price.textContent = item.price > 0 ? currencyFormatter.format(item.price) : "";
  price.hidden = item.price <= 0;

  const actions = document.createElement("div");
  actions.className = "catalog-card__actions";
  const detailLink = document.createElement("a");
  detailLink.className = "catalog-button catalog-button--secondary";
  if (item.categoryId) {
    detailLink.href = `category-products.html?category=${encodeURIComponent(item.categoryId)}`;
    detailLink.textContent = "Browse category";
  } else {
    detailLink.href = `product-detail.html?id=${encodeURIComponent(id)}`;
    detailLink.dataset.catalogItem = id;
    detailLink.textContent = "Product details";
  }
  actions.append(detailLink);

  if (item.price > 0) {
    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "catalog-button catalog-button--primary";
    addButton.dataset.addCatalogItem = id;
    addButton.textContent = "Add to cart";
    actions.append(addButton);
  }

  details.append(eyebrow, title, description, specificationList, price, actions);
  card.append(image, details);
  return card;
}

function renderListingPage() {
  const page = document.querySelector("[data-catalog-section]");
  if (!page) {
    renderCategoryProductsPage();
    return;
  }
  const section = catalog.sections[page.dataset.catalogSection];
  if (!section) {
    throw new Error(`Unknown catalog section "${page.dataset.catalogSection}".`);
  }

  document.title = `${section.title} | KagalariMart`;
  document.querySelector(".catalog-page-title").textContent = section.title;
  document.querySelector(".catalog-page-intro").textContent = section.intro;
  const grid = document.querySelector(".catalog-grid");
  grid.replaceChildren(...section.itemIds.map(makeCatalogCard));
}

// The category slug is allow-listed by the data map; unknown slugs render a safe empty state.
function renderCategoryProductsPage() {
  const page = document.querySelector("[data-category-products]");
  if (!page) return;

  const categoryId = new URLSearchParams(window.location.search).get("category");
  const category = catalog.categories[categoryId];
  if (!category) {
    document.querySelector(".catalog-page-title").textContent = "Category not found";
    document.querySelector(".catalog-page-intro").textContent = "Choose a category from the KagalariMart home page.";
    return;
  }

  document.title = `${category.title} | KagalariMart`;
  document.querySelector(".catalog-page-title").textContent = category.title;
  document.querySelector(".catalog-page-intro").textContent = category.intro;
  document.querySelector(".catalog-breadcrumb [aria-current='page']").textContent = category.title;
  const grid = document.querySelector(".catalog-grid");
  grid.replaceChildren(...category.itemIds.map(makeCatalogCard));
}

function renderProductDetailPage() {
  const page = document.querySelector("[data-product-detail-page]");
  if (!page) return;
  const itemId = new URLSearchParams(window.location.search).get("id");
  const item = catalog.items[itemId];
  const content = document.querySelector(".product-detail");

  if (!item) {
    document.querySelector(".product-detail-title").textContent = "Product not found";
    content.hidden = true;
    document.querySelector(".product-detail-not-found").hidden = false;
    return;
  }

  // Unavailable product images stay replaced by the existing placeholder instead of a broken icon.
  content.hidden = false;
  document.title = `${item.name} | KagalariMart`;
  document.querySelector(".product-detail-title").textContent = item.name;
  document.querySelector(".product-detail-brand").textContent = `${item.brand} · ${item.category}`;
  document.querySelector(".product-detail-description").textContent = item.description;
  const image = document.querySelector(".product-detail-image");
  if (item.image) {
    image.src = item.image;
    image.alt = item.name;
    image.hidden = false;
    image.addEventListener("error", () => {
      image.hidden = true;
      document.querySelector(".product-detail-image-placeholder").hidden = false;
    }, { once: true });
  } else {
    document.querySelector(".product-detail-image-placeholder").hidden = false;
  }
  const specs = document.querySelector(".product-detail-specs");
  specs.replaceChildren(...item.specs.map((specification) => {
    const entry = document.createElement("li");
    entry.textContent = specification;
    return entry;
  }));

  const price = document.querySelector(".product-detail-price");
  price.textContent = item.price > 0
    ? currencyFormatter.format(item.price)
    : "";
  price.hidden = item.price <= 0;

  const addButton = document.querySelector("[data-detail-add]");
  if (item.price > 0) {
    addButton.hidden = false;
    addButton.dataset.addCatalogItem = itemId;
  }
  const sourceLink = document.querySelector(".product-detail-source");
  if (item.source) {
    sourceLink.href = item.source;
    sourceLink.hidden = false;
  }
}

renderListingPage();
renderProductDetailPage();

const productDialog = document.querySelector(".product-dialog");

function openProductDialog(itemId, returnElement) {
  const item = catalog.items[itemId];
  if (!item || !productDialog) return;

  const image = productDialog.querySelector(".product-dialog__image");
  image.replaceChildren();
  if (item.image) {
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    img.addEventListener("error", () => {
      img.remove();
      image.textContent = "Product image coming soon";
    }, { once: true });
    image.append(img);
  } else {
    image.textContent = "Product image coming soon";
  }

  productDialog.querySelector(".product-dialog__brand").textContent = `${item.brand} · ${item.category}`;
  productDialog.querySelector(".product-dialog__title").textContent = item.name;
  productDialog.querySelector(".product-dialog__description").textContent = item.description;
  productDialog.querySelector(".product-dialog__price").textContent = item.price > 0
    ? currencyFormatter.format(item.price)
    : "";
  productDialog.querySelector(".product-dialog__price").hidden = item.price <= 0;

  const specifications = productDialog.querySelector(".product-dialog__specs");
  specifications.replaceChildren(...item.specs.map((specification) => {
    const entry = document.createElement("li");
    entry.textContent = specification;
    return entry;
  }));

  const source = productDialog.querySelector(".product-dialog__source");
  source.hidden = !item.source;
  if (item.source) source.href = item.source;

  const addButton = productDialog.querySelector("[data-dialog-add]");
  addButton.hidden = item.price <= 0;
  addButton.dataset.addCatalogItem = itemId;
  productDialog.returnElement = returnElement;
  productDialog.showModal();
}

// Larger screens use an in-page dialog; smaller screens follow the product-detail link.
document.addEventListener("click", (event) => {
  const detail = event.target.closest("[data-catalog-item]");
  if (!detail || !productDialog || !window.matchMedia("(min-width: 768px)").matches) return;
  event.preventDefault();
  openProductDialog(detail.dataset.catalogItem, detail);
});

productDialog?.querySelector(".product-dialog__close").addEventListener("click", () => {
  productDialog.close();
});

productDialog?.addEventListener("click", (event) => {
  if (event.target === productDialog) productDialog.close();
});

productDialog?.addEventListener("close", () => {
  productDialog.returnElement?.focus();
  productDialog.returnElement = null;
});

function updateCatalogCartCount() {
  const countElement = document.querySelector(".catalog-cart-count");
  if (!countElement || !window.KagalariMartCart) return;
  try {
    countElement.textContent = String(KagalariMartCart.count());
  } catch (error) {
    // Keep the count visibly invalid and expose the storage error to assistive technology.
    countElement.textContent = "!";
    countElement.setAttribute("aria-label", error.message);
  }
}

// Delegate cart actions so dynamically rendered cards work without individual listeners.
document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add-catalog-item]");
  if (!addButton) return;
  const item = catalog.items[addButton.dataset.addCatalogItem];
  if (!item || item.price <= 0) return;
  try {
    KagalariMartCart.add({
      id: addButton.dataset.addCatalogItem,
      name: item.name,
      unitPrice: item.price,
      image: item.image || "images/mobile.png",
    });
    updateCatalogCartCount();
    const feedback = document.querySelector(".catalog-feedback");
    if (feedback) {
      feedback.textContent = `${item.name} added to your cart.`;
      feedback.hidden = false;
    }
  } catch (error) {
    const feedback = document.querySelector(".catalog-feedback");
    if (!feedback) throw error;
    feedback.textContent = error.message;
    feedback.hidden = false;
  }
});

window.addEventListener("storage", (event) => {
  if (event.key === "kagalarimart-cart-usd" || event.key === "megamart-cart-usd") updateCatalogCartCount();
});

updateCatalogCartCount();
