/**
 * Mary Crown Restaurant - Cart & Order Engine v2.0
 */

class MaryCrownCart {
  constructor() {
    this.storageKey = "marycrown_cart_v2";
    this.profileKey = "marycrown_customer_profile_v1";
    this.items = this.loadCart();
    this.listeners = [];
  }

  loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Could not load cart from localStorage", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {
      console.warn("Could not save cart to localStorage", e);
    }
    this.notify();
  }

  saveCustomerProfile(profile) {
    try {
      localStorage.setItem(this.profileKey, JSON.stringify(profile));
    } catch (e) {
      console.warn("Could not save customer profile", e);
    }
  }

  loadCustomerProfile() {
    try {
      const data = localStorage.getItem(this.profileKey);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    callback(this.getState());
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach((callback) => callback(state));
    window.dispatchEvent(new CustomEvent("cart:updated", { detail: state }));
  }

  getState() {
    const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const minOrder = RESTAURANT_INFO.minOrder || 100;
    const meetsMinOrder = subtotal >= minOrder;
    const differenceToMin = Math.max(0, minOrder - subtotal);
    const progressPercent = Math.min(100, Math.round((subtotal / minOrder) * 100));

    return {
      items: [...this.items],
      count,
      subtotal,
      minOrder,
      meetsMinOrder,
      differenceToMin,
      progressPercent
    };
  }

  getItemKey(itemId, variantName = "") {
    return variantName ? `${itemId}__${variantName}` : itemId;
  }

  addItem(item, variant = null, quantity = 1) {
    const variantName = variant ? variant.name : "";
    const price = variant ? variant.price : item.price;
    const cartItemId = this.getItemKey(item.id, variantName);

    const existingIndex = this.items.findIndex(i => i.cartItemId === cartItemId);
    if (existingIndex > -1) {
      this.items[existingIndex].quantity += quantity;
    } else {
      this.items.push({
        cartItemId,
        id: item.id,
        name: item.name,
        variantName: variantName,
        price: price,
        isVeg: item.isVeg,
        category: item.category,
        quantity: quantity
      });
    }
    this.saveCart();
    return this.getState();
  }

  updateQuantity(cartItemId, delta) {
    const index = this.items.findIndex(i => i.cartItemId === cartItemId);
    if (index > -1) {
      const newQty = this.items[index].quantity + delta;
      if (newQty <= 0) {
        this.items.splice(index, 1);
      } else {
        this.items[index].quantity = newQty;
      }
      this.saveCart();
    }
    return this.getState();
  }

  removeItem(cartItemId) {
    this.items = this.items.filter(i => i.cartItemId !== cartItemId);
    this.saveCart();
    return this.getState();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
    return this.getState();
  }

  getItemQuantity(itemId, variantName = "") {
    const cartItemId = this.getItemKey(itemId, variantName);
    const found = this.items.find(i => i.cartItemId === cartItemId);
    return found ? found.quantity : 0;
  }

  getTotalItemQuantity(itemId) {
    return this.items
      .filter(i => i.id === itemId)
      .reduce((sum, i) => sum + i.quantity, 0);
  }

  generateWhatsAppUrl(orderDetails = {}) {
    const {
      name = "",
      address = "",
      phone = "",
      tableNo = "",
      orderType = "Delivery",
      notes = ""
    } = orderDetails;

    // Save profile for subsequent orders
    this.saveCustomerProfile({ name, address, phone, tableNo, orderType });

    const state = this.getState();
    if (state.items.length === 0) return null;

    let text = `👑 *ORDER FOR MARY CROWN RESTAURANT*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*Service Type:* *${orderType.toUpperCase()}*\n`;
    if (orderType === "Dine-in" && tableNo.trim()) {
      text += `*Table Number:* *${tableNo.trim()}*\n`;
    }
    text += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    text += `*ORDERED ITEMS:*\n`;

    state.items.forEach((item, index) => {
      const itemTitle = item.variantName ? `${item.name} (${item.variantName})` : item.name;
      const itemTotal = item.price * item.quantity;
      const icon = item.isVeg ? "🟢" : "🔴";
      text += `${icon} ${index + 1}. *${itemTitle}*\n   ↳ ${item.quantity} × ₹${item.price} = *₹${itemTotal}*\n`;
    });

    text += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `*Total Bill:* *₹${state.subtotal}*\n`;
    if (orderType === "Delivery") {
      text += `*Delivery Benefit:* Free Home Delivery (5km)\n`;
    }
    text += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

    text += `*CUSTOMER DETAILS:*\n`;
    text += `👤 *Name:* ${name.trim() || "Customer"}\n`;
    if (orderType === "Delivery") {
      text += `📍 *Delivery Address:* ${address.trim() || "55 Vivekanandha St, Potheri Area"}\n`;
    }
    if (phone.trim()) {
      text += `📞 *Contact Phone:* ${phone.trim()}\n`;
    }
    if (notes.trim()) {
      text += `📝 *Special Requests / Notes:* ${notes.trim()}\n`;
    }

    text += `\n_Please confirm my order and approximate prep time. Thank you!_`;

    const encoded = encodeURIComponent(text);
    return `https://wa.me/${RESTAURANT_INFO.whatsappInternational}?text=${encoded}`;
  }
}

// Global instance
window.cart = new MaryCrownCart();
