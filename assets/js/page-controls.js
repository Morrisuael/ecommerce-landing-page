// Adds shared navigation controls to every storefront page.
(() => {
  const isHomePage = /(?:^|\/)index\.html$/.test(window.location.pathname)
    || window.location.pathname.endsWith("/");

  function createArrowIcon(direction) {
    const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    icon.setAttribute("viewBox", "0 0 24 24");
    icon.setAttribute("aria-hidden", "true");
    icon.classList.add("page-control__icon");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      direction === "left" ? "m15 18-6-6 6-6" : "M12 19V5m-7 7 7-7 7 7",
    );
    icon.append(path);

    return icon;
  }

  if (!isHomePage) {
    const wordmark = document.querySelector(".checkout-header .wordmark, .catalog-header .wordmark");
    const backButton = document.createElement("button");
    backButton.className = "page-control page-control--back";
    backButton.type = "button";
    backButton.setAttribute("aria-label", "Go back to the previous page");
    backButton.title = "Go back";
    backButton.append(createArrowIcon("left"));
    backButton.addEventListener("click", () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.assign("index.html");
      }
    });

    if (wordmark) {
      const brandGroup = document.createElement("div");
      brandGroup.className = "page-header-brand-group";
      wordmark.before(brandGroup);
      brandGroup.append(backButton, wordmark);
    }
  }

  if (isHomePage) {
    const topButton = document.createElement("button");
    topButton.className = "page-control page-control--top";
    topButton.type = "button";
    topButton.setAttribute("aria-label", "Scroll back to top");
    topButton.title = "Back to top";
    topButton.append(createArrowIcon("up"));
    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.body.append(topButton);

    const updateTopButton = () => {
      topButton.classList.toggle("is-visible", window.scrollY > 320);
    };

    window.addEventListener("scroll", updateTopButton, { passive: true });
    updateTopButton();
  }

})();
