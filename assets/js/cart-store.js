(() => {
  // Keep the renamed brand's cart key while preserving migration support for older installs.
  const storageKey = "kagalarimart-cart-usd";
  const previousUsdStorageKey = "megamart-cart-usd";
  const legacyStorageKey = "megamart-cart";
  const quantityLimit = 99;
  const legacyPrices = Object.freeze({
    "galaxy-s22-ultra": 350,
    "galaxy-m13": 130,
    "galaxy-m33": 200,
    "galaxy-m53": 300,
    "galaxy-s22-green": 400,
  });

  function parseCart(value, message) {
    try {
      const items = JSON.parse(value);
      if (!Array.isArray(items)) throw new Error(message);
      return items;
    } catch (error) {
      if (error instanceof SyntaxError) throw new Error(message);
      throw error;
    }
  }

  // Migrate saved carts under earlier brand keys so rebranding does not discard cart contents.
  function migrateLegacyCart() {
    const previousUsdCart = localStorage.getItem(previousUsdStorageKey);
    if (previousUsdCart) {
      const oldItems = parseCart(
        previousUsdCart,
        "Your previous saved cart could not be read. Clear the browser's saved KagalariMart cart to continue."
      );
      const migrated = oldItems.filter((item) =>
        item
        && typeof item.id === "string"
        && typeof item.name === "string"
        && Number.isSafeInteger(item.unitPrice)
        && item.unitPrice > 0
        && Number.isInteger(item.quantity)
        && item.quantity > 0
        && item.quantity <= quantityLimit
        && typeof item.image === "string"
        && item.image.startsWith("images/")
      );
      localStorage.setItem(storageKey, JSON.stringify(migrated));
      localStorage.removeItem(previousUsdStorageKey);
      return migrated;
    }

    const previousCart = localStorage.getItem(legacyStorageKey);
    if (!previousCart) return [];

    const oldItems = parseCart(
      previousCart,
      "Your previous saved cart could not be read. Clear the browser's saved KagalariMart cart to continue."
    );
    const migrated = oldItems.map((item) => {
      const id = item?.id === "galaxy-s22-green" ? "galaxy-s22-ultra-green" : item?.id;
      const unitPrice = legacyPrices[item?.id];
      if (
        !unitPrice
        || typeof item.name !== "string"
        || typeof item.image !== "string"
        || !item.image.startsWith("images/")
        || !Number.isInteger(item.quantity)
        || item.quantity < 1
        || item.quantity > quantityLimit
      ) {
        throw new Error("Your previous cart contains an item that cannot be converted to the current USD catalogue. Clear the saved KagalariMart cart and add the item again.");
      }
      return {
        id,
        name: id === "galaxy-s22-ultra-green" ? "Samsung Galaxy S22 Ultra — Green" : item.name,
        unitPrice,
        image: item.image,
        quantity: item.quantity,
      };
    });
    localStorage.setItem(storageKey, JSON.stringify(migrated));
    localStorage.removeItem(legacyStorageKey);
    return migrated;
  }

  function read() {
    const savedCart = localStorage.getItem(storageKey);
    if (!savedCart) return migrateLegacyCart();

    const items = parseCart(savedCart, "Your saved cart has an invalid format. Clear the browser's saved KagalariMart cart to continue.");

    // Discard malformed records before any cart operation uses their values.
    return items.filter((item) =>
      item
      && typeof item.id === "string"
      && typeof item.name === "string"
      && Number.isSafeInteger(item.unitPrice)
      && item.unitPrice > 0
      && Number.isInteger(item.quantity)
      && item.quantity > 0
      && item.quantity <= quantityLimit
      && typeof item.image === "string"
      && item.image.startsWith("images/")
    );
  }

  function write(items) {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }

  function add(product) {
    const items = read();
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity >= quantityLimit) {
        throw new Error(`You can add up to ${quantityLimit} of this item.`);
      }
      existingItem.quantity += 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }

    write(items);
    return items;
  }

  function setQuantity(id, quantity) {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > quantityLimit) {
      throw new Error(`Quantity must be between 1 and ${quantityLimit}.`);
    }

    const items = read();
    const item = items.find((entry) => entry.id === id);
    if (!item) throw new Error("That item is no longer in your cart.");
    item.quantity = quantity;
    write(items);
    return items;
  }

  function remove(id) {
    const items = read().filter((item) => item.id !== id);
    write(items);
    return items;
  }

  function clear() {
    localStorage.removeItem(storageKey);
    localStorage.removeItem(previousUsdStorageKey);
    localStorage.removeItem(legacyStorageKey);
  }

  function count(items = read()) {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  function subtotal(items = read()) {
    return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  window.KagalariMartCart = Object.freeze({
    add,
    clear,
    count,
    formatCurrency,
    read,
    remove,
    setQuantity,
    subtotal,
  });
})();
