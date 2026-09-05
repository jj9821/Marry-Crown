/**
 * Mary Crown Restaurant - Main Application Controller v3.0
 * Pure single-page scrolling architecture with responsive offset calculations.
 */

document.addEventListener("DOMContentLoaded", () => {
  // State
  let currentDietFilter = "all"; // "all", "veg", "nonveg"
  let searchQuery = "";
  let activeCategoryId = "biryani";
  let isProgrammaticScrolling = false;
  let scrollLockTimeout = null;
  let activeModalsCount = 0;

  // DOM Elements
  const header = document.getElementById("site-header");
  const categoryNavWrapper = document.querySelector(".category-nav-wrapper");
  const categoryScroll = document.getElementById("category-scroll");
  const menuContainer = document.getElementById("menu-container");
  const searchInput = document.getElementById("menu-search");
  const searchClearBtn = document.getElementById("search-clear-btn");
  const searchSuggestions = document.getElementById("search-suggestions");
  const searchResultCount = document.getElementById("search-result-count");
  const dietFilterBtns = document.querySelectorAll(".diet-filter-btn");
  
  // Cart Elements
  const cartDrawer = document.getElementById("cart-drawer");
  const drawerBackdrop = document.getElementById("drawer-backdrop");
  const cartOpenBtns = document.querySelectorAll(".cart-open-btn");
  const cartCloseBtn = document.getElementById("cart-close-btn");
  const cartItemsList = document.getElementById("cart-items-list");
  const cartSubtotalEl = document.getElementById("cart-subtotal");
  const cartMinOrderNotice = document.getElementById("cart-min-order-notice");
  const mobileCartBar = document.getElementById("mobile-cart-bar");
  const mobileCartCount = document.getElementById("mobile-cart-count");
  const mobileCartTotal = document.getElementById("mobile-cart-total");
  const headerCartCount = document.getElementById("header-cart-badge");
  const whatsappOrderBtn = document.getElementById("whatsapp-order-btn");
  
  // Customer & Order inputs
  const orderTypeSelect = document.getElementById("order-type-select");
  const tableNoContainer = document.getElementById("table-no-container");
  const addressContainer = document.getElementById("address-container");
  const nameInput = document.getElementById("order-cust-name");
  const addressInput = document.getElementById("order-cust-address");
  const phoneInput = document.getElementById("order-cust-phone");
  const tableInput = document.getElementById("order-cust-table");
  const notesInput = document.getElementById("order-cust-notes");

  // Modals & Overlays
  const variantModal = document.getElementById("variant-modal");
  const variantModalClose = document.getElementById("variant-modal-close");
  const menuImageModal = document.getElementById("menu-image-modal");
  const menuImageModalClose = document.getElementById("menu-image-modal-close");
  const categorySheetModal = document.getElementById("category-sheet-modal");
  const categorySheetClose = document.getElementById("category-sheet-close");
  const floatingCategoryFab = document.getElementById("floating-category-fab");
  const categorySheetList = document.getElementById("category-sheet-list");

  const backToTopBtn = document.getElementById("back-to-top");
  const toastEl = document.getElementById("toast");

  /* -------------------------------------------------------------
     DYNAMIC STICKY LAYOUT & CSS VARIABLE SYNCHRONIZATION
     ------------------------------------------------------------- */
  function updateStickyDimensions() {
    const headerHeight = header ? header.offsetHeight : 60;
    const catNavHeight = categoryNavWrapper ? categoryNavWrapper.offsetHeight : 48;
    const totalSticky = headerHeight + catNavHeight;
    const scrollOffset = totalSticky + 16;

    document.documentElement.style.setProperty("--header-height", `${headerHeight}px`);
    document.documentElement.style.setProperty("--category-nav-height", `${catNavHeight}px`);
    document.documentElement.style.setProperty("--total-sticky-height", `${totalSticky}px`);
    document.documentElement.style.setProperty("--scroll-offset", `${scrollOffset}px`);

    return { headerHeight, catNavHeight, totalSticky, scrollOffset };
  }

  function getScrollOffset() {
    const headerHeight = header ? header.offsetHeight : 60;
    const catNavHeight = categoryNavWrapper ? categoryNavWrapper.offsetHeight : 48;
    return headerHeight + catNavHeight + 16;
  }

  // Prepopulate saved profile
  loadSavedCustomerProfile();

  // Initialize
  updateStickyDimensions();
  window.addEventListener("resize", updateStickyDimensions, { passive: true });
  window.addEventListener("orientationchange", updateStickyDimensions, { passive: true });

  initCategoryNav();
  initCategorySheet();
  renderMenu();
  setupEventListeners();
  setupScrollspy();

  // Subscribe to Cart state changes
  window.cart.subscribe((cartState) => {
    updateCartUI(cartState);
  });

  /* -------------------------------------------------------------
     SCROLL LOCK HELPERS (FOR MODALS & DRAWERS)
     ------------------------------------------------------------- */
  function lockBodyScroll() {
    activeModalsCount++;
    document.body.style.overflow = "hidden";
  }

  function unlockBodyScroll() {
    activeModalsCount = Math.max(0, activeModalsCount - 1);
    if (activeModalsCount === 0) {
      document.body.style.overflow = "";
    }
  }

  /* -------------------------------------------------------------
     CATEGORY NAVIGATION & CATEGORY SHEET
     ------------------------------------------------------------- */
  function initCategoryNav() {
    if (!categoryScroll) return;
    categoryScroll.innerHTML = "";

    // "All Items" Tab
    const allBtn = document.createElement("button");
    allBtn.className = "category-tab-btn active";
    allBtn.dataset.category = "all";
    allBtn.innerHTML = `<span>👑 All Items</span>`;
    allBtn.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToCategory("all");
    });
    categoryScroll.appendChild(allBtn);

    const displayMode = (typeof localStorage !== "undefined" && localStorage.getItem("mary_crown_display_mode")) || "hide";
    const currentItems = ((typeof window !== "undefined" && window.MENU_ITEMS) ? window.MENU_ITEMS : (typeof MENU_ITEMS !== "undefined" ? MENU_ITEMS : []));

    CATEGORIES.forEach((cat) => {
      // Check if category has any available dishes
      const availableCount = currentItems.filter(i => i.category === cat.id && (displayMode !== "hide" || i.available !== false)).length;
      if (availableCount === 0) return; // Hide category tab if all items are turned off!

      const btn = document.createElement("button");
      btn.className = "category-tab-btn";
      btn.dataset.category = cat.id;
      btn.innerHTML = `<span>${cat.name}</span>`;
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToCategory(cat.id);
      });
      categoryScroll.appendChild(btn);
    });
  }

  function initCategorySheet() {
    if (!categorySheetList) return;
    categorySheetList.innerHTML = "";

    const displayMode = (typeof localStorage !== "undefined" && localStorage.getItem("mary_crown_display_mode")) || "hide";
    const currentItems = ((typeof window !== "undefined" && window.MENU_ITEMS) ? window.MENU_ITEMS : (typeof MENU_ITEMS !== "undefined" ? MENU_ITEMS : []));

    CATEGORIES.forEach((cat) => {
      const availableCount = currentItems.filter(i => i.category === cat.id && (displayMode !== "hide" || i.available !== false)).length;
      if (availableCount === 0) return; // Hide category if no available dishes
      const count = availableCount;
      const row = document.createElement("button");
      row.className = "w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-yellow-500/15 hover:border-yellow-500/50 hover:bg-yellow-500/10 text-left transition-all group";
      row.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl overflow-hidden border border-yellow-500/30 flex-shrink-0 bg-slate-950">
            <img src="${cat.image || ("assets/images/sections/" + cat.id + ".webp")}" alt="${cat.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform" loading="lazy">
          </div>
          <div>
            <div class="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors">${cat.name}</div>
            <div class="text-[11px] text-slate-400">${count} dishes • <span class="text-amber-400/80">${cat.tagline || ""}</span></div>
          </div>
        </div>
        <svg class="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      `;
      row.addEventListener("click", () => {
        closeCategorySheet();
        setTimeout(() => {
          scrollToCategory(cat.id);
        }, 120);
      });
      categorySheetList.appendChild(row);
    });
  }

  function scrollToCategory(catId) {
    if (catId === "all") {
      const menuSec = document.getElementById("menu-section");
      if (menuSec) {
        const offset = (header ? header.offsetHeight : 60) + 12;
        const targetY = menuSec.getBoundingClientRect().top + window.pageYOffset - offset;
        isProgrammaticScrolling = true;
        updateCategoryNavActive("all");
        window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
        
        clearTimeout(scrollLockTimeout);
        scrollLockTimeout = setTimeout(() => {
          isProgrammaticScrolling = false;
        }, 750);
      }
      return;
    }

    const target = document.getElementById(`cat-${catId}`);
    if (target) {
      const offset = getScrollOffset();
      const targetY = target.getBoundingClientRect().top + window.pageYOffset - offset;
      
      isProgrammaticScrolling = true;
      updateCategoryNavActive(catId);
      window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });

      clearTimeout(scrollLockTimeout);
      scrollLockTimeout = setTimeout(() => {
        isProgrammaticScrolling = false;
      }, 750);
    }
  }

  function openCategorySheet() {
    if (categorySheetModal) {
      categorySheetModal.classList.add("active");
      lockBodyScroll();
    }
  }

  function closeCategorySheet() {
    if (categorySheetModal && categorySheetModal.classList.contains("active")) {
      categorySheetModal.classList.remove("active");
      unlockBodyScroll();
    }
  }

  /* -------------------------------------------------------------
     MENU RENDERING WITH FILTERS & SEARCH
     ------------------------------------------------------------- */
  function renderMenu() {
    if (!menuContainer) return;
    menuContainer.innerHTML = "";

    const query = searchQuery.trim().toLowerCase();
    let totalVisibleItems = 0;

    const displayMode = (typeof localStorage !== "undefined" && localStorage.getItem("mary_crown_display_mode")) || "hide";
    const currentItems = ((typeof window !== "undefined" && window.MENU_ITEMS) ? window.MENU_ITEMS : (typeof MENU_ITEMS !== "undefined" ? MENU_ITEMS : []));

    CATEGORIES.forEach((cat) => {
      const catItems = currentItems.filter((item) => {
        if (item.category !== cat.id) return false;

        // Hide out of stock items if display mode is hide (default)
        if (displayMode === "hide" && item.available === false) return false;

        // Diet filter
        if (currentDietFilter === "veg" && !item.isVeg) return false;
        if (currentDietFilter === "nonveg" && item.isVeg) return false;

        // Search filter
        if (query) {
          const matchName = item.name.toLowerCase().includes(query);
          const matchDesc = (item.description || "").toLowerCase().includes(query);
          const matchCat = cat.name.toLowerCase().includes(query);
          const matchSubCat = (item.subCategory || "").toLowerCase().includes(query);
          const matchVariants = (item.variants || []).some(v => v.name.toLowerCase().includes(query));
          const matchItemsIncluded = (item.itemsIncluded || []).some(inc => inc.toLowerCase().includes(query));
          return matchName || matchDesc || matchCat || matchSubCat || matchVariants || matchItemsIncluded;
        }

        return true;
      });

      if (catItems.length === 0) return;

      totalVisibleItems += catItems.length;

      // Section Container
      const section = document.createElement("section");
      section.id = `cat-${cat.id}`;
      section.className = "category-section mb-14";

      // Section Cinematic Banner Hero
      const isFirstSection = cat.id === "biryani";
      const bannerDiv = document.createElement("div");
      bannerDiv.className = "category-banner";
      
      const imgPath = cat.image || ("assets/images/sections/" + cat.id + ".webp");
      const altText = cat.imageAlt || (cat.name + " - Mary Crown Restaurant");
      const taglineText = cat.tagline || "Authentic Specialty";

      bannerDiv.innerHTML = `
        <img 
          src="${imgPath}" 
          alt="${altText}" 
          class="category-banner-img"
          loading="${isFirstSection ? "eager" : "lazy"}"
          onerror="this.parentElement.classList.add('img-failed')"
        >
        <div class="category-banner-overlay">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="badge-gold">${taglineText}</span>
            <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-black/60 text-amber-300 border border-yellow-500/30 backdrop-blur-sm shadow-sm">${catItems.length} dishes</span>
          </div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-black font-brand text-gold-gradient tracking-wide uppercase drop-shadow-lg leading-tight">
            ${cat.name}
          </h2>
          <p class="text-xs sm:text-sm text-slate-200 font-medium max-w-2xl line-clamp-2 drop-shadow-md mt-0.5">
            ${cat.description || ""}
          </p>
        </div>
      `;
      section.appendChild(bannerDiv);

      // Section Grid
      const grid = document.createElement("div");
      if (cat.id === "combos" || cat.id === "biryani") {
        grid.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5";
      } else {
        grid.className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4";
      }

      catItems.forEach((item) => {
        grid.appendChild(createMenuItemCard(item, query));
      });

      section.appendChild(grid);
      menuContainer.appendChild(section);
    });

    // Update Result count in search header
    if (searchResultCount) {
      if (query || currentDietFilter !== "all") {
        searchResultCount.textContent = `Showing ${totalVisibleItems} matching dishes`;
        searchResultCount.classList.remove("hidden");
      } else {
        searchResultCount.classList.add("hidden");
      }
    }

    // Empty State
    if (totalVisibleItems === 0) {
      menuContainer.innerHTML = `
        <div class="text-center py-16 px-4 bg-surface rounded-2xl border border-yellow-500/20 my-8 max-w-lg mx-auto">
          <div class="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mx-auto mb-4 text-yellow-400">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-slate-200 mb-2 font-brand">No Dishes Found</h3>
          <p class="text-sm text-slate-400 mb-6">We couldn't find any dish matching "<span class="text-yellow-400">${query}</span>". Try searching for Biriyani, Chicken 65, Shawarma, or Naan.</p>
          <button id="reset-search-btn" class="px-6 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-sm shadow-md hover:scale-105 transition-transform">
            View Full Menu
          </button>
        </div>
      `;
      const resetBtn = document.getElementById("reset-search-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          searchQuery = "";
          currentDietFilter = "all";
          if (searchInput) searchInput.value = "";
          updateFilterButtons();
          renderMenu();
        });
      }
    }
  }

  /* -------------------------------------------------------------
     ITEM CARD BUILDER
     ------------------------------------------------------------- */
  function createMenuItemCard(item, activeQuery = "") {
    const card = document.createElement("div");
    const isCombo = item.category === "combos";
    const isBiryani = item.category === "biryani";
    const isAvailable = item.available !== false;
    
    card.className = isCombo ? "combo-card" : isBiryani ? "menu-card biryani-card" : "menu-card";
    if (!isAvailable) {
      card.classList.add("opacity-75", "border-slate-800");
    }
    card.dataset.itemId = item.id;

    // Diet badge
    const dietBadgeHtml = `
      <div class="diet-badge ${item.isVeg ? "veg" : "nonveg"}" title="${item.isVeg ? "Vegetarian" : "Non-Vegetarian"}">
        <div class="dot"></div>
      </div>
    `;

    // Highlight Badges & Out of Stock Status
    let badgeHtml = "";
    if (!isAvailable) {
      badgeHtml = `<span class="px-2 py-0.5 rounded bg-red-950/90 text-red-400 border border-red-500/40 text-[10px] font-extrabold uppercase tracking-wider">Sold Out</span>`;
    } else if (item.badge) {
      badgeHtml = `<span class="badge-gold">${item.badge}</span>`;
    }

    // Highlight search query
    let itemName = item.name;
    if (activeQuery && itemName.toLowerCase().includes(activeQuery)) {
      const regex = new RegExp(`(${activeQuery})`, "gi");
      itemName = itemName.replace(regex, `<span class="text-yellow-300 underline decoration-amber-400 font-extrabold">$1</span>`);
    }

    // Price Display & Inline Variants
    let priceHtml = "";
    let inlineVariantSelectorHtml = "";

    if (item.hasVariants && item.variants) {
      const formattedVariants = item.variants.map(v => `${v.name}: ₹${v.price}`).join(" • ");
      priceHtml = `
        <div class="flex flex-col">
          <span class="text-[11px] text-yellow-500 font-bold tracking-wider uppercase">${item.variantType || "Options"}</span>
          <span class="text-sm md:text-base font-extrabold text-amber-400">${formattedVariants}</span>
        </div>
      `;

      const variantPills = item.variants.map((v) => {
        const qty = window.cart.getItemQuantity(item.id, v.name);
        return `
          <button class="inline-variant-pill direct-var-add-btn ${qty > 0 ? "border-amber-400 bg-yellow-500/20 text-amber-300 font-bold" : ""}" data-var-name="${v.name}" data-var-price="${v.price}" title="Add ${v.name}">
            <span>${v.name}</span>
            <span class="text-amber-400 font-bold">₹${v.price}</span>
            ${qty > 0 ? `<span class="w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-extrabold text-[10px] flex items-center justify-center">${qty}</span>` : `<span class="text-slate-400">+</span>`}
          </button>
        `;
      }).join("");

      inlineVariantSelectorHtml = `
        <div class="inline-variant-group">
          ${variantPills}
        </div>
      `;
    } else {
      priceHtml = `
        <div class="flex items-baseline gap-1">
          <span class="text-xs text-amber-500 font-bold">₹</span>
          <span class="text-xl font-extrabold text-amber-400 font-brand">${item.price}</span>
        </div>
      `;
    }

    // Combos breakdown
    let comboBreakdownHtml = "";
    if (isCombo && item.itemsIncluded) {
      const itemsList = item.itemsIncluded.map(inc => `
        <li class="flex items-center gap-2 text-xs text-slate-300">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>${inc}</span>
        </li>
      `).join("");
      comboBreakdownHtml = `
        <div class="my-3 p-2.5 rounded-xl bg-black/40 border border-yellow-500/20">
          <span class="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 block mb-1.5">Includes:</span>
          <ul class="space-y-1">${itemsList}</ul>
        </div>
      `;
    }

    // Quantity / Action Button
    const totalQty = window.cart.getTotalItemQuantity(item.id);
    let actionBtnHtml = "";
    if (!isAvailable) {
      actionBtnHtml = `
        <button disabled class="px-3.5 py-1.5 rounded-lg bg-slate-800/80 text-slate-500 font-bold text-xs border border-slate-700/60 cursor-not-allowed">
          Sold Out
        </button>
      `;
    } else if (item.hasVariants) {
      actionBtnHtml = `
        <button class="btn-add-primary open-variant-modal-btn" data-item-id="${item.id}">
          <span>Options</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      `;
    } else if (totalQty > 0) {
      actionBtnHtml = `
        <div class="qty-control-group">
          <button class="qty-btn dec-qty-btn" data-item-id="${item.id}" aria-label="Decrease quantity">−</button>
          <span class="qty-count">${totalQty}</span>
          <button class="qty-btn inc-qty-btn" data-item-id="${item.id}" aria-label="Increase quantity">+</button>
        </div>
      `;
    } else {
      actionBtnHtml = `
        <button class="btn-add-primary add-direct-btn" data-item-id="${item.id}">
          <span>ADD</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      `;
    }

    card.innerHTML = `
      <div>
        <div class="flex items-start justify-between gap-2 mb-2">
          <div class="flex items-center gap-2">
            ${dietBadgeHtml}
            <h3 class="font-bold text-base md:text-lg text-slate-100 leading-snug">${itemName}</h3>
          </div>
          ${badgeHtml}
        </div>
        ${item.description ? `<p class="text-xs md:text-sm text-slate-400 mb-2 leading-relaxed">${item.description}</p>` : ""}
        ${comboBreakdownHtml}
        ${inlineVariantSelectorHtml}
      </div>

      <div class="flex items-center justify-between pt-3 mt-2 border-t border-slate-800/80">
        ${priceHtml}
        <div class="action-btn-slot">
          ${actionBtnHtml}
        </div>
      </div>
    `;

    // Attach Click Events
    const variantBtn = card.querySelector(".open-variant-modal-btn");
    if (variantBtn) {
      variantBtn.addEventListener("click", () => openVariantModal(item));
    }

    const inlineVarBtns = card.querySelectorAll(".direct-var-add-btn");
    inlineVarBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const vName = btn.dataset.varName;
        const vPrice = parseFloat(btn.dataset.varPrice);
        window.cart.addItem(item, { name: vName, price: vPrice }, 1);
        showToast(`Added ${item.name} (${vName}) to cart`);
        renderMenu();
      });
    });

    const addDirectBtn = card.querySelector(".add-direct-btn");
    if (addDirectBtn) {
      addDirectBtn.addEventListener("click", () => {
        window.cart.addItem(item, null, 1);
        showToast(`Added "${item.name}" to cart`);
        renderMenu();
      });
    }

    const decBtn = card.querySelector(".dec-qty-btn");
    if (decBtn) {
      decBtn.addEventListener("click", () => {
        window.cart.updateQuantity(item.id, -1);
        renderMenu();
      });
    }

    const incBtn = card.querySelector(".inc-qty-btn");
    if (incBtn) {
      incBtn.addEventListener("click", () => {
        window.cart.updateQuantity(item.id, 1);
        renderMenu();
      });
    }

    return card;
  }

  /* -------------------------------------------------------------
     VARIANT MODAL
     ------------------------------------------------------------- */
  function openVariantModal(item) {
    if (!variantModal) return;

    const titleEl = document.getElementById("variant-modal-title");
    const listEl = document.getElementById("variant-options-list");
    const descEl = document.getElementById("variant-modal-desc");

    if (titleEl) titleEl.textContent = item.name;
    if (descEl) descEl.textContent = item.description || "Select your portion/flavor:";
    if (listEl && item.variants) {
      listEl.innerHTML = "";
      item.variants.forEach((v) => {
        const currentQty = window.cart.getItemQuantity(item.id, v.name);
        const opt = document.createElement("div");
        opt.className = "flex items-center justify-between p-3.5 rounded-xl bg-slate-900/80 border border-yellow-500/20 hover:border-yellow-500/50 transition-all";
        opt.innerHTML = `
          <div>
            <div class="font-bold text-slate-100 text-sm md:text-base">${v.name}</div>
            <div class="text-amber-400 font-extrabold text-sm">₹${v.price}</div>
          </div>
          <div>
            ${
              currentQty > 0
                ? `
              <div class="qty-control-group">
                <button class="qty-btn modal-dec-qty" data-var-name="${v.name}">−</button>
                <span class="qty-count">${currentQty}</span>
                <button class="qty-btn modal-inc-qty" data-var-name="${v.name}">+</button>
              </div>
            `
                : `
              <button class="btn-add-primary modal-add-var-btn" data-var-name="${v.name}" data-var-price="${v.price}">
                <span>ADD</span> +
              </button>
            `
            }
          </div>
        `;

        const addBtn = opt.querySelector(".modal-add-var-btn");
        if (addBtn) {
          addBtn.addEventListener("click", () => {
            window.cart.addItem(item, v, 1);
            showToast(`Added ${item.name} (${v.name})`);
            openVariantModal(item);
            renderMenu();
          });
        }

        const decBtn = opt.querySelector(".modal-dec-qty");
        if (decBtn) {
          decBtn.addEventListener("click", () => {
            const key = window.cart.getItemKey(item.id, v.name);
            window.cart.updateQuantity(key, -1);
            openVariantModal(item);
            renderMenu();
          });
        }

        const incBtn = opt.querySelector(".modal-inc-qty");
        if (incBtn) {
          incBtn.addEventListener("click", () => {
            const key = window.cart.getItemKey(item.id, v.name);
            window.cart.updateQuantity(key, 1);
            openVariantModal(item);
            renderMenu();
          });
        }

        listEl.appendChild(opt);
      });
    }

    variantModal.classList.add("active");
    lockBodyScroll();
  }

  function closeVariantModal() {
    if (variantModal && variantModal.classList.contains("active")) {
      variantModal.classList.remove("active");
      unlockBodyScroll();
    }
  }

  /* -------------------------------------------------------------
     CART UI & DRAWER MANAGEMENT
     ------------------------------------------------------------- */
  function openCart() {
    if (cartDrawer && drawerBackdrop) {
      cartDrawer.classList.add("active");
      drawerBackdrop.classList.add("active");
      lockBodyScroll();
    }
  }

  function closeCart() {
    if (cartDrawer && drawerBackdrop && cartDrawer.classList.contains("active")) {
      cartDrawer.classList.remove("active");
      drawerBackdrop.classList.remove("active");
      unlockBodyScroll();
    }
  }

  function updateCartUI(cartState) {
    // Header cart badge
    if (headerCartCount) {
      if (cartState.count > 0) {
        headerCartCount.textContent = cartState.count;
        headerCartCount.classList.remove("hidden");
      } else {
        headerCartCount.classList.add("hidden");
      }
    }

    // Mobile bottom cart bar
    if (mobileCartBar) {
      if (cartState.count > 0) {
        mobileCartBar.classList.remove("hidden");
        mobileCartBar.style.display = "flex";
        if (mobileCartCount) mobileCartCount.textContent = `${cartState.count} ${cartState.count === 1 ? "Item" : "Items"}`;
        if (mobileCartTotal) mobileCartTotal.textContent = `₹${cartState.subtotal}`;
      } else {
        mobileCartBar.style.display = "none";
      }
    }

    // Cart Drawer Subtotal
    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = `₹${cartState.subtotal}`;
    }

    // Progress Bar & Minimum Order notice
    if (cartMinOrderNotice) {
      if (cartState.items.length === 0) {
        cartMinOrderNotice.innerHTML = "";
      } else if (!cartState.meetsMinOrder) {
        cartMinOrderNotice.innerHTML = `
          <div class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
            <div class="flex items-center justify-between mb-1">
              <span class="font-bold">Minimum Order Progress</span>
              <span class="font-extrabold text-amber-400">₹${cartState.subtotal} / ₹${cartState.minOrder}</span>
            </div>
            <div class="delivery-progress-track">
              <div class="delivery-progress-fill" style="width: ${cartState.progressPercent}%;"></div>
            </div>
            <p class="mt-2 text-[11px] text-slate-300">Add <strong>₹${cartState.differenceToMin}</strong> more to qualify for Free Delivery (5km radius).</p>
          </div>
        `;
      } else {
        cartMinOrderNotice.innerHTML = `
          <div class="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
            <div class="flex items-center gap-2 font-bold text-emerald-400">
              <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Free Delivery Eligible (5km Radius)!</span>
            </div>
            <div class="delivery-progress-track mt-1.5">
              <div class="delivery-progress-fill bg-emerald-500" style="width: 100%;"></div>
            </div>
          </div>
        `;
      }
    }

    // Render cart item rows
    if (cartItemsList) {
      if (cartState.items.length === 0) {
        cartItemsList.innerHTML = `
          <div class="text-center py-16 px-4">
            <div class="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto mb-4 text-slate-500">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <h4 class="text-lg font-bold text-slate-300 font-brand mb-1">Your Cart is Empty</h4>
            <p class="text-xs text-slate-400 mb-6">Explore our authentic dishes and add your favorites.</p>
            <button id="cart-start-browsing-btn" class="px-5 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs shadow-md">
              Start Browsing
            </button>
          </div>
        `;
        const startBtn = document.getElementById("cart-start-browsing-btn");
        if (startBtn) {
          startBtn.addEventListener("click", () => closeCart());
        }
      } else {
        cartItemsList.innerHTML = "";
        cartState.items.forEach((item) => {
          const row = document.createElement("div");
          row.className = "flex items-center justify-between p-3 rounded-xl bg-slate-900/70 border border-slate-800 gap-3";
          const title = item.variantName ? `${item.name} (${item.variantName})` : item.name;
          const itemTotal = item.price * item.quantity;

          row.innerHTML = `
            <div class="flex items-center gap-2.5 min-w-0 flex-1">
              <div class="diet-badge ${item.isVeg ? "veg" : "nonveg"}">
                <div class="dot"></div>
              </div>
              <div class="min-w-0">
                <div class="font-bold text-sm text-slate-100 truncate">${title}</div>
                <div class="text-xs text-amber-400 font-semibold">₹${item.price} each</div>
              </div>
            </div>

            <div class="flex items-center gap-3 flex-shrink-0">
              <div class="qty-control-group">
                <button class="qty-btn cart-dec-btn" data-cart-item-id="${item.cartItemId}">−</button>
                <span class="qty-count">${item.quantity}</span>
                <button class="qty-btn cart-inc-btn" data-cart-item-id="${item.cartItemId}">+</button>
              </div>
              <div class="font-extrabold text-sm text-amber-400 text-right min-w-[50px]">
                ₹${itemTotal}
              </div>
            </div>
          `;

          const dec = row.querySelector(".cart-dec-btn");
          if (dec) {
            dec.addEventListener("click", () => {
              window.cart.updateQuantity(item.cartItemId, -1);
              renderMenu();
            });
          }

          const inc = row.querySelector(".cart-inc-btn");
          if (inc) {
            inc.addEventListener("click", () => {
              window.cart.updateQuantity(item.cartItemId, 1);
              renderMenu();
            });
          }

          cartItemsList.appendChild(row);
        });
      }
    }
  }

  /* -------------------------------------------------------------
     CUSTOMER DETAILS & WHATSAPP
     ------------------------------------------------------------- */
  function loadSavedCustomerProfile() {
    const saved = window.cart.loadCustomerProfile();
    if (saved) {
      if (nameInput && saved.name) nameInput.value = saved.name;
      if (phoneInput && saved.phone) phoneInput.value = saved.phone;
      if (addressInput && saved.address) addressInput.value = saved.address;
      if (tableInput && saved.tableNo) tableInput.value = saved.tableNo;
      if (orderTypeSelect && saved.orderType) {
        orderTypeSelect.value = saved.orderType;
        handleOrderTypeToggle(saved.orderType);
      }
    }
  }

  function handleOrderTypeToggle(type) {
    if (type === "Dine-in") {
      tableNoContainer?.classList.remove("hidden");
      addressContainer?.classList.add("hidden");
    } else if (type === "Takeaway") {
      tableNoContainer?.classList.add("hidden");
      addressContainer?.classList.add("hidden");
    } else {
      tableNoContainer?.classList.add("hidden");
      addressContainer?.classList.remove("hidden");
    }
  }

  function handleWhatsAppOrder() {
    const state = window.cart.getState();
    if (state.items.length === 0) {
      showToast("⚠️ Your cart is empty. Please add dishes first!");
      return;
    }

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const address = addressInput ? addressInput.value.trim() : "";
    const tableNo = tableInput ? tableInput.value.trim() : "";
    const notes = notesInput ? notesInput.value.trim() : "";
    const orderType = orderTypeSelect ? orderTypeSelect.value : "Delivery";

    // Clear previous error styles
    [nameInput, phoneInput, addressInput, tableInput].forEach(inp => {
      if (inp) {
        inp.classList.remove("border-red-500", "ring-1", "ring-red-500");
      }
    });

    // 1. Mandatory Name Validation
    if (!name) {
      showToast("⚠️ Please enter your Name to place the order.");
      if (nameInput) {
        nameInput.classList.add("border-red-500", "ring-1", "ring-red-500");
        nameInput.focus();
      }
      return;
    }

    // 2. Mandatory Mobile Number Validation
    const phoneDigits = phone.replace(/\D/g, "");
    if (!phone || phoneDigits.length < 10) {
      showToast("⚠️ Please enter a valid 10-digit Mobile Number.");
      if (phoneInput) {
        phoneInput.classList.add("border-red-500", "ring-1", "ring-red-500");
        phoneInput.focus();
      }
      return;
    }

    // 3. Mandatory Address / Table Number Validation
    if (orderType === "Dine-in") {
      if (!tableNo) {
        showToast("⚠️ Please enter your Table Number for Dine-in.");
        if (tableInput) {
          tableInput.classList.add("border-red-500", "ring-1", "ring-red-500");
          tableInput.focus();
        }
        return;
      }
    } else {
      if (!address) {
        showToast("⚠️ Please enter your Delivery Address / Room No.");
        if (addressInput) {
          addressInput.classList.add("border-red-500", "ring-1", "ring-red-500");
          addressInput.focus();
        }
        return;
      }
    }

    // Save profile to localStorage for seamless repeat orders
    window.cart.saveCustomerProfile({
      name,
      phone,
      address,
      tableNo,
      orderType
    });

    const url = window.cart.generateWhatsAppUrl({
      name,
      address,
      phone,
      tableNo,
      notes,
      orderType
    });

    if (url) {
      window.open(url, "_blank");
    }
  }

  /* -------------------------------------------------------------
     EVENT LISTENERS & CONTROLLERS
     ------------------------------------------------------------- */
  function setupEventListeners() {
    // Listen for real-time menu updates from Owner Admin Portal
    window.addEventListener("menu:updated", () => {
      initCategoryNav();
      initCategorySheet();
      renderMenu();
    });
    window.addEventListener("storage", (e) => {
      if (e.key === "mary_crown_menu_custom_v1" || e.key === "mary_crown_display_mode") {
        if (typeof window.loadStoredMenu === "function") {
          window.MENU_ITEMS = window.loadStoredMenu();
        }
        initCategoryNav();
        initCategorySheet();
        renderMenu();
      }
    });

    // Header Scroll Effect & Dimensions check
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        header?.classList.add("scrolled");
        backToTopBtn?.classList.add("show");
      } else {
        header?.classList.remove("scrolled");
        backToTopBtn?.classList.remove("show");
      }
      updateStickyDimensions();
    }, { passive: true });

        // Clear input error styles on user typing
    [nameInput, phoneInput, addressInput, tableInput].forEach((inp) => {
      if (inp) {
        inp.addEventListener("input", () => {
          inp.classList.remove("border-red-500", "ring-1", "ring-red-500");
        });
      }
    });

    // Order Type Switcher
    if (orderTypeSelect) {
      orderTypeSelect.addEventListener("change", (e) => {
        handleOrderTypeToggle(e.target.value);
      });
    }

    // Back to top button
    backToTopBtn?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Search Input
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        if (searchClearBtn) {
          if (searchQuery) {
            searchClearBtn.classList.remove("hidden");
          } else {
            searchClearBtn.classList.add("hidden");
          }
        }
        renderMenu();
      });
    }

    // Search Suggestions Click
    if (searchSuggestions) {
      const suggestionBtns = searchSuggestions.querySelectorAll("button");
      suggestionBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          const val = btn.dataset.searchQuery;
          if (searchInput) searchInput.value = val;
          searchQuery = val;
          if (searchClearBtn) searchClearBtn.classList.remove("hidden");
          renderMenu();
        });
      });
    }

    // Search Clear Button
    if (searchClearBtn) {
      searchClearBtn.addEventListener("click", () => {
        searchQuery = "";
        if (searchInput) searchInput.value = "";
        searchClearBtn.classList.add("hidden");
        renderMenu();
      });
    }

    // Dietary Filter Buttons
    dietFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        dietFilterBtns.forEach(b => b.classList.remove("active", "bg-gold-gradient", "text-slate-950", "font-bold"));
        dietFilterBtns.forEach(b => b.classList.add("text-slate-300", "bg-slate-900/80"));
        
        btn.classList.add("active", "bg-gold-gradient", "text-slate-950", "font-bold");
        btn.classList.remove("text-slate-300", "bg-slate-900/80");

        currentDietFilter = btn.dataset.filter || "all";
        renderMenu();
      });
    });

    // Cart Open / Close
    cartOpenBtns.forEach(btn => btn.addEventListener("click", openCart));
    cartCloseBtn?.addEventListener("click", closeCart);
    drawerBackdrop?.addEventListener("click", closeCart);

    // Floating Category Sheet
    floatingCategoryFab?.addEventListener("click", openCategorySheet);
    categorySheetClose?.addEventListener("click", closeCategorySheet);
    categorySheetModal?.addEventListener("click", (e) => {
      if (e.target === categorySheetModal) closeCategorySheet();
    });

    // WhatsApp Order Button
    whatsappOrderBtn?.addEventListener("click", handleWhatsAppOrder);

    // Variant Modal Close
    variantModalClose?.addEventListener("click", closeVariantModal);
    variantModal?.addEventListener("click", (e) => {
      if (e.target === variantModal) closeVariantModal();
    });

    // Menu Image Modal
    const openMenu1Btn = document.getElementById("open-menu-1-btn");
    const openMenu2Btn = document.getElementById("open-menu-2-btn");
    const menuModalImg = document.getElementById("menu-modal-image");
    const menuModalTitle = document.getElementById("menu-modal-title");

    if (openMenu1Btn && menuImageModal) {
      openMenu1Btn.addEventListener("click", () => {
        if (menuModalImg) menuModalImg.src = "assets/images/menu-1.jpg";
        if (menuModalTitle) menuModalTitle.textContent = "Original Menu - Page 1";
        menuImageModal.classList.add("active");
        lockBodyScroll();
      });
    }

    if (openMenu2Btn && menuImageModal) {
      openMenu2Btn.addEventListener("click", () => {
        if (menuModalImg) menuModalImg.src = "assets/images/menu-2.jpg";
        if (menuModalTitle) menuModalTitle.textContent = "Original Menu - Page 2";
        menuImageModal.classList.add("active");
        lockBodyScroll();
      });
    }

    menuImageModalClose?.addEventListener("click", () => {
      if (menuImageModal && menuImageModal.classList.contains("active")) {
        menuImageModal.classList.remove("active");
        unlockBodyScroll();
      }
    });
    menuImageModal?.addEventListener("click", (e) => {
      if (e.target === menuImageModal) {
        menuImageModal.classList.remove("active");
        unlockBodyScroll();
      }
    });

    // Universal Escape Key Handler
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeCart();
        closeVariantModal();
        closeCategorySheet();
        if (menuImageModal && menuImageModal.classList.contains("active")) {
          menuImageModal.classList.remove("active");
          unlockBodyScroll();
        }
      }
    });
  }

  function updateFilterButtons() {
    dietFilterBtns.forEach((btn) => {
      if (btn.dataset.filter === currentDietFilter) {
        btn.classList.add("active", "bg-gold-gradient", "text-slate-950", "font-bold");
        btn.classList.remove("text-slate-300", "bg-slate-900/80");
      } else {
        btn.classList.remove("active", "bg-gold-gradient", "text-slate-950", "font-bold");
        btn.classList.add("text-slate-300", "bg-slate-900/80");
      }
    });
  }

  /* -------------------------------------------------------------
     SCROLLSPY (FAST & ACCURATE)
     ------------------------------------------------------------- */
  function setupScrollspy() {
    const handleScroll = () => {
      if (isProgrammaticScrolling) return;

      const scrollY = window.pageYOffset || window.scrollY;
      const offset = getScrollOffset();
      
      const menuSec = document.getElementById("menu-section");
      if (menuSec && scrollY < menuSec.offsetTop - 50) {
        if (activeCategoryId !== "all") {
          activeCategoryId = "all";
          updateCategoryNavActive("all");
        }
        return;
      }

      const sections = CATEGORIES.map(c => document.getElementById(`cat-${c.id}`)).filter(Boolean);
      if (sections.length === 0) return;

      let currentId = null;
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        if (rect.top <= offset + 60 && rect.bottom > offset) {
          currentId = section.id.replace("cat-", "");
        }
      }

      // Reached bottom of page
      if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 60) {
        currentId = sections[sections.length - 1].id.replace("cat-", "");
      }

      if (currentId && currentId !== activeCategoryId) {
        activeCategoryId = currentId;
        updateCategoryNavActive(currentId);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  function updateCategoryNavActive(categoryId) {
    if (!categoryScroll) return;
    const tabs = categoryScroll.querySelectorAll(".category-tab-btn");
    tabs.forEach((tab) => {
      if (tab.dataset.category === categoryId) {
        tab.classList.add("active");
        
        // Scroll ONLY the horizontal container without moving page vertically
        const containerWidth = categoryScroll.clientWidth;
        const tabOffset = tab.offsetLeft;
        const tabWidth = tab.clientWidth;
        const targetLeft = tabOffset - (containerWidth / 2) + (tabWidth / 2);
        
        categoryScroll.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: "smooth"
        });
      } else {
        tab.classList.remove("active");
      }
    });
  }

  /* -------------------------------------------------------------
     TOAST NOTIFICATIONS
     ------------------------------------------------------------- */
  function showToast(message) {
    if (!toastEl) return;
    const msgEl = toastEl.querySelector(".toast-message");
    if (msgEl) msgEl.textContent = message;
    toastEl.classList.add("show");
    setTimeout(() => {
      toastEl.classList.remove("show");
    }, 2400);
  }
});
