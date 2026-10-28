// Crop transparent margins from hero art while leaving source image files untouched.
function cropTransparentPadding(image) {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.drawImage(image, 0, 0);

  // Find the visible alpha bounds so transparent margins do not shrink hero artwork.
  const { data } = context.getImageData(0, 0, canvas.width, canvas.height);
  let left = canvas.width;
  let top = canvas.height;
  let right = -1;
  let bottom = -1;

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      if (data[(y * canvas.width + x) * 4 + 3] > 8) {
        left = Math.min(left, x);
        top = Math.min(top, y);
        right = Math.max(right, x);
        bottom = Math.max(bottom, y);
      }
    }
  }

  if (right < left || bottom < top) return image.src;

  const padding = 2;
  left = Math.max(0, left - padding);
  top = Math.max(0, top - padding);
  right = Math.min(canvas.width - 1, right + padding);
  bottom = Math.min(canvas.height - 1, bottom + padding);

  const croppedCanvas = document.createElement("canvas");
  croppedCanvas.width = right - left + 1;
  croppedCanvas.height = bottom - top + 1;
  croppedCanvas.getContext("2d").drawImage(
    image,
    left,
    top,
    croppedCanvas.width,
    croppedCanvas.height,
    0,
    0,
    croppedCanvas.width,
    croppedCanvas.height,
  );
  return croppedCanvas.toDataURL("image/png");
}

const imageSlots = document.querySelectorAll(".image-slot[data-src]");

imageSlots.forEach((slot) => {
  if (slot.dataset.imageReady !== "true") return;
  const requestedSource = slot.dataset.src;
  const image = new Image();
  image.onload = () => {
    // Ignore late loads if the carousel has already requested a different slide image.
    if (slot.dataset.src !== requestedSource) return;
    const source = slot.classList.contains("hero__image") ? cropTransparentPadding(image) : image.src;
    slot.style.backgroundImage = `url("${source}")`;
    slot.classList.add("has-image");
    const label = slot.querySelector(".image-slot__label");
    if (label) label.hidden = true;
  };
  image.src = slot.dataset.src;
});

const searchForm = document.querySelector(".search");
const searchInput = document.querySelector("#site-search");
const products = [...document.querySelectorAll(".product-card")];
const emptySearch = document.querySelector(".empty-search");

// Filter only the home-page phone cards and expose an empty state when none match.
function filterProducts() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  products.forEach((product) => {
    const matches = !query || `${product.dataset.search} ${product.textContent}`.toLowerCase().includes(query);
    product.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  emptySearch.hidden = visibleCount > 0;
}

searchInput.addEventListener("input", filterProducts);
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  filterProducts();
  document.querySelector("#phones").scrollIntoView({ behavior: "smooth", block: "start" });
});

const heroSlides = [
  { eyebrow: "Best Deal Online on smart watches", title: "SMART WEARABLE.", offer: "UP to 80% OFF", image: "images/smart-watch-hero.webp.png", href: "category-products.html?category=watches" },
  { eyebrow: "Big savings on the latest phones", title: "SMARTPHONES.", offer: "UP to 56% OFF", image: "images/phone%20image%201.png", href: "smartphones.html" },
  { eyebrow: "Fresh picks for every day", title: "DAILY ESSENTIALS.", offer: "UP to 50% OFF", image: "images/daily%20essentials.png", href: "daily-essentials.html" },
  { eyebrow: "Make every room feel like home", title: "HOME & KITCHEN.", offer: "Explore today's deals", image: "images/furniture.png", href: "category-products.html?category=furniture" },
  { eyebrow: "Find something you'll love", title: "TOP CATEGORIES.", offer: "Shop the latest offers", image: "images/accessories.png", href: "top-categories.html" },
  { eyebrow: "Everyday favourites, better prices", title: "GREAT VALUE.", offer: "Deals across KagalariMart", image: "images/vegetables.png", href: "#essentials" },
  { eyebrow: "Discover the brands you love", title: "BRAND OFFERS.", offer: "UP to 80% OFF", image: "images/phone%20image%202.png", href: "electronics-brands.html" },
];

const hero = document.querySelector(".hero");
const heroDots = [...document.querySelectorAll(".hero-dot")];
const heroDestination = hero.querySelector(".hero__destination");
let currentSlide = 0;
let transitionTimer;
let touchArrowTimer;
let keyboardNavigation = false;
let mouseOverHero = false;

function setHeroArrowVisibility(visible) {
  hero.classList.toggle("is-arrow-visible", visible);
}

