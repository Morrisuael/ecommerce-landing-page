const cartLines = document.querySelector(".cart-lines");
const cartEmpty = document.querySelector(".cart-empty");
const cartError = document.querySelector(".cart-error");
const clearCartButton = document.querySelector(".clear-cart");
const checkoutLink = document.querySelector(".checkout-link");
const checkoutForm = document.querySelector(".checkout-form");
const checkoutFeedback = document.querySelector(".checkout-feedback");
const placeOrderButton = document.querySelector(".place-order");
const submitLabel = placeOrderButton.textContent;
const countrySelect = document.querySelector("#country");
const regionSelect = document.querySelector("#region");
const regionManual = document.querySelector("#region-manual");
const citySelect = document.querySelector("#city");
const cityManual = document.querySelector("#city-manual");
const locationStatus = document.querySelector("[data-location-status]");
const manualLocationOption = "__manual_location__";
let regionRequestId = 0;
let cityRequestId = 0;
let submitTimer;

// Generate a complete country list locally so the form remains usable if location data is offline.
function populateCountries() {
  const countryCodes = "AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS XK YE YT ZA ZM ZW".split(" ");
  const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
  const options = countryCodes
    .map((code) => ({ code, name: countryNames.of(code) }))
    .filter(({ code, name }) => name && name !== code)
    .sort((a, b) => a.name.localeCompare(b.name));

  countrySelect.replaceChildren(new Option("Select a country", ""));
  options.forEach(({ code, name }) => {
    countrySelect.add(new Option(name, name));
  });
}

function resetLocationSelect(select, placeholder) {
  select.replaceChildren(new Option(placeholder, ""));
  select.disabled = true;
}

function useManualLocation(select, input, placeholder) {
  const label = select.parentElement.querySelector("label");
  select.hidden = true;
  select.disabled = true;
  select.required = false;
  input.hidden = false;
  input.disabled = false;
  input.required = true;
  input.placeholder = placeholder;
  input.value = "";
  label.htmlFor = input.id;
}

function useLocationOptions(select, input, placeholder, entries) {
  const label = select.parentElement.querySelector("label");
  input.hidden = true;
  input.disabled = true;
  input.required = false;
  input.value = "";
  select.hidden = false;
  select.disabled = false;
  select.required = true;
  select.replaceChildren(new Option(placeholder, ""));
  label.htmlFor = select.id;

  entries.forEach((entry) => {
    const name = typeof entry === "string" ? entry : entry.name;
    if (name) select.add(new Option(name, name));
  });

  if (entries.length > 0) {
    select.add(new Option("My location isn't listed — enter it manually", manualLocationOption));
  } else {
    useManualLocation(select, input, placeholder.replace("Select", "Enter"));
  }
}

async function loadLocationOptions(endpoint, data) {
  // Only public location names are sent; customer contact and street-address fields stay local.
  const response = await fetch(`https://countriesnow.space/api/v0.1/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Location service returned HTTP ${response.status}.`);
  }

  const result = await response.json();
  const entries = Array.isArray(result.data) ? result.data : result.data?.states;
  if (result.error || !Array.isArray(entries)) {
    throw new Error(result.msg || "Location data is unavailable for this selection.");
  }
  return entries;
}

async function loadRegions(country) {
  const requestId = ++regionRequestId;
  ++cityRequestId;
  resetLocationSelect(regionSelect, "Loading states and regions…");
  resetLocationSelect(citySelect, "Select a state or region first");
  cityManual.hidden = true;
  cityManual.disabled = true;
  cityManual.required = false;
  regionManual.hidden = true;
  regionManual.disabled = true;
  regionManual.required = false;
  locationStatus.textContent = "Loading states and regions for the selected country…";

  try {
    const regions = await loadLocationOptions("countries/states", { country });
    if (requestId !== regionRequestId || countrySelect.value !== country) return;
    useLocationOptions(regionSelect, regionManual, "Select a state or region", regions);
    if (regions.length > 0) {
      locationStatus.textContent = "Select a state or region to load its cities. Choose the manual option if your location is not listed.";
    } else {
      resetLocationSelect(citySelect, "Enter a state or region first");
      locationStatus.textContent = "No state list is available for this country. Enter your state or region and city below.";
      useManualLocation(regionSelect, regionManual, "Enter your state or region");
      useManualLocation(citySelect, cityManual, "Enter your city or town");
    }
  } catch (error) {
    if (requestId !== regionRequestId || countrySelect.value !== country) return;
    useManualLocation(regionSelect, regionManual, "Enter your state or region");
    useManualLocation(citySelect, cityManual, "Enter your city or town");
    locationStatus.textContent = `Could not load location choices (${error.message}) — enter your state or region and city manually.`;
  }
}

