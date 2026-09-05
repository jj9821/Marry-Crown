/**
 * Mary Crown Restaurant - Owner Admin Portal Controller
 * Authentication: ID: admin123 | Password: 1234567890
 */

(function () {
  "use strict";

  // Credentials
  const AUTH_CREDENTIALS = {
    id: "admin123",
    password: "1234567890"
  };

  const SESSION_KEY = "mary_crown_admin_auth";

  // State
  let isAuthenticated = false;
  let menuItems = [];
  let searchQuery = "";
  let selectedCategory = "all";
  let selectedStockStatus = "all"; // "all", "in_stock", "out_of_stock"
  let selectedDietFilter = "all";   // "all", "veg", "nonveg"
  let hasUnsavedChanges = false;

  // DOM Elements
  const loginSection = document.getElementById("admin-login-section");
  const dashboardSection = document.getElementById("admin-dashboard-section");
  const loginForm = document.getElementById("admin-login-form");
  const adminIdInput = document.getElementById("admin-id-input");
  const adminPasswordInput = document.getElementById("admin-password-input");
  const loginErrorMsg = document.getElementById("admin-login-error");
  const rememberMeCheck = document.getElementById("admin-remember-me");
  const logoutBtn = document.getElementById("admin-logout-btn");

  // Dashboard Elements
  const itemsContainer = document.getElementById("admin-items-container");
  const searchInput = document.getElementById("admin-search-input");
  const searchClearBtn = document.getElementById("admin-search-clear");
  const categoryTabsContainer = document.getElementById("admin-category-tabs");
  const stockFilterSelect = document.getElementById("admin-stock-filter");
  const dietFilterSelect = document.getElementById("admin-diet-filter");
  
  // Stat counters
  const totalItemsCountEl = document.getElementById("stat-total-items");
  const inStockCountEl = document.getElementById("stat-in-stock");
  const outOfStockCountEl = document.getElementById("stat-out-of-stock");
  const filteredCountEl = document.getElementById("admin-filtered-count");

  // Action buttons
  const saveChangesBtn = document.getElementById("admin-save-btn");
  const exportBtn = document.getElementById("admin-export-btn");
  const copyJsonBtn = document.getElementById("admin-copy-json-btn");
  const resetBtn = document.getElementById("admin-reset-btn");
  const markAllInStockBtn = document.getElementById("admin-mark-all-instock");
  const markAllOutOfStockBtn = document.getElementById("admin-mark-all-outofstock");
  const unsavedBadge = document.getElementById("admin-unsaved-badge");

  // Toast & Modal
  const toastEl = document.getElementById("admin-toast");
  const toastMsg = document.getElementById("admin-toast-message");
  const resetModal = document.getElementById("admin-reset-modal");
  const confirmResetBtn = document.getElementById("admin-confirm-reset-btn");
  const cancelResetBtn = document.getElementById("admin-cancel-reset-btn");

  /* ==========================================================================
     AUTHENTICATION
     ========================================================================== */
  function checkAuth() {
    const sessionAuth = sessionStorage.getItem(SESSION_KEY);
    const localAuth = localStorage.getItem(SESSION_KEY);
    if (sessionAuth === "true" || localAuth === "true") {
      isAuthenticated = true;
      showDashboard();
    } else {
      isAuthenticated = false;
      showLogin();
    }
  }

  function handleLogin(e) {
    if (e) e.preventDefault();
    const id = (adminIdInput ? adminIdInput.value.trim() : "");
    const pwd = (adminPasswordInput ? adminPasswordInput.value.trim() : "");

    if (id === AUTH_CREDENTIALS.id && pwd === AUTH_CREDENTIALS.password) {
      if (loginErrorMsg) loginErrorMsg.classList.add("hidden");
      sessionStorage.setItem(SESSION_KEY, "true");
      if (rememberMeCheck && rememberMeCheck.checked) {
        localStorage.setItem(SESSION_KEY, "true");
      }
      isAuthenticated = true;
      showDashboard();
      showToast("👑 Welcome back, Manager!");
    } else {
      if (loginErrorMsg) {
        loginErrorMsg.textContent = "Invalid Admin ID or Password. Please try again.";
        loginErrorMsg.classList.remove("hidden");
        // Shake animation
        const formCard = document.getElementById("login-card");
        if (formCard) {
          formCard.classList.remove("animate-shake");
          void formCard.offsetWidth; // trigger reflow
          formCard.classList.add("animate-shake");
        }
      }
      if (adminPasswordInput) {
        adminPasswordInput.value = "";
        adminPasswordInput.focus();
      }
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    isAuthenticated = false;
    if (adminIdInput) adminIdInput.value = "";
    if (adminPasswordInput) adminPasswordInput.value = "";
    showLogin();
    showToast("Logged out successfully.");
  }

  function showLogin() {
    if (loginSection) loginSection.classList.remove("hidden");
    if (dashboardSection) dashboardSection.classList.add("hidden");
  }

  function showDashboard() {
    if (loginSection) loginSection.classList.add("hidden");
    if (dashboardSection) dashboardSection.classList.remove("hidden");
    loadMenu();
    renderCategories();
    renderItems();
    updateStats();
  }

  /* ==========================================================================
     DATA LOADING & NORMALIZATION
     ========================================================================== */
  function loadMenu() {
    if (typeof window.loadStoredMenu === "function") {
      menuItems = JSON.parse(JSON.stringify(window.loadStoredMenu()));
    } else if (typeof window.MENU_ITEMS !== "undefined") {
      menuItems = JSON.parse(JSON.stringify(window.MENU_ITEMS));
    } else {
      menuItems = [];
    }

    // Ensure all items have an explicit .available boolean
    menuItems.forEach((item) => {
      if (item.available === undefined) {
        item.available = true;
      }
      if (item.variants) {
        item.variants.forEach((v) => {
          if (v.available === undefined) {
            v.available = true;
          }
        });
      }
    });
  }

  function setUnsaved(changed) {
    hasUnsavedChanges = changed;
    if (unsavedBadge) {
      if (changed) {
        unsavedBadge.classList.remove("hidden");
      } else {
        unsavedBadge.classList.add("hidden");
      }
    }
    if (saveChangesBtn) {
      if (changed) {
        saveChangesBtn.classList.add("ring-2", "ring-yellow-400", "scale-105");
      } else {
        saveChangesBtn.classList.remove("ring-2", "ring-yellow-400", "scale-105");
      }
    }
  }

  /* ==========================================================================
     CATEGORY TABS RENDERING
     ========================================================================== */
  function renderCategories() {
    if (!categoryTabsContainer) return;
    categoryTabsContainer.innerHTML = "";

    // "All Categories" Tab
    const allBtn = document.createElement("button");
    allBtn.className = `admin-cat-tab ${selectedCategory === "all" ? "active" : ""}`;
    allBtn.innerHTML = `<span>All Categories (${menuItems.length})</span>`;
    allBtn.addEventListener("click", () => {
      selectedCategory = "all";
      renderCategories();
      renderItems();
    });
    categoryTabsContainer.appendChild(allBtn);

    const categories = window.CATEGORIES || [];
    categories.forEach((cat) => {
      const count = menuItems.filter(i => i.category === cat.id).length;
      const btn = document.createElement("button");
      btn.className = `admin-cat-tab ${selectedCategory === cat.id ? "active" : ""}`;
      btn.innerHTML = `<span>${cat.name} (${count})</span>`;
      btn.addEventListener("click", () => {
        selectedCategory = cat.id;
        renderCategories();
        renderItems();
      });
      categoryTabsContainer.appendChild(btn);
    });
  }

  /* ==========================================================================
     STATS CALCULATION
     ========================================================================== */
  function updateStats() {
    const total = menuItems.length;
    const inStock = menuItems.filter(i => i.available !== false).length;
    const outOfStock = total - inStock;

    if (totalItemsCountEl) totalItemsCountEl.textContent = total;
    if (inStockCountEl) inStockCountEl.textContent = inStock;
    if (outOfStockCountEl) outOfStockCountEl.textContent = outOfStock;
  }

  /* ==========================================================================
     ITEMS RENDERING & INTERACTION
     ========================================================================== */
  function getFilteredItems() {
    const q = searchQuery.toLowerCase().trim();

    return menuItems.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // Stock filter
      if (selectedStockStatus === "in_stock" && item.available === false) {
        return false;
      }
      if (selectedStockStatus === "out_of_stock" && item.available !== false) {
        return false;
      }

      // Diet filter
      if (selectedDietFilter === "veg" && !item.isVeg) {
        return false;
      }
      if (selectedDietFilter === "nonveg" && item.isVeg) {
        return false;
      }

      // Search query
      if (q) {
        const inName = item.name.toLowerCase().includes(q);
        const inId = (item.id || "").toLowerCase().includes(q);
        const inCat = (item.category || "").toLowerCase().includes(q);
        const inDesc = (item.description || "").toLowerCase().includes(q);
        return inName || inId || inCat || inDesc;
      }

      return true;
    });
  }

  function renderItems() {
    if (!itemsContainer) return;
    itemsContainer.innerHTML = "";

    const filtered = getFilteredItems();

    if (filteredCountEl) {
      filteredCountEl.textContent = `Showing ${filtered.length} of ${menuItems.length} items`;
    }

    if (filtered.length === 0) {
      itemsContainer.innerHTML = `
        <div class="text-center py-16 px-4 bg-slate-900/60 border border-slate-800 rounded-2xl col-span-full">
          <div class="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-3 text-slate-500">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <h4 class="text-base font-bold text-slate-300 mb-1 font-brand">No Dishes Found</h4>
          <p class="text-xs text-slate-400">Try adjusting your search query or filters.</p>
        </div>
      `;
      return;
    }

    filtered.forEach((item) => {
      const card = document.createElement("div");
      const isAvailable = item.available !== false;
      card.className = `admin-item-card ${isAvailable ? "" : "out-of-stock"}`;
      card.dataset.itemId = item.id;

      // Veg / Non-Veg badge
      const dietBadge = `
        <div class="diet-badge ${item.isVeg ? "veg" : "nonveg"}" title="${item.isVeg ? "Vegetarian" : "Non-Vegetarian"}">
          <div class="dot"></div>
        </div>
      `;

      // Category Name lookup
      const catObj = (window.CATEGORIES || []).find(c => c.id === item.category);
      const catName = catObj ? catObj.name : item.category;

      // Price input HTML
      let priceSectionHtml = "";
      if (item.hasVariants && item.variants && item.variants.length > 0) {
        const variantsInputs = item.variants.map((v, vIndex) => `
          <div class="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-950/70 border border-slate-800">
            <span class="text-xs font-semibold text-slate-300 truncate">${v.name}</span>
            <div class="flex items-center gap-1">
              <span class="text-xs text-amber-400 font-bold">₹</span>
              <input 
                type="number" 
                min="0" 
                step="1" 
                value="${v.price}" 
                data-item-id="${item.id}"
                data-var-index="${vIndex}"
                class="variant-price-input w-20 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-amber-300 font-bold text-right focus:outline-none focus:border-amber-400"
              >
            </div>
          </div>
        `).join("");

        priceSectionHtml = `
          <div class="space-y-1.5 mt-3 pt-3 border-t border-slate-800/80">
            <div class="text-[11px] font-bold text-amber-400 uppercase tracking-wider">${item.variantType || "Portion Pricing"}:</div>
            <div class="space-y-1.5">${variantsInputs}</div>
          </div>
        `;
      } else {
        priceSectionHtml = `
          <div class="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/80">
            <span class="text-xs text-slate-400 font-semibold">Dish Price:</span>
            <div class="flex items-center gap-1">
              <span class="text-sm text-amber-400 font-bold">₹</span>
              <input 
                type="number" 
                min="0" 
                step="1" 
                value="${item.price}" 
                data-item-id="${item.id}"
                class="single-price-input w-24 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-amber-300 font-extrabold text-right focus:outline-none focus:border-amber-400"
              >
            </div>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="flex items-start justify-between gap-2 mb-2">
          <div class="flex items-center gap-2 min-w-0">
            ${dietBadge}
            <div>
              <h4 class="font-bold text-sm text-slate-100 truncate">${item.name}</h4>
              <span class="text-[10px] text-amber-400/80 font-semibold uppercase tracking-wider">${catName} • ID: ${item.id}</span>
            </div>
          </div>
          
          <!-- In-Stock Toggle Switch -->
          <label class="stock-switch flex items-center gap-2 cursor-pointer select-none">
            <span class="stock-label text-[11px] font-extrabold ${isAvailable ? "text-emerald-400" : "text-rose-400"}">
              ${isAvailable ? "IN STOCK" : "OUT OF STOCK"}
            </span>
            <input type="checkbox" class="stock-toggle-checkbox sr-only" data-item-id="${item.id}" ${isAvailable ? "checked" : ""}>
            <div class="switch-track w-11 h-6 rounded-full transition-colors ${isAvailable ? "bg-emerald-600" : "bg-slate-800 border border-slate-700"} flex items-center p-0.5">
              <div class="switch-thumb w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${isAvailable ? "translate-x-5" : "translate-x-0"}"></div>
            </div>
          </label>
        </div>

        ${item.description ? `<p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-2">${item.description}</p>` : ""}

        ${priceSectionHtml}
      `;

      // Event: Stock Toggle
      const stockCheckbox = card.querySelector(".stock-toggle-checkbox");
      if (stockCheckbox) {
        stockCheckbox.addEventListener("change", (e) => {
          const checked = e.target.checked;
          item.available = checked;
          setUnsaved(true);

          // Update switch visually
          const label = card.querySelector(".stock-label");
          const track = card.querySelector(".switch-track");
          const thumb = card.querySelector(".switch-thumb");

          if (checked) {
            card.classList.remove("out-of-stock");
            if (label) {
              label.textContent = "IN STOCK";
              label.className = "stock-label text-[11px] font-extrabold text-emerald-400";
            }
            if (track) {
              track.className = "switch-track w-11 h-6 rounded-full transition-colors bg-emerald-600 flex items-center p-0.5";
            }
            if (thumb) {
              thumb.className = "switch-thumb w-5 h-5 rounded-full bg-white shadow-md transform transition-transform translate-x-5";
            }
          } else {
            card.classList.add("out-of-stock");
            if (label) {
              label.textContent = "OUT OF STOCK";
              label.className = "stock-label text-[11px] font-extrabold text-rose-400";
            }
            if (track) {
              track.className = "switch-track w-11 h-6 rounded-full transition-colors bg-slate-800 border border-slate-700 flex items-center p-0.5";
            }
            if (thumb) {
              thumb.className = "switch-thumb w-5 h-5 rounded-full bg-white shadow-md transform transition-transform translate-x-0";
            }
          }
          updateStats();
        });
      }

      // Event: Single Price Input
      const singlePriceInp = card.querySelector(".single-price-input");
      if (singlePriceInp) {
        singlePriceInp.addEventListener("input", (e) => {
          const newPrice = parseFloat(e.target.value) || 0;
          item.price = newPrice;
          setUnsaved(true);
        });
      }

      // Event: Variant Price Inputs
      const varPriceInputs = card.querySelectorAll(".variant-price-input");
      varPriceInputs.forEach((inp) => {
        inp.addEventListener("input", (e) => {
          const vIndex = parseInt(inp.dataset.varIndex, 10);
          const newPrice = parseFloat(e.target.value) || 0;
          if (item.variants && item.variants[vIndex]) {
            item.variants[vIndex].price = newPrice;
            // Also update main price to minimum variant price
            item.price = item.variants[0].price;
            setUnsaved(true);
          }
        });
      });

      itemsContainer.appendChild(card);
    });
  }

  /* ==========================================================================
     BULK ACTIONS & PERSISTENCE
     ========================================================================== */
  function saveAllChanges() {
    if (typeof window.saveCustomMenu === "function") {
      const ok = window.saveCustomMenu(menuItems);
      if (ok) {
        setUnsaved(false);
        showToast("✓ All changes saved successfully! Live menu updated.");
      } else {
        showToast("⚠️ Could not save to localStorage.");
      }
    } else {
      localStorage.setItem("mary_crown_menu_custom_v1", JSON.stringify(menuItems));
      setUnsaved(false);
      showToast("✓ All changes saved successfully!");
    }
    updateStats();
  }

  function markFilteredStock(status) {
    const filtered = getFilteredItems();
    filtered.forEach((item) => {
      item.available = status;
    });
    setUnsaved(true);
    renderItems();
    updateStats();
    showToast(`Marked ${filtered.length} items as ${status ? "In Stock" : "Out of Stock"}`);
  }

  function exportUpdatedMenuDataJs() {
    // Generate clean JS file content
    const jsonStr = JSON.stringify(menuItems, null, 2);
    
    // Read restaurant info and categories if available
    const restInfo = JSON.stringify(window.RESTAURANT_INFO || {}, null, 2);
    const catInfo = JSON.stringify(window.CATEGORIES || [], null, 2);

    const fileContent = `/**
 * Mary Crown Restaurant - Master Menu Dataset
 * Generated from Owner Admin Portal on ${new Date().toLocaleString()}
 */

const RESTAURANT_INFO = ${restInfo};

const CATEGORIES = ${catInfo};

const DEFAULT_MENU_ITEMS = ${jsonStr};

const MENU_STORAGE_KEY = "mary_crown_menu_custom_v1";

function loadStoredMenu() {
  try {
    if (typeof localStorage !== "undefined") {
      const stored = localStorage.getItem(MENU_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    }
  } catch (e) {
    console.warn("Could not load custom menu from localStorage:", e);
  }
  return DEFAULT_MENU_ITEMS;
}

let MENU_ITEMS = loadStoredMenu();

function saveCustomMenu(newItems) {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(newItems));
    }
    MENU_ITEMS = newItems;
    if (typeof window !== "undefined") {
      window.MENU_ITEMS = newItems;
      window.dispatchEvent(new CustomEvent("menu:updated", { detail: newItems }));
    }
    return true;
  } catch (e) {
    console.error("Failed to save menu:", e);
    return false;
  }
}

function resetCustomMenu() {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(MENU_STORAGE_KEY);
    }
    MENU_ITEMS = JSON.parse(JSON.stringify(DEFAULT_MENU_ITEMS));
    if (typeof window !== "undefined") {
      window.MENU_ITEMS = MENU_ITEMS;
      window.dispatchEvent(new CustomEvent("menu:updated", { detail: MENU_ITEMS }));
    }
    return true;
  } catch (e) {
    console.error("Failed to reset menu:", e);
    return false;
  }
}

if (typeof window !== "undefined") {
  window.RESTAURANT_INFO = RESTAURANT_INFO;
  window.CATEGORIES = CATEGORIES;
  window.DEFAULT_MENU_ITEMS = DEFAULT_MENU_ITEMS;
  window.MENU_ITEMS = MENU_ITEMS;
  window.loadStoredMenu = loadStoredMenu;
  window.saveCustomMenu = saveCustomMenu;
  window.resetCustomMenu = resetCustomMenu;
  window.MENU_STORAGE_KEY = MENU_STORAGE_KEY;
}
`;

    const blob = new Blob([fileContent], { type: "application/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "menuData.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("⬇ Downloaded updated menuData.js! Replace assets/js/menuData.js to deploy globally.");
  }

  function copyMenuJson() {
    const jsonStr = JSON.stringify(menuItems, null, 2);
    navigator.clipboard.writeText(jsonStr).then(() => {
      showToast("📋 Menu JSON copied to clipboard!");
    }).catch(() => {
      showToast("Could not copy to clipboard.");
    });
  }

  function resetToDefault() {
    if (typeof window.resetCustomMenu === "function") {
      window.resetCustomMenu();
    } else {
      localStorage.removeItem("mary_crown_menu_custom_v1");
    }
    loadMenu();
    setUnsaved(false);
    renderCategories();
    renderItems();
    updateStats();
    if (resetModal) resetModal.classList.add("hidden");
    showToast("↺ Menu reset to factory default prices & availability.");
  }

  /* ==========================================================================
     TOAST
     ========================================================================== */
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = msg;
    toastEl.classList.remove("hidden");
    toastEl.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove("show");
      setTimeout(() => toastEl.classList.add("hidden"), 300);
    }, 3000);
  }

  /* ==========================================================================
     EVENT LISTENERS SETUP
     ========================================================================== */
  function setupEventListeners() {
    // Login form
    if (loginForm) {
      loginForm.addEventListener("submit", handleLogin);
    }
    if (logoutBtn) {
      logoutBtn.addEventListener("click", handleLogout);
    }

    // Search
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
        renderItems();
      });
    }

    if (searchClearBtn) {
      searchClearBtn.addEventListener("click", () => {
        searchQuery = "";
        if (searchInput) searchInput.value = "";
        searchClearBtn.classList.add("hidden");
        renderItems();
      });
    }

    // Stock status dropdown
    if (stockFilterSelect) {
      stockFilterSelect.addEventListener("change", (e) => {
        selectedStockStatus = e.target.value;
        renderItems();
      });
    }

    // Diet dropdown
    if (dietFilterSelect) {
      dietFilterSelect.addEventListener("change", (e) => {
        selectedDietFilter = e.target.value;
        renderItems();
      });
    }

    // Bulk actions
    if (markAllInStockBtn) {
      markAllInStockBtn.addEventListener("click", () => markFilteredStock(true));
    }
    if (markAllOutOfStockBtn) {
      markAllOutOfStockBtn.addEventListener("click", () => markFilteredStock(false));
    }

    // Save
    if (saveChangesBtn) {
      saveChangesBtn.addEventListener("click", saveAllChanges);
    }

    // Export & Copy
    if (exportBtn) {
      exportBtn.addEventListener("click", exportUpdatedMenuDataJs);
    }
    if (copyJsonBtn) {
      copyJsonBtn.addEventListener("click", copyMenuJson);
    }

    // Reset Modal
    if (resetBtn && resetModal) {
      resetBtn.addEventListener("click", () => {
        resetModal.classList.remove("hidden");
      });
    }
    if (cancelResetBtn && resetModal) {
      cancelResetBtn.addEventListener("click", () => {
        resetModal.classList.add("hidden");
      });
    }
    if (confirmResetBtn) {
      confirmResetBtn.addEventListener("click", resetToDefault);
    }
    if (resetModal) {
      resetModal.addEventListener("click", (e) => {
        if (e.target === resetModal) resetModal.classList.add("hidden");
      });
    }

    // Prompt before unload if unsaved
    window.addEventListener("beforeunload", (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes in the menu. Are you sure you want to leave?";
        return e.returnValue;
      }
    });
  }

  // Init on DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    checkAuth();
  });

})();
