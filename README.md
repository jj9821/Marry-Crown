# Mary Crown Restaurant - Modern Digital Menu Website

A modern, mobile-first digital menu website for **Mary Crown Restaurant** (Potheri, Chennai).

## Tagline
**Indian • Chinese • Arabian • Tandoori**

---

## Features
- **100% Exact Data Accuracy**: All 10 categories, 179 items/combos, and pricing variants (Roll/Plate, Rice/Noodles, QTR/HALF/FULL) extracted directly from official menu assets.
- **Cinematic Visual Section Headers**: Original high-resolution WebP section banners for each food category with dark obsidian & warm gold luxury aesthetics.
- **Mobile QR-Menu Experience**: Sticky category bar, quick-jump category sheet drawer, and responsive bottom cart bar.
- **Instant Search & Filters**: Fuzzy search with query highlighting, quick suggestion chips, and dietary filters (`ALL`, `VEG ONLY`, `NON-VEG`).
- **Interactive Cart & One-Tap WhatsApp Ordering**: Calculates subtotal, minimum order progress (₹100 threshold), stores customer delivery info, and formats WhatsApp orders directly to `+91 7418825826`.
- **Original Printed Menu Viewer**: Interactive modal to view and toggle original printed menu scans (Page 1 & Page 2).
- **SEO & PWA Ready**: JSON-LD `Restaurant` schema, `manifest.json`, `robots.txt`, and `sitemap.xml`.

---

## Restaurant Information
- **Phone / WhatsApp**: +91 7418825826
- **Instagram**: [@marycrown_restaurant](https://www.instagram.com/marycrown_restaurant/)
- **Email**: mcrestaurant@yahoo.com
- **Address**: 55-Vivekanandha Street, Potheri, 603203
- **Delivery**: Free Home Delivery within 5 km Radius in Potheri
- **Minimum Order**: ₹100

---

## Project Structure
```
├── index.html                   # Single-page application entry point
├── manifest.json                # Web App Manifest
├── robots.txt                   # Search engine crawling rules
├── sitemap.xml                  # Local SEO sitemap
├── assets/
│   ├── css/
│   │   └── style.css            # Luxury dark & gold design system
│   ├── js/
│   │   ├── menuData.js          # Master dataset of all 179 menu items
│   │   ├── cart.js              # Reactive cart and WhatsApp dispatcher
│   │   └── app.js               # UI controller, scrollspy & modals
│   └── images/
│       ├── logo.png             # Official Mary Crown crown emblem
│       ├── halal-badge.svg      # Halal certification vector badge
│       ├── menu-1.jpg           # Original menu scan 1
│       ├── menu-2.jpg           # Original menu scan 2
│       └── sections/            # Cinematic WebP category headers
└── public/
    └── menu/
        └── sections/            # Web-optimized WebP category banners
```

---

## Running Locally
You can serve this static website using any HTTP server:

```bash
# Using Python
python3 -m http.server 8080

# Using Node / npx
npx serve .
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

---

© 2026 Mary Crown Restaurant. All rights reserved.