async function loadCities(country, region) {
  const requestId = ++cityRequestId;
  resetLocationSelect(citySelect, "Loading cities…");
  cityManual.hidden = true;
  cityManual.disabled = true;
  cityManual.required = false;
  locationStatus.textContent = "Loading cities for the selected state or region…";

  try {
    const cities = await loadLocationOptions("countries/state/cities", { country, state: region });
    if (requestId !== cityRequestId || countrySelect.value !== country) return;
    useLocationOptions(citySelect, cityManual, "Select a city or town", cities);
    locationStatus.textContent = cities.length > 0
      ? "Select your city or town, or choose the manual option if it is not listed."
      : "No city list is available for this region. Enter your city or town manually.";
  } catch (error) {
    if (requestId !== cityRequestId || countrySelect.value !== country) return;
    useManualLocation(citySelect, cityManual, "Enter your city or town");
    locationStatus.textContent = `Could not load city choices (${error.message}) — enter your city or town manually.`;
  }
}

countrySelect.addEventListener("change", () => {
  if (countrySelect.value) {
    loadRegions(countrySelect.value);
  } else {
    ++regionRequestId;
    ++cityRequestId;
    resetLocationSelect(regionSelect, "Select a country first");
    resetLocationSelect(citySelect, "Select a state or region first");
    locationStatus.textContent = "Choose a country to load available states and cities.";
  }
});

regionSelect.addEventListener("change", () => {
  const region = regionSelect.value;
  if (region === manualLocationOption) {
    useManualLocation(regionSelect, regionManual, "Enter your state or region");
    resetLocationSelect(citySelect, "Enter a state or region first");
    useManualLocation(citySelect, cityManual, "Enter your city or town");
    locationStatus.textContent = "Enter your state or region and city manually.";
  } else if (region) {
    loadCities(countrySelect.value, region);
  } else {
    resetLocationSelect(citySelect, "Select a state or region first");
  }
});

regionManual.addEventListener("change", () => {
  const region = regionManual.value.trim();
  if (region && countrySelect.value) loadCities(countrySelect.value, region);
});

citySelect.addEventListener("change", () => {
  if (citySelect.value === manualLocationOption) {
    useManualLocation(citySelect, cityManual, "Enter your city or town");
    locationStatus.textContent = "Enter your city or town manually.";
  }
});

populateCountries();

// Construct cart rows with DOM APIs so product data is rendered as text, not markup.
function createCartLine(item) {
  const line = document.createElement("article");
  line.className = "cart-line";

  const image = document.createElement("img");
  image.className = "cart-line__image";
  image.src = item.image;
  image.alt = "";
  image.loading = "lazy";
  image.addEventListener("error", () => {
    image.classList.add("cart-line__image--unavailable");
    image.removeAttribute("src");
  }, { once: true });

  const details = document.createElement("div");
  details.className = "cart-line__details";

  const name = document.createElement("h3");
  name.textContent = item.name;
  const unitPrice = document.createElement("p");
  unitPrice.className = "cart-line__unit-price";
  unitPrice.textContent = `${KagalariMartCart.formatCurrency(item.unitPrice)} each`;

  const actions = document.createElement("div");
  actions.className = "cart-line__actions";
  actions.setAttribute("aria-label", `Quantity for ${item.name}`);
  actions.append(
    createActionButton("decrease", item.id, `Decrease ${item.name} quantity`, "−"),
    createQuantity(item.quantity, item.name),
    createActionButton("increase", item.id, `Increase ${item.name} quantity`, "+"),
    createActionButton("remove", item.id, `Remove ${item.name} from cart`, "Remove")
  );

  const lineTotal = document.createElement("strong");
  lineTotal.className = "cart-line__total";
  lineTotal.textContent = KagalariMartCart.formatCurrency(item.unitPrice * item.quantity);

  details.append(name, unitPrice, actions);
  line.append(image, details, lineTotal);
  return line;
}

function createActionButton(action, id, label, text) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = action === "remove" ? "cart-line__remove" : "quantity-button";
  button.dataset.action = action;
  button.dataset.id = id;
  button.setAttribute("aria-label", label);
  button.textContent = text;
  return button;
}