hero.addEventListener("pointerenter", (event) => {
  if (event.pointerType !== "mouse") return;
  mouseOverHero = true;
  setHeroArrowVisibility(true);
  stopAutoSlide();
});
hero.addEventListener("pointerleave", (event) => {
  if (event.pointerType !== "mouse") return;
  mouseOverHero = false;
  setHeroArrowVisibility(false);
  startAutoSlide();
});
hero.addEventListener("pointerdown", (event) => {
  keyboardNavigation = false;
  if (event.pointerType !== "touch") return;
  setHeroArrowVisibility(true);
  window.clearTimeout(touchArrowTimer);
});
hero.addEventListener("pointerup", (event) => {
  if (event.pointerType !== "touch") return;
  window.clearTimeout(touchArrowTimer);
  touchArrowTimer = window.setTimeout(() => setHeroArrowVisibility(false), 2500);
});
hero.addEventListener("pointercancel", (event) => {
  if (event.pointerType !== "touch") return;
  window.clearTimeout(touchArrowTimer);
  touchArrowTimer = window.setTimeout(() => setHeroArrowVisibility(false), 2500);
});
hero.addEventListener("focusin", () => {
  if (keyboardNavigation) setHeroArrowVisibility(true);
});
hero.addEventListener("focusout", (event) => {
  if (!hero.contains(event.relatedTarget)) {
    keyboardNavigation = false;
    setHeroArrowVisibility(false);
    startAutoSlide();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Tab" || event.key.startsWith("Arrow")) keyboardNavigation = true;
});

function showHeroSlide(index) {
  const nextSlide = (index + heroSlides.length) % heroSlides.length;
  if (nextSlide === currentSlide) return;

  currentSlide = nextSlide;
  window.clearTimeout(transitionTimer);
  hero.classList.remove("is-transitioning-in");
  hero.classList.add("is-transitioning-out");

  // Match this delay to the CSS fade so text and image swap between transition phases.
  transitionTimer = window.setTimeout(() => {
    const slide = heroSlides[currentSlide];
    hero.querySelector(".hero__eyebrow").textContent = slide.eyebrow;
    hero.querySelector("h1").textContent = slide.title;
    hero.querySelector(".hero__offer").textContent = slide.offer;
    heroDestination.href = slide.href;
    heroDestination.setAttribute("aria-label", `View ${slide.title.toLowerCase()} offer`);
    const image = hero.querySelector(".hero__image");
    image.dataset.src = slide.image;
    image.setAttribute("aria-label", `${slide.title} offer image`);
    const imageLabel = image.querySelector(".image-slot__label");
    imageLabel.hidden = false;
    imageLabel.innerHTML = `Add hero image<br><small>${decodeURIComponent(slide.image.split("/").pop())}</small>`;
    if (image.dataset.imageReady === "true") {
      image.style.backgroundImage = "";
      image.classList.remove("has-image");
      const imageRequest = new Image();
      imageRequest.onload = () => {
        if (image.dataset.src === slide.image) {
          image.style.backgroundImage = `url("${cropTransparentPadding(imageRequest)}")`;
          image.classList.add("has-image");
          imageLabel.hidden = true;
        }
      };
      imageRequest.src = slide.image;
    }
    heroDots.forEach((dot, dotIndex) => {
      const active = dotIndex === currentSlide;
      dot.classList.toggle("is-active", active);
      if (active) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
    hero.classList.replace("is-transitioning-out", "is-transitioning-in");
    requestAnimationFrame(() => hero.classList.remove("is-transitioning-in"));
  }, 220);
}

function selectHeroSlide(index) {
  showHeroSlide(index);
  // Restart the full interval after manual selection; hover and keyboard pauses still apply.
  startAutoSlide();
}

hero.querySelector(".hero-arrow--previous").addEventListener("click", () => selectHeroSlide(currentSlide - 1));
hero.querySelector(".hero-arrow--next").addEventListener("click", () => selectHeroSlide(currentSlide + 1));
heroDots.forEach((dot, index) => dot.addEventListener("click", () => selectHeroSlide(index)));

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
// Preserve the original three-second autoplay interval.
const slideInterval = 3000;
let slideTimer;

function stopAutoSlide() {
  window.clearInterval(slideTimer);
  slideTimer = undefined;
}

function startAutoSlide() {
  stopAutoSlide();
  // Pause for reduced-motion preferences, hidden tabs, pointer hover, or keyboard focus.
  if (
    reducedMotion.matches
    || document.hidden
    || mouseOverHero
    || (keyboardNavigation && hero.contains(document.activeElement))
  ) return;
  slideTimer = window.setInterval(() => showHeroSlide(currentSlide + 1), slideInterval);
}

hero.addEventListener("focusin", () => {
  if (keyboardNavigation) stopAutoSlide();
});
document.addEventListener("visibilitychange", startAutoSlide);
reducedMotion.addEventListener("change", startAutoSlide);
startAutoSlide();

const cartCount = document.querySelector(".cart-count");
const toast = document.querySelector(".toast");
let toastTimer;

function updateCartCount() {
  try {
    const cartItems = KagalariMartCart.read();
    const count = KagalariMartCart.count(cartItems);
    cartCount.textContent = String(count);
    cartCount.classList.toggle("has-items", count > 0);
    document.querySelector(".cart-button").setAttribute(
      "aria-label",
      `Shopping cart, ${count} ${count === 1 ? "item" : "items"}`
    );
  } catch (error) {
    cartCount.textContent = "!";
    cartCount.classList.add("has-items");
    showToast(error.message);
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

document.querySelectorAll(".quick-add").forEach((button) => {
  button.addEventListener("click", () => {
    const productCard = button.closest(".product-card");
    const price = Number(productCard.dataset.price);
    const product = {
      id: productCard.dataset.productId,
      name: productCard.querySelector("h3").textContent.trim(),
      unitPrice: price,
      image: productCard.dataset.image,
    };

    try {
      KagalariMartCart.add(product);
      updateCartCount();
      showToast(`${product.name} added to your cart.`);
    } catch (error) {
      showToast(error.message);
    }
  });
});

window.addEventListener("storage", (event) => {
  if (event.key === "kagalarimart-cart-usd" || event.key === "megamart-cart-usd") updateCartCount();
});

const menuToggle = document.querySelector(".menu-toggle");
const categoryNav = document.querySelector(".category-nav");
// Keep the menu's accessible expanded state synchronized with its visual state.
menuToggle.addEventListener("click", () => {
  const isOpen = categoryNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

updateCartCount();
