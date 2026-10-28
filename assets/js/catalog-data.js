(() => {
  // Manufacturer and reference links support product facts; catalog prices are maintained in USD.
  const sources = {
    samsungM33: "https://news.samsung.com/in/samsung-launches-galaxy-m33-5g-in-india-an-all-rounder-device-that-is-up-for-mz-passion-points",
    samsungM53: "https://news.samsung.com/in/samsung-launches-galaxy-m53-5g-with-segment-best-108-mp-quad-camera-segment-only-auto-data-switching-segment-leading-samoled-display-in-india",
    samsungS22: "https://news.samsung.com/us/samsung-galaxy-s22-ultra-offers-ultimate-most-premium-s-series-experience-yet",
    appleIphone: "https://www.apple.com/iphone-15/specs/",
    appleCompare: "https://www.apple.com/iphone-13-pro/specs/",
    xiaomi12Pro: "https://www.mi.com/global/product/xiaomi-12-pro/specs/",
    realmeGT2: "https://www.realme.com/in/realme-gt-2-pro/specs",
    redmiNote11: "https://www.mi.com/global/product/redmi-note-11/specs/",
    realme9i: "https://www.realme.com/in/realme-9i",
    realme9Pro: "https://www.realme.com/in/realme-9-pro",
    samsungA53: "https://www.samsung.com/in/smartphones/galaxy-a/galaxy-a53-5g-awesome-black-128gb-sm-a536ezkginu/",
    realme9ProPlus: "https://www.realme.com/in/realme-9-pro-plus",
    xiaomi11i: "https://www.mi.com/in/product/xiaomi-11i-hypercharge-5g/",
    iphone16: "https://support.apple.com/en-us/121029",
    iphone16Plus: "https://support.apple.com/en-us/121030",
    iphone16Pro: "https://support.apple.com/en-us/121031",
    realme14: "https://www.realme.com/global/realme-14-5g/specs",
    realme14Pro: "https://www.realme.com/global/realme-14-pro-5g/specs",
    realme14ProPlus: "https://www.realme.com/global/realme-14-pro-plus-5g/specs",
    xiaomi15: "https://www.mi.com/global/product/xiaomi-15/specs/",
    xiaomi15Ultra: "https://www.mi.com/global/product/xiaomi-15-ultra/specs/",
    xiaomi15T: "https://www.mi.com/global/product/xiaomi-15t/specs/",
    xiaomi15TPro: "https://www.mi.com/global/product/xiaomi-15t-pro/specs/",
    ceraveCream: "https://www.cerave.com/skincare/moisturizers/moisturizing-cream",
    laRocheSunscreen: "https://www.laroche-posay.us/our-products/sun/face-sunscreen/anthelios-mineral-tinted-sunscreen-for-face-spf-50-3337875795931.html",
    macbookAir: "https://support.apple.com/en-us/122209",
    ipadAir: "https://www.apple.com/newsroom/2025/03/apple-introduces-ipad-air-with-m3-and-new-magic-keyboard/",
    ikeaBilly: "https://www.ikea.com/us/en/cat/billy-bookcases-58288/",
    ikeaKallax: "https://www.ikea.com/us/en/cat/kallax-shelving-units-58285/",
    garmin965: "https://www.garmin.com/en-US/p/886725/",
    ikeaFadoUS: "https://www.ikea.com/us/en/p/fado-table-lamp-white-70096377/",
    ikeaMosslanda: "https://www.ikea.com/us/en/p/mosslanda-picture-ledge-white-90292103/",
    logitechMxMaster3s: "https://www.logitech.com/en-us/products/mice/mx-master-3s.910-006556.html",
    jblGo4: "https://www.jbl.com/bluetooth-speakers/GO-4.html",
    realmeGT6: "https://www.realme.com/in/realme-gt-6/specs",
    xiaomi14: "https://www.mi.com/in/product/xiaomi-14/specs/",
    redmiNote13Pro: "https://www.mi.com/in/product/redmi-note-13-pro-plus-5g/specs/",
    lakme: "https://www.lakmeindia.com/products/9-to-5-primer-matte-lip-color",
    sony: "https://www.sony.co.in/electronics/headband-headphones/wh-1000xm5",
    ikeaPoang: "https://www.ikea.com/in/en/search/?q=PO%C3%84NG%20armchair",
    casio: "https://www.casio.com/in/watches/gshock/product.GA-2100-1A/",
    ikeaFado: "https://www.ikea.com/in/en/search/?q=FADO%20table%20lamp",
    samsungCharger: "https://www.samsung.com/in/search/?searchvalue=25W%20Power%20Adapter",
    staples: "https://www.tatasampann.com/",
    atta: "https://www.aashirvaad.com/",
    fortune: "https://www.fortunefoods.com/",
    varieties: "https://www.iihr.res.in/varieties",
    fssai: "https://www.fssai.gov.in/cms/food-safety-and-standards-regulations.php",
    cdsco: "https://cdsco.gov.in/opencms/opencms/en/Cosmetics/cosmetics/"
  };

  // Records share IDs across home cards, listings, details, and cart; image may be empty until supplied.
  // Shared catalog records supply product details to home cards, listings, details, and cart.
  const items = {
    "galaxy-s22-ultra": {
      name: "Samsung Galaxy S22 Ultra",
      brand: "Samsung",
      category: "Smartphone",
      price: 350,
      image: "images/galaxy-s22-ultra.webp.png",
      description: "2022-generation Android flagship featuring an integrated S Pen, a large high-resolution display and a multi-camera system. Confirm the exact model code, storage, condition and regional specification before purchase.",
      specs: ["Integrated S Pen", "Flagship Galaxy S-series model (2022)", "Storage and regional model vary by configuration"],
      source: sources.samsungS22
    },
    "galaxy-s22-ultra-green": {
      name: "Samsung Galaxy S22 Ultra — Green",
      brand: "Samsung",
      category: "Smartphone",
      price: 400,
      image: "images/galaxy-s22-green.webp.png",
      description: "Green-color Galaxy S22 Ultra. Color does not establish its storage, condition or regional configuration; confirm those details with the seller.",
      specs: ["Integrated S Pen", "Green finish", "Confirm storage, model code, condition and warranty"],
      source: sources.samsungS22
    },
    "galaxy-m13": {
      name: "Samsung Galaxy M13 (4GB / 64GB listing)",
      brand: "Samsung",
      category: "Smartphone",
      price: 130,
      image: "images/galaxy-m13.webp.png",
      description: "Budget Galaxy M-series listing. The M13 name alone does not confirm whether a particular unit is LTE or another regional variant, so verify its full model number before relying on network or component specifications.",
      specs: ["Listed configuration: 4GB RAM / 64GB storage", "Confirm network generation", "Check model code and regional specification"],
      source: ""
    },
    "galaxy-m33": {
      name: "Samsung Galaxy M33 5G",
      brand: "Samsung",
      category: "Smartphone",
      price: 200,
      image: "images/galaxy-m33.webp.png",
      description: "Samsung's India launch information describes the M33 5G with a 6.6-inch FHD+ 120Hz display, Exynos processor, 50MP main camera and 6000mAh battery. The published launch configurations were 6GB/128GB and 8GB/128GB; verify any 4GB/64GB listing's identity.",
      specs: ["6.6-inch FHD+ 120Hz display (manufacturer launch material)", "Exynos processor; 50MP main camera", "6000mAh battery", "Published India launch configurations: 6GB/128GB and 8GB/128GB"],
      source: sources.samsungM33
    },
    "galaxy-m53": {
      name: "Samsung Galaxy M53 5G",
      brand: "Samsung",
      category: "Smartphone",
      price: 300,
      image: "images/galaxy-m53.webp.png",
      description: "Samsung's India launch information describes the M53 5G with a 6.7-inch FHD+ 120Hz Super AMOLED+ display, MediaTek Dimensity 900, 108MP main camera and 5000mAh battery. Published launch configurations were 6GB/128GB and 8GB/128GB; verify any 4GB/64GB listing.",
      specs: ["6.7-inch FHD+ 120Hz Super AMOLED+ display", "MediaTek Dimensity 900; 108MP main camera", "5000mAh battery; 25W charging support", "Published India launch configurations: 6GB/128GB and 8GB/128GB"],
      source: sources.samsungM53
    },
    "iphone-13-pro-max": {
      name: "Apple iPhone 13 Pro Max",
      brand: "Apple",
      category: "Smartphone",
      price: 450,
      image: "",
      description: "Premium iOS comparison from the same broad generation as the Galaxy S22 Ultra. Apple lists a 6.7-inch Super Retina XDR display with ProMotion and a Pro camera system. It does not include the S22 Ultra's integrated S Pen.",
      specs: ["6.7-inch Super Retina XDR display with ProMotion", "Pro camera system", "iOS; no integrated stylus"],
      source: sources.appleCompare
    },
    "xiaomi-12-pro": {
      name: "Xiaomi 12 Pro",
      brand: "Xiaomi",
      category: "Smartphone",
      price: 350,
      image: "",
      description: "2022-era flagship Android comparison with a 6.73-inch WQHD+ AMOLED display, adaptive 120Hz refresh and three 50MP rear cameras, according to Xiaomi's specifications.",
      specs: ["6.73-inch WQHD+ AMOLED, adaptive 120Hz", "Triple 50MP rear camera system", "Compare regional software, service and warranty"],
      source: sources.xiaomi12Pro
    },
    "realme-gt-2-pro": {
      name: "realme GT 2 Pro",
      brand: "realme",
      category: "Smartphone",
      price: 300,
      image: "",
      description: "2022 flagship-class Android alternative with a 2K 120Hz AMOLED display and Snapdragon 8 Gen 1. Camera features and software support differ from the Galaxy S22 Ultra.",
      specs: ["2K AMOLED display with 120Hz refresh", "Snapdragon 8 Gen 1 platform", "Check local variant and current software support"],
      source: sources.realmeGT2
    },
    "redmi-note-11": {
      name: "Redmi Note 11",
      brand: "Xiaomi / Redmi",
      category: "Smartphone",
      price: 150,
      image: "",
      description: "Budget comparison model with a 6.43-inch FHD+ AMOLED display, 90Hz refresh and Snapdragon 680 4G platform. This model is 4G; do not confuse it with similarly named 5G models.",
      specs: ["6.43-inch FHD+ AMOLED, 90Hz", "Snapdragon 680 4G platform", "Confirm model suffix and network compatibility"],
      source: sources.redmiNote11
    },
    "realme-9i": {
      name: "realme 9i",
      brand: "realme",
      category: "Smartphone",
      price: 140,
      image: "",
      description: "Budget Android comparison using Snapdragon 680 4G, a 90Hz LCD and a 5000mAh battery. Compare its LCD panel with AMOLED alternatives before choosing.",
      specs: ["Snapdragon 680 4G platform", "90Hz LCD", "5000mAh battery"],
      source: sources.realme9i
    },
    "realme-9-pro": {
      name: "realme 9 Pro",
      brand: "realme",
      category: "Smartphone",
      price: 190,
      image: "",
      description: "Mid-range 5G comparison featuring Snapdragon 695 and a 120Hz LCD. A practical contrast to AMOLED-equipped models in a similar family.",
      specs: ["Snapdragon 695 5G platform", "120Hz LCD", "Verify region-specific memory configuration"],
      source: sources.realme9Pro
    },
    "galaxy-a53": {
      name: "Samsung Galaxy A53 5G",
      brand: "Samsung",
      category: "Smartphone",
      price: 250,
      image: "",
      description: "Samsung mid-range 5G alternative with a Super AMOLED 120Hz display. Confirm exact memory, camera features and software-support status for the unit being sold.",
      specs: ["Super AMOLED display with 120Hz refresh", "5G model family", "Check exact model code, storage and support status"],
      source: sources.samsungA53
    },
    "realme-9-pro-plus": {
      name: "realme 9 Pro+",
      brand: "realme",
      category: "Smartphone",
      price: 220,
      image: "",
      description: "Mid-range comparison with a 90Hz AMOLED display, Dimensity 920 and a 50MP main camera with optical image stabilization, based on the India product information.",
      specs: ["90Hz AMOLED display", "MediaTek Dimensity 920", "50MP main camera with OIS"],
      source: sources.realme9ProPlus
    },
    "xiaomi-11i-hypercharge": {
      name: "Xiaomi 11i HyperCharge 5G",
      brand: "Xiaomi",
      category: "Smartphone",
      price: 220,
      image: "",
      description: "2022-era mid-range comparison with a 120Hz AMOLED display, Dimensity 920 and 120W wired charging. Check battery condition and charger inclusion on old-stock or used units.",
      specs: ["120Hz AMOLED display", "MediaTek Dimensity 920", "120W wired charging capability; verify charger inclusion"],
      source: sources.xiaomi11i
    },
    "iphone-15": {
      name: "Apple iPhone 15",
      brand: "Apple",
      category: "Smartphone",
      price: 600,
      image: "",
      description: "Apple smartphone with a 6.1-inch Super Retina XDR OLED display, A16 Bionic chip and 48MP main camera. Storage options and availability vary by seller and market.",
      specs: ["6.1-inch Super Retina XDR OLED", "A16 Bionic chip", "48MP main camera"],
      source: sources.appleIphone
    },
    "realme-gt-6": {
      name: "realme GT 6",
      brand: "realme",
      category: "Smartphone",
      price: 500,
      image: "",
      description: "Performance-oriented realme GT-series smartphone. Specifications and configurations vary by regional model.",
      specs: ["GT performance-series phone", "Specifications and variants depend on market", "Verify local warranty and seller"],
      source: sources.realmeGT6
    },
    "xiaomi-14": {
      name: "Xiaomi 14",
      brand: "Xiaomi",
      category: "Smartphone",
      price: 700,
      image: "",
      description: "Compact flagship in Xiaomi's 14 series with Leica-branded camera positioning. Verify the precise region-specific model and included accessories.",
      specs: ["Compact flagship model family", "Leica-branded camera collaboration", "Confirm regional SKU and warranty"],
      source: sources.xiaomi14
    },
    "redmi-note-13-pro-plus": {
      name: "Redmi Note 13 Pro+ 5G",
      brand: "Xiaomi / Redmi",
      category: "Smartphone",
      price: 350,
      image: "",
      description: "Mid-range Redmi smartphone. The India product page advertises a 200MP main camera and 120W charging; confirm exact market variant, charger inclusion and warranty.",
      specs: ["200MP main camera (India model information)", "120W charging capability (India model information)", "Verify regional variant and charger inclusion"],
      source: sources.redmiNote13Pro
    },
    "category-mobile": {
      name: "Mobile phones",
      brand: "Mobile",
      category: "Top category",
      price: 0,
      categoryId: "mobile",
      image: "images/mobile.png",
      description: "Explore phones by use case, budget, operating system and network. Compare complete model codes and exact storage variants rather than relying on a model-family name alone.",
      specs: ["Compare network bands and 4G/5G support", "Check storage, battery condition and included accessories", "Confirm seller, warranty, returns and update support"],
      source: ""
    },
    "lakme-lip-color": {
      name: "Lakmé 9to5 Primer + Matte Lip Color",
      brand: "Lakmé",
      category: "Cosmetics",
      price: 12,
      image: "",
      description: "Example cosmetics product family. Color shades and pack details vary. Read the actual package and product listing for ingredients, net quantity, batch and expiry information.",
      specs: ["Shade and variant must be selected", "Check seal, ingredients and batch/expiry information", "Imported cosmetics require applicable registration in India"],
      source: sources.lakme
    },
    "category-cosmetics": {
      name: "Cosmetics",
      brand: "Category guide",
      category: "Top category",
      price: 0,
      categoryId: "cosmetics",
      image: "images/cosmetics.png",
      description: "Example products include cosmetics such as Lakmé 9to5 Primer + Matte Lip Color. Check shade, ingredients, packaging seal, batch and expiry information before purchase.",
      specs: ["Example: Lakmé 9to5 Primer + Matte Lip Color", "Review ingredient/allergen details and net quantity", "CDSCO regulates cosmetic manufacture and import in India"],
      source: sources.cdsco
    },
    "sony-wh1000xm5": {
      name: "Sony WH-1000XM5 wireless headphones",
      brand: "Sony",
      category: "Electronics",
      price: 300,
      image: "",
      description: "Over-ear wireless headphones. Check device compatibility, comfort, connection requirements, included accessories, service availability and seller return terms.",
      specs: ["Wireless over-ear headphone model", "Confirm included cable/accessories from seller", "Verify warranty and return policy"],
      source: sources.sony
    },
    "category-electronics": {
      name: "Consumer electronics",
      brand: "Category guide",
      category: "Top category",
      price: 0,
      categoryId: "electronics",
      image: "images/electronics.png",
      description: "Example: Sony WH-1000XM5 wireless headphones. Compare compatibility, connection type, fit, included accessories and warranty. Certification rules depend on the specific regulated product class.",
      specs: ["Example: Sony WH-1000XM5 headphones", "Confirm compatibility and seller warranty", "Check applicable BIS requirements for the exact product class"],
      source: sources.sony
    },
    "ikea-poang": {
      name: "IKEA POÄNG armchair",
      brand: "IKEA",
      category: "Furniture",
      price: 180,
      image: "",
      description: "Example armchair family with frame and cover combinations that vary by item. Measure your room and delivery route; check exact dimensions, materials, assembly and delivery terms.",
      specs: ["Armchair family; finishes and covers vary", "Check exact item dimensions and materials", "Confirm assembly, delivery and return details"],
      source: sources.ikeaPoang
    },
    "category-furniture": {
      name: "Furniture",
      brand: "Category guide",
      category: "Top category",
      price: 0,
      categoryId: "furniture",
      image: "images/furniture.png",
      description: "Example: IKEA POÄNG armchair. Compare material and assembled dimensions, measure doorways and installation space, and check delivery, assembly and returns.",
      specs: ["Example: armchair", "Measure room, doorway and assembled footprint", "Confirm material, assembly and delivery requirements"],
      source: sources.ikeaPoang
    },
    "casio-ga2100": {
      name: "Casio G-Shock GA-2100",
      brand: "Casio",
      category: "Watch",
      price: 100,
      image: "",
      description: "Analog-digital G-Shock model family. Casio lists 200m water resistance for this model; follow the exact model manual and confirm the full suffix before buying.",
      specs: ["Analog-digital watch family", "200m water resistance listed by Casio", "Verify full model suffix, fit and warranty"],
      source: sources.casio
    },
    "category-watches": {
      name: "Watches",
      brand: "Category guide",
      category: "Top category",
      price: 0,
      categoryId: "watches",
      image: "images/watches.png",
      description: "Example: Casio G-Shock GA-2100 analog-digital watch. Match the exact model suffix and fit; follow the manufacturer's stated water-resistance limits.",
      specs: ["Example: analog-digital wristwatch", "Check case/strap fit and functions", "Follow exact model manual for water exposure"],
      source: sources.casio
    },
    "ikea-fado": {
      name: "IKEA FADO table lamp",
      brand: "IKEA",
      category: "Decor",
      price: 35,
      image: "",
      description: "Example glass table-lamp family. Confirm dimensions, bulb base and maximum wattage, cord/plug arrangement and bulb availability for the exact listing.",
      specs: ["Table-lamp product family", "Check bulb base and maximum wattage", "Confirm shade material, dimensions and cord arrangement"],
      source: sources.ikeaFado
    },
    "category-decor": {
      name: "Home decor",
      brand: "Category guide",
      category: "Top category",
      price: 0,
      categoryId: "decor",
      image: "images/decor.png",
      description: "Example: a glass table lamp. Check its dimensions, shade material, bulb type, maximum wattage, placement and replacement-bulb availability.",
      specs: ["Example: table lamp", "Check bulb base and maximum wattage", "Confirm size, material and care/installation needs"],
      source: sources.ikeaFado
    },
    "samsung-25w-adapter": {
      name: "Samsung 25W USB-C power adapter",
      brand: "Samsung",
      category: "Accessory",
      price: 20,
      image: "",
      description: "USB-C charger. Confirm Power Delivery/PPS support, phone compatibility, cable capability, plug type and seller authenticity. A charger's maximum output is not guaranteed on every device.",
      specs: ["USB-C 25W adapter family", "Verify Power Delivery/PPS and device compatibility", "Confirm cable inclusion, plug type and warranty"],
      source: sources.samsungCharger
    },
    "category-accessories": {
      name: "Phone accessories",
      brand: "Category guide",
      category: "Top category",
      price: 0,
      categoryId: "accessories",
      image: "images/accessories.png",
      description: "Example: Samsung 25W USB-C power adapter. Match charging protocol and output to the device; verify cable capability and included accessories.",
      specs: ["Example: USB-C power adapter", "Check Power Delivery/PPS and device compatibility", "Confirm seller authenticity and warranty"],
      source: sources.samsungCharger
    },
    "daily-staples": {
      name: "Packaged pantry staples",
      brand: "Illustrative assortment",
      category: "Daily essentials",
      price: 15,
      image: "images/daily essentials.png",
      description: "Assortment of branded toor dal, atta and cooking oil in individually packaged products.",
      specs: ["Example brands: Tata Sampann, Aashirvaad, Fortune", "List pack size, ingredients/product type and net quantity", "Show actual batch/lot and best-before details"],
      source: sources.staples
    },
    "tata-toor-dal": {
      name: "Tata Sampann Toor Dal",
      brand: "Tata Sampann",
      category: "Pantry staples",
      price: 6,
      image: "",
      description: "Example packaged pulse listing. The pack size is intentionally not specified here; use the exact current SKU label for net quantity, ingredients, batch and best-before date.",
      specs: ["Toor dal", "Verify net quantity and product label for the selected pack", "Check sealed packaging, lot and best-before date"],
      source: sources.staples
    },
    "aashirvaad-atta": {
      name: "Aashirvaad Atta",
      brand: "Aashirvaad",
      category: "Pantry staples",
      price: 8,
      image: "",
      description: "Packaged atta. Pack weights and product variants differ by product.",
      specs: ["Packaged atta", "State exact pack weight from the selected SKU", "Check seal, lot and best-before information"],
      source: sources.atta
    },
    "fortune-sunflower-oil": {
      name: "Fortune Sunlite Sunflower Oil",
      brand: "Fortune",
      category: "Pantry staples",
      price: 7,
      image: "",
      description: "Example packaged sunflower-oil listing. Use current label information for pack size, ingredients, batch and best-before details; do not copy generic specifications between variants.",
      specs: ["Sunflower oil", "Show actual net quantity and package type", "Check seal, lot and best-before information"],
      source: sources.fortune
    },
    "daily-vegetables": {
      name: "Fresh vegetables",
      brand: "Produce",
      category: "Daily essentials",
      price: 5,
      image: "images/vegetables.png",
      description: "Tomatoes such as the Arka Vikas variety, plus everyday vegetables sold by verified type, weight and origin. List a variety or origin only when confirmed by the supplier.",
      specs: ["Example variety: Arka Vikas tomato", "Show net weight and verified origin", "Inspect for decay, mold, cuts and excessive bruising"],
      source: sources.varieties
    },
    "daily-fruits": {
      name: "Fresh fruit assortment",
      brand: "Produce",
      category: "Daily essentials",
      price: 8,
      image: "images/fruits.png",
      description: "Fruit selection may include Grand Naine bananas and Thompson Seedless grapes. A mixed box should describe the fruit and quantities actually included.",
      specs: ["Examples: Grand Naine banana; Thompson Seedless grapes", "Show count or net weight, origin and verified variety", "State maturity/ready-to-eat status only when supported"],
      source: sources.varieties
    },
    "daily-strawberries": {
      name: "Fresh strawberries",
      brand: "Produce",
      category: "Daily essentials",
      price: 7,
      image: "images/strawberry.png",
      description: "Strawberry punnet listing. Chandler and Festival are varieties; name the variety, origin and weight only when confirmed by the grower or supplier.",
      specs: ["Example varieties: Chandler or Festival", "Check for mold, leakage and crushing", "Keep protected from compression; follow supplier storage guidance"],
      source: sources.varieties
    },
    "daily-mango": {
      name: "Fresh mango",
      brand: "Produce",
      category: "Daily essentials",
      price: 6,
      image: "images/mango.png",
      description: "Mango listing; Alphonso and Banganapalli are varieties. Maturity and skin color vary by cultivar, so describe verified variety, origin and weight rather than judging by color alone.",
      specs: ["Example varieties: Alphonso or Banganapalli", "List verified origin and count/weight", "FSSAI states calcium carbide use for fruit ripening is banned in India"],
      source: sources.fssai
    },
    "daily-cherries": {
      name: "Fresh sweet cherries",
      brand: "Produce",
      category: "Daily essentials",
      price: 10,
      image: "images/cherry.png",
      description: "Sweet-cherry listing. Bing and Sweetheart are cultivars; list a cultivar and origin only when supplier documentation confirms them.",
      specs: ["Example cultivars: Bing or Sweetheart", "Check for mold, leakage, shriveling or damage", "Show pack weight and verified country/region of origin"],
      source: sources.varieties
    },
    "iphone-16": {
      name: "Apple iPhone 16",
      brand: "Apple",
      category: "Smartphone",
      price: 800,
      image: "",
      description: "Apple's technical specifications describe the iPhone 16 as IP68-rated under IEC standard 60529, tested in controlled laboratory conditions to a maximum depth of 6 metres for up to 30 minutes. Water resistance can decrease with wear.",
      specs: ["IP68 rating under IEC standard 60529", "Apple states controlled tests up to 6 metres for 30 minutes", "Water resistance is not permanent; see Apple care guidance"],
      source: sources.iphone16
    },
    "iphone-16-plus": {
      name: "Apple iPhone 16 Plus",
      brand: "Apple",
      category: "Smartphone",
      price: 900,
      image: "",
      description: "Apple's iPhone 16 Plus technical page states an IP68 rating under IEC standard 60529, based on controlled laboratory testing up to 6 metres for 30 minutes. Confirm the selected market configuration.",
      specs: ["IP68 rating under IEC standard 60529", "Apple states controlled tests up to 6 metres for 30 minutes", "Water resistance can decrease with normal wear"],
      source: sources.iphone16Plus
    },
    "iphone-16-pro": {
      name: "Apple iPhone 16 Pro",
      brand: "Apple",
      category: "Smartphone",
      price: 1000,
      image: "",
      description: "Apple's iPhone 16 Pro technical specifications are the reference for this model. Verify regional configuration, storage, condition and seller terms for any particular unit.",
      specs: ["Apple iPhone 16 Pro model", "See linked Apple technical specifications for exact features", "Confirm storage, market variant and warranty"],
      source: sources.iphone16Pro
    },
    "realme-14-5g": {
      name: "realme 14 5G",
      brand: "realme",
      category: "Smartphone",
      price: 400,
      image: "",
      description: "realme's global specification page lists a 50MP rear camera and rear video recording up to 4K at 30 frames per second. Features and configurations may vary by market.",
      specs: ["50MP rear camera listed by realme", "Rear video recording up to 4K at 30fps", "Check local variant and network compatibility"],
      source: sources.realme14
    },
    "realme-14-pro-5g": {
      name: "realme 14 Pro 5G",
      brand: "realme",
      category: "Smartphone",
      price: 450,
      image: "",
      description: "realme's global specification page lists rear video recording up to 4K at 30 frames per second. Verify the market-specific model and configuration before purchase.",
      specs: ["Rear video recording up to 4K at 30fps", "Refer to linked realme specs for the exact regional model", "Confirm storage, network bands and warranty"],
      source: sources.realme14Pro
    },
    "realme-14-pro-plus-5g": {
      name: "realme 14 Pro+ 5G",
      brand: "realme",
      category: "Smartphone",
      price: 550,
      image: "",
      description: "realme's global specification page lists rear video recording up to 4K at 30 frames per second. Confirm the precise local model and available configuration.",
      specs: ["Rear video recording up to 4K at 30fps", "Refer to linked realme specs for the exact regional model", "Confirm storage, network bands and warranty"],
      source: sources.realme14ProPlus
    },
    "xiaomi-15": {
      name: "Xiaomi 15",
      brand: "Xiaomi",
      category: "Smartphone",
      price: 900,
      image: "",
      description: "Xiaomi's global specification page lists a 6.36-inch AMOLED display and a 50MP main camera. Confirm exact regional variant, storage and included accessories.",
      specs: ["6.36-inch AMOLED display listed by Xiaomi", "50MP main camera listed by Xiaomi", "Confirm regional SKU and warranty"],
      source: sources.xiaomi15
    },
    "xiaomi-15-ultra": {
      name: "Xiaomi 15 Ultra",
      brand: "Xiaomi",
      category: "Smartphone",
      price: 1200,
      image: "",
      description: "Xiaomi's global specifications list a 200MP ultra-telephoto camera and a 6.73-inch WQHD+ AMOLED display. Verify regional configuration and included accessories.",
      specs: ["200MP ultra-telephoto camera listed by Xiaomi", "6.73-inch WQHD+ AMOLED display", "Confirm regional SKU and warranty"],
      source: sources.xiaomi15Ultra
    },
    "xiaomi-15t": {
      name: "Xiaomi 15T",
      brand: "Xiaomi",
      category: "Smartphone",
      price: 650,
      image: "",
      description: "Xiaomi's global specifications list a 6.83-inch AMOLED display with up to 120Hz refresh rate and a 5,500mAh typical battery capacity. Confirm exact market variant.",
      specs: ["6.83-inch AMOLED display, up to 120Hz", "5,500mAh typical battery capacity listed by Xiaomi", "Confirm regional SKU and warranty"],
      source: sources.xiaomi15T
    },
    "xiaomi-15t-pro": {
      name: "Xiaomi 15T Pro",
      brand: "Xiaomi",
      category: "Smartphone",
      price: 800,
      image: "",
      description: "Xiaomi's global specifications list a 6.83-inch AMOLED display supporting up to 144Hz refresh rate. Check the linked specification page for the precise regional variant.",
      specs: ["6.83-inch AMOLED display listed by Xiaomi", "Up to 144Hz refresh rate", "Confirm regional SKU and warranty"],
      source: sources.xiaomi15TPro
    },
    "cerave-moisturizing-cream": {
      name: "CeraVe Moisturizing Cream",
      brand: "CeraVe",
      category: "Cosmetics",
      price: 18,
      image: "",
      description: "CeraVe's product page lists ceramides NP, AP and EOP, as well as sodium hyaluronate, among its ingredients. Formula and ingredient lists can change; check the package for the latest information.",
      specs: ["Manufacturer-listed ceramides NP, AP and EOP", "Manufacturer-listed sodium hyaluronate", "Check package for current full ingredient list"],
      source: sources.ceraveCream
    },
    "la-roche-posay-anthelios-mineral-tinted-spf50": {
      name: "La Roche-Posay Anthelios Mineral Tinted Sunscreen SPF 50",
      brand: "La Roche-Posay",
      category: "Cosmetics",
      price: 38,
      image: "",
      description: "Product identified by the manufacturer's product page. Check the product label and manufacturer page for current formulation, directions, warnings and market-specific information.",
      specs: ["Tinted mineral face sunscreen product", "SPF 50 as stated in the product name", "Follow label directions; reapply as directed"],
      source: sources.laRocheSunscreen
    },
    "macbook-air-m4": {
      name: "Apple MacBook Air with M4",
      brand: "Apple",
      category: "Electronics",
      price: 1100,
      image: "",
      description: "Apple documents 13-inch and 15-inch MacBook Air with M4 models. Apple lists standard display measurements of 13.6 and 15.3 inches respectively; select the desired size and configuration.",
      specs: ["13-inch and 15-inch versions documented by Apple", "Standard display measurements: 13.6-inch and 15.3-inch", "Memory, storage and configuration vary"],
      source: sources.macbookAir
    },
    "ipad-air-m3": {
      name: "Apple iPad Air with M3",
      brand: "Apple",
      category: "Electronics",
      price: 700,
      image: "",
      description: "Apple introduced the iPad Air with M3 in 11-inch and 13-inch sizes. Verify exact size, storage, connectivity and accessory compatibility.",
      specs: ["M3 iPad Air model introduced by Apple", "11-inch and 13-inch sizes", "Confirm storage, connectivity and accessory compatibility"],
      source: sources.ipadAir
    },
    "ikea-billy-bookcase": {
      name: "IKEA BILLY bookcase",
      brand: "IKEA",
      category: "Furniture",
      price: 90,
      image: "",
      description: "IKEA's BILLY range includes bookcases in multiple sizes and finishes, with adjustable shelves and optional doors on selected combinations. Check the selected item page for exact dimensions and parts.",
      specs: ["Adjustable shelves (range feature)", "Multiple sizes and finishes", "Optional doors available for selected range combinations"],
      source: sources.ikeaBilly
    },
    "ikea-kallax-shelf": {
      name: "IKEA KALLAX shelving unit",
      brand: "IKEA",
      category: "Furniture",
      price: 100,
      image: "",
      description: "IKEA's KALLAX range offers shelving units in various sizes and finishes. Confirm exact dimensions, configuration, wall-fixing requirements and included components on the selected item page.",
      specs: ["Shelving unit product range", "Various sizes and finishes listed by IKEA", "Check exact unit dimensions and installation guidance"],
      source: sources.ikeaKallax
    },
    "garmin-forerunner-965": {
      name: "Garmin Forerunner 965",
      brand: "Garmin",
      category: "Watch",
      price: 600,
      image: "",
      description: "Garmin identifies the Forerunner 965 as a running smartwatch. Consult the manufacturer's product page and current manual for supported functions, compatibility and use instructions.",
      specs: ["Garmin Forerunner 965 running smartwatch", "See Garmin product page for full functions", "Confirm regional warranty and compatibility"],
      source: sources.garmin965
    },
    "ikea-mosslanda-picture-ledge": {
      name: "IKEA MOSSLANDA picture ledge",
      brand: "IKEA",
      category: "Home decor",
      price: 20,
      image: "",
      description: "IKEA lists this MOSSLANDA picture ledge in white. Check the product page for dimensions, installation instructions and applicable wall-fixing hardware.",
      specs: ["White finish listing", "Verify dimensions on selected product page", "Follow installation and wall-fixing instructions"],
      source: sources.ikeaMosslanda
    },
    "logitech-mx-master-3s": {
      name: "Logitech MX Master 3S",
      brand: "Logitech",
      category: "Accessory",
      price: 100,
      image: "",
      description: "Logitech product identified by the manufacturer's product page. Check supported operating systems, connection options, included receiver and configuration for the selected SKU.",
      specs: ["MX Master 3S mouse model", "Check compatibility and connection details on Logitech page", "Confirm regional SKU and included accessories"],
      source: sources.logitechMxMaster3s
    },
    "jbl-go-4": {
      name: "JBL Go 4",
      brand: "JBL",
      category: "Accessory",
      price: 50,
      image: "",
      description: "JBL portable Bluetooth speaker. Review the manufacturer page for current specifications and confirm included cable, regional warranty and compatibility.",
      specs: ["Portable Bluetooth speaker model", "Check current manufacturer specifications", "Confirm regional warranty and included items"],
      source: sources.jblGo4
    }
  };

  // These collections power the existing "View All" catalogue pages.
  const sections = {
    smartphones: {
      title: "Smartphones",
      intro: "Compare Galaxy phones and carefully selected alternatives.",
      itemIds: ["galaxy-s22-ultra", "galaxy-s22-ultra-green", "galaxy-m13", "galaxy-m33", "galaxy-m53", "iphone-13-pro-max", "xiaomi-12-pro", "realme-gt-2-pro", "redmi-note-11", "realme-9i", "realme-9-pro", "galaxy-a53", "realme-9-pro-plus", "xiaomi-11i-hypercharge"]
    },
    categories: {
      title: "Shop Top Categories",
      intro: "Browse the KagalariMart range across smartphones, home, personal care, electronics, and daily essentials.",
      itemIds: ["category-mobile", "galaxy-a53", "category-cosmetics", "lakme-lip-color", "category-electronics", "sony-wh1000xm5", "category-furniture", "ikea-poang", "category-watches", "casio-ga2100", "category-decor", "ikea-fado", "category-accessories", "samsung-25w-adapter"]
    },
    brands: {
      title: "Featured Electronics Brands",
      intro: "Explore smartphones and electronics from Apple, realme, Xiaomi, and other leading brands.",
      itemIds: ["iphone-15", "iphone-16", "iphone-16-plus", "iphone-16-pro", "realme-gt-6", "realme-14-5g", "realme-14-pro-5g", "realme-14-pro-plus-5g", "xiaomi-14", "xiaomi-15", "xiaomi-15-ultra", "xiaomi-15t-pro", "redmi-note-13-pro-plus", "xiaomi-12-pro", "realme-gt-2-pro"]
    },
    essentials: {
      title: "Daily Essentials",
      intro: "Illustrative pantry and produce listings. Pack sizes, varieties, origin, availability and handling details must be verified for each supplier lot.",
      itemIds: ["daily-staples", "tata-toor-dal", "aashirvaad-atta", "fortune-sunflower-oil", "daily-vegetables", "daily-fruits", "daily-strawberries", "daily-mango", "daily-cherries"]
    }
  };

  // Category slugs in the URL map directly to curated product IDs below.
  const categories = {
    mobile: {
      title: "Mobile Phones",
      intro: "Compare Samsung Galaxy smartphones and selected alternatives. Check the exact model code, regional variant, storage, condition, and seller warranty.",
      itemIds: ["galaxy-s22-ultra", "galaxy-s22-ultra-green", "galaxy-m13", "galaxy-m33", "galaxy-m53", "galaxy-a53", "iphone-13-pro-max", "iphone-16", "iphone-16-plus", "iphone-16-pro", "redmi-note-11", "realme-9i", "realme-14-5g", "realme-14-pro-5g", "realme-14-pro-plus-5g", "xiaomi-15", "xiaomi-15-ultra", "xiaomi-15t"]
    },
    cosmetics: {
      title: "Cosmetics",
      intro: "Browse beauty and personal-care products. Shade, ingredients, pack details, and applicable registration are verified against the product and seller listing.",
      itemIds: ["lakme-lip-color", "cerave-moisturizing-cream", "la-roche-posay-anthelios-mineral-tinted-spf50"]
    },
    electronics: {
      title: "Electronics",
      intro: "Browse consumer electronics. Confirm compatibility, exact model, included accessories, service, and warranty for each product.",
      itemIds: ["sony-wh1000xm5", "macbook-air-m4", "ipad-air-m3"]
    },
    furniture: {
      title: "Furniture",
      intro: "Compare furniture by product dimensions, materials, assembly requirements, and delivery terms.",
      itemIds: ["ikea-poang", "ikea-billy-bookcase", "ikea-kallax-shelf"]
    },
    watches: {
      title: "Watches",
      intro: "Browse watches by brand and model. Match the complete model number and check fit, functions, warranty, and manufacturer instructions.",
      itemIds: ["casio-ga2100", "garmin-forerunner-965"]
    },
    decor: {
      title: "Home Decor",
      intro: "Browse home decor and lighting. Confirm dimensions, materials, electrical or installation requirements, and care instructions for each product.",
      itemIds: ["ikea-fado", "ikea-mosslanda-picture-ledge"]
    },
    accessories: {
      title: "Accessories",
      intro: "Browse accessories. Verify device compatibility, connector or charging standards, included parts, seller, and warranty.",
      itemIds: ["samsung-25w-adapter", "logitech-mx-master-3s", "jbl-go-4"]
    }
  };

  window.KagalariMartCatalog = Object.freeze({ items, sections, categories });
})();