function createQuantity(quantity, name) {
  const output = document.createElement("span");
  output.className = "quantity-value";
  output.setAttribute("aria-label", `Quantity: ${quantity}`);
  output.textContent = String(quantity);
  output.dataset.productName = name;
  return output;
}

function renderCart() {
  try {
    const items = KagalariMartCart.read();
    const count = KagalariMartCart.count(items);
    const subtotal = KagalariMartCart.subtotal(items);

    cartLines.replaceChildren(...items.map(createCartLine));
    cartLines.hidden = items.length === 0;
    cartEmpty.hidden = items.length > 0;
    clearCartButton.hidden = items.length === 0;
    checkoutLink.setAttribute("aria-disabled", String(items.length === 0));
    checkoutLink.classList.toggle("is-disabled", items.length === 0);
    checkoutLink.tabIndex = items.length === 0 ? -1 : 0;
    placeOrderButton.disabled = items.length === 0;
    document.querySelector(".checkout-cart-count").textContent = String(count);
    document.querySelector(".summary-subtotal").textContent = KagalariMartCart.formatCurrency(subtotal);
    document.querySelector(".summary-total__amount").textContent = KagalariMartCart.formatCurrency(subtotal);
    cartError.hidden = true;
    cartError.textContent = "";
  } catch (error) {
    // Disable checkout when saved cart data is unreadable; never present stale totals as valid.
    cartLines.replaceChildren();
    cartLines.hidden = true;
    cartEmpty.hidden = true;
    clearCartButton.hidden = true;
    checkoutLink.setAttribute("aria-disabled", "true");
    checkoutLink.classList.add("is-disabled");
    checkoutLink.tabIndex = -1;
    placeOrderButton.disabled = true;
    cartError.textContent = error.message;
    cartError.hidden = false;
  }
}

// One delegated handler covers quantity and remove buttons for every rendered cart row.
cartLines.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  try {
    if (button.dataset.action === "remove") {
      KagalariMartCart.remove(button.dataset.id);
    } else {
      const items = KagalariMartCart.read();
      const item = items.find((entry) => entry.id === button.dataset.id);
      if (!item) throw new Error("That item is no longer in your cart.");
      const nextQuantity = item.quantity + (button.dataset.action === "increase" ? 1 : -1);
      if (nextQuantity < 1) {
        KagalariMartCart.remove(button.dataset.id);
      } else {
        KagalariMartCart.setQuantity(button.dataset.id, nextQuantity);
      }
    }
    renderCart();
  } catch (error) {
    cartError.textContent = error.message;
    cartError.hidden = false;
  }
});

clearCartButton.addEventListener("click", () => {
  try {
    KagalariMartCart.clear();
    checkoutFeedback.hidden = true;
    renderCart();
  } catch (error) {
    cartError.textContent = error.message;
    cartError.hidden = false;
  }
});

checkoutLink.addEventListener("click", (event) => {
  if (checkoutLink.getAttribute("aria-disabled") === "true") {
    event.preventDefault();
    cartEmpty.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  try {
    if (KagalariMartCart.read().length === 0) {
      event.preventDefault();
      renderCart();
    }
  } catch (error) {
    event.preventDefault();
    renderCart();
  }
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  checkoutFeedback.hidden = true;

  let items;
  try {
    items = KagalariMartCart.read();
  } catch (error) {
    checkoutFeedback.textContent = error.message;
    checkoutFeedback.hidden = false;
    renderCart();
    return;
  }

  if (items.length === 0) {
    renderCart();
    checkoutFeedback.textContent = "Add an item to your cart before continuing.";
    checkoutFeedback.hidden = false;
    return;
  }

  if (!checkoutForm.reportValidity()) return;

  // Validate the address details while order submission is unavailable.
  placeOrderButton.disabled = true;
  placeOrderButton.textContent = "Checking details…";
  checkoutFeedback.textContent = "Validating your delivery details…";
  checkoutFeedback.hidden = false;
  window.clearTimeout(submitTimer);
  submitTimer = window.setTimeout(() => {
    placeOrderButton.disabled = false;
    placeOrderButton.textContent = submitLabel;
    checkoutFeedback.textContent = "Your delivery details are valid, but your order could not be submitted. Please contact customer service. Your cart has been kept.";
  }, 700);
});

// Keep this tab's cart display current when another tab edits local storage.
window.addEventListener("storage", (event) => {
  if (event.key === "kagalarimart-cart-usd" || event.key === "megamart-cart-usd") renderCart();
});

renderCart();
