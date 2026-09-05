/**
 * Mary Crown Restaurant - Master Menu Dataset
 * Extracted with 100% precision from official menu assets.
 * 
 * Restaurant Metadata:
 * - Name: MARY CROWN RESTAURANT
 * - Tagline: Indian • Chinese • Arabian • Tandoori
 * - WhatsApp / Phone: 7418825826
 * - Instagram: marycrown_restaurant
 * - Email: mcrestaurant@yahoo.com
 * - Address: 55-Vivekanandha Street, Potheri, 603203
 * - Delivery: Free Home Delivery (5 km Radius)
 * - Min Order: ₹100
 * - Notes: Mayonnaise / Parcel Extra Charges
 */

const RESTAURANT_INFO = {
  name: "MARY CROWN RESTAURANT",
  tagline: "Indian • Chinese • Arabian • Tandoori",
  phone: "7418825826",
  phoneFormatted: "+91 74188 25826",
  whatsapp: "7418825826",
  whatsappInternational: "917418825826",
  instagram: "marycrown_restaurant",
  instagramUrl: "https://www.instagram.com/marycrown_restaurant/",
  email: "mcrestaurant@yahoo.com",
  address: "55-Vivekanandha Street, Potheri, 603203",
  googleMapsUrl: "https://maps.google.com/?q=55-Vivekanandha+Street,+Potheri,+603203",
  deliveryInfo: "Free Home Delivery (5 km Radius)",
  minOrder: 100,
  extraChargesNote: "Mayonnaise / Parcel Extra Charges",
  halalCertified: true,
  currency: "₹"
};

const CATEGORIES = [
  { 
    id: "biryani", 
    name: "Biriyani", 
    tagline: "Aromatic • Rich • Slow-Cooked",
    description: "Authentic dum biriyani cooked with aromatic spices & long-grain basmati",
    image: "assets/images/sections/biryani.webp",
    imageAlt: "Fragrant Hyderabadi chicken dum biriyani served in a dark royal metal handi with saffron and fried onions"
  },
  { 
    id: "shawarma", 
    name: "Shawarma", 
    tagline: "Freshly Grilled • Rolled & Loaded",
    description: "Fresh Arabian rotisserie chicken with signature garlic toum & pickled crispies",
    image: "assets/images/sections/shawarma.webp",
    imageAlt: "Freshly grilled Arabian chicken shawarma wraps loaded with garlic toum on dark stone platter"
  },
  { 
    id: "grill-tandoori", 
    name: "Grill & Tandoori", 
    tagline: "Charcoal Fired • Smoky & Juicy",
    description: "Charcoal grilled chicken and clay-oven tandoori kebabs roasted to perfection",
    image: "assets/images/sections/grill-tandoori.webp",
    imageAlt: "Sizzling charcoal grilled tandoori chicken and chicken tikka kebabs with mint chutney"
  },
  { 
    id: "starters", 
    name: "Starters", 
    tagline: "Crispy • Spicy • Appetizing",
    description: "Crispy, spicy appetizers in classic South Indian & Indo-Chinese varieties",
    image: "assets/images/sections/starters.webp",
    imageAlt: "Appetizing spread of crispy Chicken 65, Paneer Tikka and Chicken Lollipop starters"
  },
  { 
    id: "chinese-gravy", 
    name: "Chinese Gravy", 
    tagline: "Wok Tossed • Savory & Spicy",
    description: "Indo-Chinese gravies tossed in authentic wok flavors, garlic & soy reduction",
    image: "assets/images/sections/chinese.webp",
    imageAlt: "Glossy Indo-Chinese chicken manchurian and chilli chicken gravy in a dark ceramic wok"
  },
  { 
    id: "rice-noodles", 
    name: "Rice & Noodles", 
    tagline: "Wok Seared • Classic & Schezwan",
    description: "Wok-fried rice and Hakka noodles seasoned fresh to order",
    image: "assets/images/sections/rice-noodles.webp",
    imageAlt: "Wok-tossed Schezwan fried rice and Hakka noodles on dark slate platters"
  },
  { 
    id: "indian-breads", 
    name: "Indian Breads", 
    tagline: "Clay Oven Baked • Soft & Flaky",
    description: "Tandoori naans, rotis, lachcha parathas & soft stuffed kulchas",
    image: "assets/images/sections/indian-breads.webp",
    imageAlt: "Freshly baked tandoori butter naan, garlic naan, lachcha paratha and rumali roti"
  },
  { 
    id: "main-course", 
    name: "Main Course", 
    tagline: "Rich Gravies • Slow Simmered",
    description: "Rich North & South Indian curries, butter masalas and authentic Chettinad dishes",
    image: "assets/images/sections/main-course.webp",
    imageAlt: "Lavish Indian main course curry spread with Paneer Butter Masala and Chettinad Chicken"
  },
  { 
    id: "soups", 
    name: "Soups", 
    tagline: "Hot & Comforting • Rich Broth",
    description: "Warm, comforting hot & sour, clear, pepper and manchow soups",
    image: "assets/images/sections/soups.webp",
    imageAlt: "Piping hot chicken pepper soup and veg manchow soup in dark artisan bowls"
  }
];

const DEFAULT_MENU_ITEMS = [
  {
    id: "bir-1",
    name: "Hyderabadi Chicken Biryani",
    category: "biryani",
    subCategory: "Biriyani",
    isVeg: false,
    price: 130,
    popular: true,
    description: "Classic fragrant Hyderabadi dum biryani cooked with tender chicken and aromatic spices."
  },
  {
    id: "bir-4",
    name: "Chicken 65 Biriyani",
    category: "biryani",
    subCategory: "Biriyani",
    isVeg: false,
    price: 150,
    popular: true,
    description: "Signature dum biryani rice topped with crispy spicy Chicken 65."
  },
  {
    id: "bir-5",
    name: "Mary Crown Spl Tandoori Biriyani",
    category: "biryani",
    subCategory: "Biriyani",
    isVeg: false,
    price: 220,
    badge: "Chef Special",
    popular: true,
    description: "House special aromatic biryani served with smoky, juicy charcoal Tandoori Chicken."
  },
  {
    id: "bir-6",
    name: "Plain Biriyani",
    category: "biryani",
    subCategory: "Biriyani",
    isVeg: false,
    price: 100,
    description: "Richly flavored aromatic kuska / biryani rice cooked in seasoned broth."
  },
  {
    id: "shw-1",
    name: "Shawarma",
    category: "shawarma",
    subCategory: "Standard Shawarma",
    isVeg: false,
    hasVariants: true,
    variantType: "Roll / Plate",
    variants: [
      { name: "Roll", price: 80 },
      { name: "Plate", price: 110 }
    ],
    price: 80,
    popular: true,
    description: "Classic tender Arabian chicken with garlic toum rolled in kuboos or served on a plate."
  },
  {
    id: "shw-2",
    name: "Spicy Shawarma",
    category: "shawarma",
    subCategory: "Standard Shawarma",
    isVeg: false,
    hasVariants: true,
    variantType: "Roll / Plate",
    variants: [
      { name: "Roll", price: 90 },
      { name: "Plate", price: 130 }
    ],
    price: 90,
    description: "Zesty spicy chicken shawarma tossed in fiery pepper & chili sauce."
  },
  {
    id: "shw-3",
    name: "Mexican Shawarma",
    category: "shawarma",
    subCategory: "Standard Shawarma",
    isVeg: false,
    hasVariants: true,
    variantType: "Roll / Plate",
    variants: [
      { name: "Roll", price: 120 },
      { name: "Plate", price: 140 }
    ],
    price: 120,
    description: "Juicy chicken blended with Mexican salsa seasonings, mayo, and herbs."
  },
  {
    id: "shw-4",
    name: "Peri Peri Shawarma",
    category: "shawarma",
    subCategory: "Standard Shawarma",
    isVeg: false,
    hasVariants: true,
    variantType: "Roll / Plate",
    variants: [
      { name: "Roll", price: 120 },
      { name: "Plate", price: 140 }
    ],
    price: 120,
    popular: true,
    description: "Tossed with tangy & spicy African bird eye peri-peri spice blend."
  },
  {
    id: "shw-5",
    name: "Mint Shawarma",
    category: "shawarma",
    subCategory: "Standard Shawarma",
    isVeg: false,
    hasVariants: true,
    variantType: "Roll / Plate",
    variants: [
      { name: "Roll", price: 110 },
      { name: "Plate", price: 130 }
    ],
    price: 110,
    description: "Infused with refreshing crushed garden mint and garlic mayo."
  },
  {
    id: "shw-6",
    name: "Hot & Sweet Shawarma",
    category: "shawarma",
    subCategory: "Standard Shawarma",
    isVeg: false,
    hasVariants: true,
    variantType: "Roll / Plate",
    variants: [
      { name: "Roll", price: 140 },
      { name: "Plate", price: 160 }
    ],
    price: 140,
    description: "Sweet chili glaze combined with hot Arabian spices for the perfect balance."
  },
  {
    id: "shw-7",
    name: "Jalapeno Shawarma",
    category: "shawarma",
    subCategory: "Standard Shawarma",
    isVeg: false,
    hasVariants: true,
    variantType: "Roll / Plate",
    variants: [
      { name: "Roll", price: 130 },
      { name: "Plate", price: 150 }
    ],
    price: 130,
    description: "Loaded with tangy pickled jalapenos and succulent rotisserie chicken."
  },
  {
    id: "shw-8",
    name: "Cheesy Shawarma",
    category: "shawarma",
    subCategory: "Standard Shawarma",
    isVeg: false,
    hasVariants: true,
    variantType: "Roll / Plate",
    variants: [
      { name: "Roll", price: 140 },
      { name: "Plate", price: 160 }
    ],
    price: 140,
    popular: true,
    description: "Drizzled with molten cheese sauce and loaded with marinated chicken."
  },
  {
    id: "shw-9",
    name: "Spl. Shawarma",
    category: "shawarma",
    subCategory: "Special Shawarma",
    isVeg: false,
    hasVariants: true,
    variantType: "Roll / Plate",
    badge: "Extra Meat",
    variants: [
      { name: "Roll", price: 120 },
      { name: "Plate", price: 140 }
    ],
    price: 120,
    description: "Special loaded meat recipe with extra chicken and signature house sauces."
  },
  {
    id: "shw-10",
    name: "Spl. Spicy",
    category: "shawarma",
    subCategory: "Special Shawarma",
    isVeg: false,
    hasVariants: true,
    variantType: "Roll / Plate",
    variants: [
      { name: "Roll", price: 130 },
      { name: "Plate", price: 150 }
    ],
    price: 130,
    description: "Special extra-meat spicy edition with secret red chili blend."
  },
  {
    id: "shw-11",
    name: "Spl. Mexican",
    category: "shawarma",
    subCategory: "Special Shawarma",
    isVeg: false,
    hasVariants: true,
    variantType: "Roll / Plate",
    variants: [
      { name: "Roll", price: 140 },
      { name: "Plate", price: 160 }
    ],
    price: 140,
    description: "Special edition loaded with Mexican seasoning and diced peppers."
  },
  {
    id: "shw-12",
    name: "Spl. Peri Peri",
    category: "shawarma",
    subCategory: "Special Shawarma",
    isVeg: false,
    hasVariants: true,
    variantType: "Roll / Plate",
    variants: [
      { name: "Roll", price: 130 },
      { name: "Plate", price: 150 }
    ],
    price: 130,
    description: "Special loaded chicken drenched in fiery Peri Peri sauce."
  },
  {
    id: "shw-13",
    name: "Spl. Mint",
    category: "shawarma",
    subCategory: "Special Shawarma",
    isVeg: false,
    hasVariants: true,
    variantType: "Roll / Plate",
    variants: [
      { name: "Roll", price: 140 },
      { name: "Plate", price: 170 }
    ],
    price: 140,
    description: "Special extra chicken roll or plate with double mint-herb dressing."
  },
  {
    id: "shw-14",
    name: "Spl. Hot & Sweet",
    category: "shawarma",
    subCategory: "Special Shawarma",
    isVeg: false,
    hasVariants: true,
    variantType: "Roll / Plate",
    variants: [
      { name: "Roll", price: 170 },
      { name: "Plate", price: 190 }
    ],
    price: 170,
    description: "Special chef hot & sweet glazed shawarma in generous portion."
  },
  {
    id: "shw-15",
    name: "Spl. Jalapeno",
    category: "shawarma",
    subCategory: "Special Shawarma",
    isVeg: false,
    hasVariants: true,
    variantType: "Roll / Plate",
    variants: [
      { name: "Roll", price: 160 },
      { name: "Plate", price: 180 }
    ],
    price: 160,
    description: "Special loaded chicken with crunchy pickled jalapeno slices."
  },
  {
    id: "grl-1",
    name: "Grilled Chicken",
    category: "grill-tandoori",
    subCategory: "Grill",
    isVeg: false,
    hasVariants: true,
    variantType: "QTR / HALF / FULL",
    variants: [
      { name: "QTR", price: 129 },
      { name: "HALF", price: 220 },
      { name: "FULL", price: 400 }
    ],
    price: 129,
    popular: true,
    description: "Juicy chicken grilled over open flames with Arabian herbs, served with garlic dip."
  },
  {
    id: "grl-2",
    name: "Tandoori Chicken",
    category: "grill-tandoori",
    subCategory: "Tandoori",
    isVeg: false,
    hasVariants: true,
    variantType: "QTR / HALF / FULL",
    variants: [
      { name: "QTR", price: 129 },
      { name: "HALF", price: 220 },
      { name: "FULL", price: 400 }
    ],
    price: 129,
    popular: true,
    description: "Traditional Punjabi tandoori chicken marinated in spiced yogurt and roasted in clay oven."
  },
  {
    id: "grl-3",
    name: "Chicken Tikka",
    category: "grill-tandoori",
    subCategory: "Kebabs",
    isVeg: false,
    price: 159,
    popular: true,
    description: "Boneless chicken morsels marinated in Kashmiri chili and tandoori spices."
  },
  {
    id: "grl-4",
    name: "Malai Kebab",
    category: "grill-tandoori",
    subCategory: "Kebabs",
    isVeg: false,
    price: 179,
    description: "Melt-in-mouth chicken kebabs marinated in rich cream, cheese, and mild spices."
  },
  {
    id: "grl-5",
    name: "Tangdi Kebab",
    category: "grill-tandoori",
    subCategory: "Kebabs",
    isVeg: false,
    price: 179,
    description: "Succulent chicken drumsticks marinated in rich tandoori spices and roasted to perfection."
  },
  {
    id: "grl-6",
    name: "Kali Mirch Kebab",
    category: "grill-tandoori",
    subCategory: "Kebabs",
    isVeg: false,
    price: 179,
    description: "Tender chicken pieces coated in freshly crushed black pepper and cashew paste."
  },
  {
    id: "grl-7",
    name: "Reshmi Kebeb",
    category: "grill-tandoori",
    subCategory: "Kebabs",
    isVeg: false,
    price: 179,
    description: "Silky texture chicken kebab flavored with saffron and mild aromatic spices."
  },
  {
    id: "grl-8",
    name: "Achari Kebab",
    category: "grill-tandoori",
    subCategory: "Kebabs",
    isVeg: false,
    price: 179,
    description: "Tangy pickled masala infused boneless chicken char-grilled in tandoor."
  },
  {
    id: "grl-9",
    name: "Hariyali Kebab",
    category: "grill-tandoori",
    subCategory: "Kebabs",
    isVeg: false,
    price: 179,
    description: "Fresh coriander, mint, spinach, and green chili marinated chicken grilled till tender."
  },
  {
    id: "grl-10",
    name: "Mixed Kebab",
    category: "grill-tandoori",
    subCategory: "Kebabs",
    isVeg: false,
    price: 259,
    badge: "Platter",
    description: "An assorted platter of our chef finest tandoori kebab selections."
  },
  { id: "str-v-1", name: "Gobi 65", category: "starters", subCategory: "Veg Starters", isVeg: true, price: 115, popular: true, description: "Crisp fried cauliflower florets tossed with curry leaves, chili, and spices." },
  { id: "str-v-2", name: "Paneer 65", category: "starters", subCategory: "Veg Starters", isVeg: true, price: 135, popular: true, description: "Fresh cottage cheese cubes batter-fried and tossed in South Indian 65 seasoning." },
  { id: "str-v-3", name: "Mushroom 65", category: "starters", subCategory: "Veg Starters", isVeg: true, price: 125, description: "Golden fried button mushrooms tossed in spicy aromatic herbs." },
  { id: "str-v-4", name: "BabyCorn 65", category: "starters", subCategory: "Veg Starters", isVeg: true, price: 120, description: "Tender baby corn spears fried crisp and spiced with curry leaves." },
  { id: "str-v-5", name: "Paneer Pepper Fry", category: "starters", subCategory: "Veg Starters", isVeg: true, price: 145, description: "Diced paneer sautéed with freshly cracked black pepper and onions." },
  { id: "str-v-6", name: "Mushroom Pepper Fry", category: "starters", subCategory: "Veg Starters", isVeg: true, price: 155, description: "Juicy mushrooms wok-tossed with pungent pepper and curry leaves." },
  { id: "str-v-7", name: "Babycorn Pepper Fry", category: "starters", subCategory: "Veg Starters", isVeg: true, price: 150, description: "Crunchy baby corn tossed with black pepper masala." },
  { id: "str-v-8", name: "Aloo Pepper Fry", category: "starters", subCategory: "Veg Starters", isVeg: true, price: 150, description: "Crispy fried potatoes wok-tossed in spicy South Indian pepper seasoning." },
  { id: "str-v-9", name: "Chilli Gobi", category: "starters", subCategory: "Veg Starters", isVeg: true, price: 145, description: "Crisp cauliflower florets tossed with capsicum, onion, and Chinese chili sauce." },
  { id: "str-v-10", name: "Chilli Mushroom", category: "starters", subCategory: "Veg Starters", isVeg: true, price: 165, description: "Stir-fried mushrooms in a fiery Indo-Chinese soy-chili reduction." },
  { id: "str-v-11", name: "Chilli Paneer", category: "starters", subCategory: "Veg Starters", isVeg: true, price: 165, popular: true, description: "Crisp paneer cubes sautéed with green chilies, bell peppers, and soy sauce." },
  { id: "str-v-12", name: "Gobi Manchurian", category: "starters", subCategory: "Veg Starters", isVeg: true, price: 140, description: "Classic crispy gobi tossed in ginger, garlic, and tangy Manchurian glaze." },
  { id: "str-v-13", name: "Paneer Manchurian", category: "starters", subCategory: "Veg Starters", isVeg: true, price: 150, description: "Soft cottage cheese dumplings tossed with aromatic scallions and Manchurian sauce." },
  { id: "str-v-14", name: "Mushroom Manchurian", category: "starters", subCategory: "Veg Starters", isVeg: true, price: 165, description: "Golden fried mushrooms coated in savory Indo-Chinese Manchurian sauce." },
  { id: "str-v-15", name: "Honey Chilli Potato", category: "starters", subCategory: "Veg Starters", isVeg: true, price: 170, popular: true, description: "Crisp fried potato fingers glazed with sweet honey, chili sauce, and sesame seeds." },
  { id: "str-v-16", name: "Paneer Tikka", category: "starters", subCategory: "Veg Starters", isVeg: true, price: 170, description: "Charcoal grilled paneer cubes marinated in yogurt and tandoori spices." },
  { id: "str-nv-1", name: "Chicken 65", category: "starters", subCategory: "Non-Veg Starters", isVeg: false, price: 120, popular: true, badge: "Top Starter", description: "All-time favorite Chennai-style deep-fried spicy chicken with crispy curry leaves." },
  { id: "str-nv-3", name: "Fish Finger", category: "starters", subCategory: "Non-Veg Starters", isVeg: false, price: 170, description: "Crumb-coated delicate fish strips fried crisp, served with dipping sauce." },
  { id: "str-nv-4", name: "Chicken Lollipop", category: "starters", subCategory: "Non-Veg Starters", isVeg: false, price: 140, popular: true, description: "Frenched chicken winglets marinated and deep-fried to crispy perfection." },
  { id: "str-nv-5", name: "Chicken Lollipop Saucy", category: "starters", subCategory: "Non-Veg Starters", isVeg: false, price: 165, description: "Crispy chicken lollipops generously tossed in fiery sweet & spicy sauce." },
  { id: "str-nv-6", name: "Dragon Chicken", category: "starters", subCategory: "Non-Veg Starters", isVeg: false, price: 160, popular: true, description: "Crispy chicken strips tossed with red chilies, cashews, and fiery dragon sauce." },
  { id: "str-nv-7", name: "Chicken Pepper Fry", category: "starters", subCategory: "Non-Veg Starters", isVeg: false, price: 165, description: "Tender chicken pieces pan-roasted with freshly crushed Tellicherry black pepper." },
  { id: "str-nv-9", name: "Chiili Chicken", category: "starters", subCategory: "Non-Veg Starters", isVeg: false, price: 160, popular: true, description: "Classic Indo-Chinese dry chili chicken tossed with capsicum, garlic, and green chilies." },
  { id: "str-nv-11", name: "Chicken Manchurian", category: "starters", subCategory: "Non-Veg Starters", isVeg: false, price: 170, description: "Fried chicken bites tossed with ginger, garlic, cilantro, and savory soya glaze." },
  { id: "str-nv-13", name: "Chicken Drumstick", category: "starters", subCategory: "Non-Veg Starters", isVeg: false, price: 165, description: "Spiced marinated chicken drumsticks fried to golden crispy brown." },
  { id: "str-nv-14", name: "Garlic Chicken", category: "starters", subCategory: "Non-Veg Starters", isVeg: false, price: 170, description: "Pan-fried chicken tossed with heaps of aromatic roasted garlic and scallions." },
  { id: "str-nv-16", name: "Honey Chilli Chicken", category: "starters", subCategory: "Non-Veg Starters", isVeg: false, price: 170, description: "Crispy chicken tossed in sweet natural honey and spicy red chili glaze." },
  { id: "cgr-v-1", name: "Gobi Manchurian", category: "chinese-gravy", subCategory: "Veg Chinese Gravy", isVeg: true, price: 150, description: "Cauliflower florets in a rich, tangy ginger-garlic Indo-Chinese gravy." },
  { id: "cgr-v-2", name: "Paneer Manchurian", category: "chinese-gravy", subCategory: "Veg Chinese Gravy", isVeg: true, price: 170, description: "Soft paneer cubes simmered in savory Manchurian sauce." },
  { id: "cgr-v-3", name: "Mushroom Manchurian", category: "chinese-gravy", subCategory: "Veg Chinese Gravy", isVeg: true, price: 170, description: "Fresh button mushrooms cooked in thick Manchurian gravy." },
  { id: "cgr-v-4", name: "Chilli Paneer", category: "chinese-gravy", subCategory: "Veg Chinese Gravy", isVeg: true, price: 160, description: "Paneer cubes and capsicum in spicy soy chili gravy, perfect with fried rice." },
  { id: "cgr-v-5", name: "Chilli Mushroom", category: "chinese-gravy", subCategory: "Veg Chinese Gravy", isVeg: true, price: 160, description: "Mushrooms in a flavorful, spicy garlic-chili gravy." },
  { id: "cgr-v-6", name: "Chilli Gobi", category: "chinese-gravy", subCategory: "Veg Chinese Gravy", isVeg: true, price: 150, description: "Crispy gobi in hot chili and soya gravy." },
  { id: "cgr-nv-1", name: "Chilli Chicken Gravy", category: "chinese-gravy", subCategory: "Non-Veg Chinese Gravy", isVeg: false, price: 150, popular: true, description: "Tender chicken cooked with green chilies, peppers, and savory soy gravy." },
  { id: "cgr-nv-2", name: "Chicken Manchurian Gravy", category: "chinese-gravy", subCategory: "Non-Veg Chinese Gravy", isVeg: false, price: 150, description: "Fried chicken bites in classic ginger-garlic and coriander Manchurian gravy." },
  { id: "cgr-nv-3", name: "Garlic Chicken Gravy", category: "chinese-gravy", subCategory: "Non-Veg Chinese Gravy", isVeg: false, price: 160, description: "Chicken cooked in a rich, deeply aromatic roasted garlic gravy." },
  {
    id: "rn-v-1",
    name: "Vegetable",
    category: "rice-noodles",
    subCategory: "Veg Rice & Noodles",
    isVeg: true,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 110 },
      { name: "Noodles", price: 120 }
    ],
    price: 110,
    description: "Classic wok-tossed rice or noodles with crisp seasonal vegetables."
  },
  {
    id: "rn-v-2",
    name: "Paneer",
    category: "rice-noodles",
    subCategory: "Veg Rice & Noodles",
    isVeg: true,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 145 },
      { name: "Noodles", price: 155 }
    ],
    price: 145,
    description: "Fluffy basmati rice or noodles tossed with soft paneer cubes and veggies."
  },
  {
    id: "rn-v-3",
    name: "Mushroom",
    category: "rice-noodles",
    subCategory: "Veg Rice & Noodles",
    isVeg: true,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 130 },
      { name: "Noodles", price: 140 }
    ],
    price: 130,
    description: "Wok-fried rice or noodles with fresh button mushrooms and scallions."
  },
  {
    id: "rn-v-4",
    name: "Gobi",
    category: "rice-noodles",
    subCategory: "Veg Rice & Noodles",
    isVeg: true,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 130 },
      { name: "Noodles", price: 140 }
    ],
    price: 130,
    description: "Tossed with crisp spiced cauliflower florets and fresh vegetables."
  },
  {
    id: "rn-v-5",
    name: "Veg Schezwan",
    category: "rice-noodles",
    subCategory: "Veg Rice & Noodles",
    isVeg: true,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 150 },
      { name: "Noodles", price: 160 }
    ],
    price: 150,
    description: "Wok-fried in hot & spicy in-house Schezwan chili paste."
  },
  {
    id: "rn-v-6",
    name: "Paneer Schezwan",
    category: "rice-noodles",
    subCategory: "Veg Rice & Noodles",
    isVeg: true,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 155 },
      { name: "Noodles", price: 165 }
    ],
    price: 155,
    description: "Paneer and fresh vegetables tossed in fiery Schezwan sauce."
  },
  {
    id: "rn-v-7",
    name: "Mushroom Schezwan",
    category: "rice-noodles",
    subCategory: "Veg Rice & Noodles",
    isVeg: true,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 140 },
      { name: "Noodles", price: 150 }
    ],
    price: 140,
    description: "Spicy Schezwan rice or noodles loaded with sautéed mushrooms."
  },
  {
    id: "rn-v-8",
    name: "Gobi Schezwan",
    category: "rice-noodles",
    subCategory: "Veg Rice & Noodles",
    isVeg: true,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 140 },
      { name: "Noodles", price: 150 }
    ],
    price: 140,
    description: "Zesty Schezwan flavored rice or noodles with crisp gobi florets."
  },
  {
    id: "rn-v-9",
    name: "Shangai Veg",
    category: "rice-noodles",
    subCategory: "Veg Rice & Noodles",
    isVeg: true,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 180 },
      { name: "Noodles", price: 190 }
    ],
    price: 180,
    description: "Shanghai-style mild soy and garlic infused wok-fried rice or noodles."
  },
  {
    id: "rn-v-10",
    name: "Singapore Veg",
    category: "rice-noodles",
    subCategory: "Veg Rice & Noodles",
    isVeg: true,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 185 },
      { name: "Noodles", price: 195 }
    ],
    price: 185,
    description: "Aromatic curry-spiced Singapore-style fried rice or noodles."
  },
  {
    id: "rn-v-11",
    name: "Mixed veg",
    category: "rice-noodles",
    subCategory: "Veg Rice & Noodles",
    isVeg: true,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 180 },
      { name: "Noodles", price: 190 }
    ],
    price: 180,
    description: "Combination of paneer, mushroom, baby corn, and fresh garden vegetables."
  },
  {
    id: "rn-nv-1",
    name: "Chicken",
    category: "rice-noodles",
    subCategory: "Non-Veg Rice & Noodles",
    isVeg: false,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 120 },
      { name: "Noodles", price: 130 }
    ],
    price: 120,
    popular: true,
    description: "Tender shredded chicken wok-tossed with egg, vegetables, and seasoned rice or noodles."
  },
  {
    id: "rn-nv-4",
    name: "Egg",
    category: "rice-noodles",
    subCategory: "Non-Veg Rice & Noodles",
    isVeg: false,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 110 },
      { name: "Noodles", price: 100 }
    ],
    price: 110,
    description: "Scrambled eggs wok-tossed with spring onions, pepper, and rice or noodles."
  },
  {
    id: "rn-nv-5",
    name: "Chicken Schezwan",
    category: "rice-noodles",
    subCategory: "Non-Veg Rice & Noodles",
    isVeg: false,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 130 },
      { name: "Noodles", price: 140 }
    ],
    price: 130,
    popular: true,
    description: "Fiery Schezwan style chicken and egg fried rice or noodles."
  },
  {
    id: "rn-nv-8",
    name: "Egg Schezwan",
    category: "rice-noodles",
    subCategory: "Non-Veg Rice & Noodles",
    isVeg: false,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 125 },
      { name: "Noodles", price: 140 }
    ],
    price: 125,
    description: "Fluffy scrambled egg tossed in fiery Schezwan paste."
  },
  {
    id: "rn-nv-9",
    name: "Shangai Chicken",
    category: "rice-noodles",
    subCategory: "Non-Veg Rice & Noodles",
    isVeg: false,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 160 },
      { name: "Noodles", price: 180 }
    ],
    price: 160,
    description: "Shanghai chicken wok-tossed with delicate Chinese seasonings."
  },
  {
    id: "rn-nv-10",
    name: "Singapore Chicken",
    category: "rice-noodles",
    subCategory: "Non-Veg Rice & Noodles",
    isVeg: false,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 170 },
      { name: "Noodles", price: 180 }
    ],
    price: 170,
    description: "Singapore curry-spiced chicken, egg, and vegetables."
  },
  {
    id: "rn-nv-12",
    name: "Dragon Chicken",
    category: "rice-noodles",
    subCategory: "Non-Veg Rice & Noodles",
    isVeg: false,
    hasVariants: true,
    variantType: "RICE / NOODLES",
    variants: [
      { name: "Rice", price: 190 },
      { name: "Noodles", price: 210 }
    ],
    price: 190,
    description: "Fiery crispy dragon chicken pieces tossed with flavorful wok rice or noodles."
  },
  { id: "brd-1", name: "Naan", category: "indian-breads", isVeg: true, price: 40, description: "Classic clay-oven baked soft refined wheat flatbread." },
  { id: "brd-2", name: "Butter Naan", category: "indian-breads", isVeg: true, price: 50, popular: true, description: "Freshly baked tandoori naan brushed generously with pure butter." },
  { id: "brd-3", name: "Garlic Naan", category: "indian-breads", isVeg: true, price: 55, popular: true, description: "Tandoori naan topped with roasted minced garlic and fresh coriander." },
  { id: "brd-4", name: "Cheese Naan", category: "indian-breads", isVeg: true, price: 65, description: "Oven-baked naan stuffed or topped with melted gooey cheese." },
  { id: "brd-5", name: "Pudina Naan", category: "indian-breads", isVeg: true, price: 55, description: "Tandoori naan infused with refreshing dried mint flakes." },
  { id: "brd-6", name: "Kashmiri Naan", category: "indian-breads", isVeg: true, price: 100, description: "Sweet royal naan stuffed with nuts, raisins, and dried fruits." },
  { id: "brd-7", name: "Stuffed Aloo Naan", category: "indian-breads", isVeg: true, price: 80, description: "Fluffy naan stuffed with seasoned mashed spiced potatoes." },
  { id: "brd-8", name: "Stuffed Paneer Naan", category: "indian-breads", isVeg: true, price: 100, description: "Clay-oven baked naan stuffed with spiced cottage cheese." },
  { id: "brd-9", name: "Stuffed Chicken Naan", category: "indian-breads", isVeg: false, price: 100, description: "Oven-baked naan filled with succulent spiced minced chicken." },
  { id: "brd-10", name: "Lachcha Paratha", category: "indian-breads", isVeg: true, price: 80, description: "Multi-layered flaky crispy whole wheat bread baked in tandoor." },
  { id: "brd-11", name: "Rumali Roti", category: "indian-breads", isVeg: true, price: 60, popular: true, description: "Ultra-thin, handkerchief-soft Mughlai flatbread made on dome griddle." },
  { id: "brd-12", name: "Veg Kulcha", category: "indian-breads", isVeg: true, price: 65, description: "Soft tandoor bread stuffed with seasoned mixed vegetables." },
  { id: "brd-13", name: "Paneer Kulcha", category: "indian-breads", isVeg: true, price: 85, description: "Amritsari style kulcha stuffed with spiced paneer and herbs." },
  { id: "brd-14", name: "Chicken Kulcha", category: "indian-breads", isVeg: false, price: 85, description: "Tandoori flatbread stuffed with spiced chicken kheema." },
  { id: "brd-15", name: "Roti", category: "indian-breads", isVeg: true, price: 25, description: "Traditional clay-oven roasted whole wheat tandoori roti." },
  { id: "brd-16", name: "Butter Roti", category: "indian-breads", isVeg: true, price: 35, description: "Tandoori whole wheat roti brushed with fresh butter." },
  { id: "brd-17", name: "Fulka", category: "indian-breads", isVeg: true, price: 30, description: "Soft, light, puffed whole wheat chapati cooked on open flame." },
  { id: "brd-18", name: "Aloo Paratha", category: "indian-breads", isVeg: true, price: 69, description: "Pan-roasted paratha stuffed with spiced potato mash." },
  { id: "brd-19", name: "Paneer Paratha", category: "indian-breads", isVeg: true, price: 85, description: "Tawa paratha generously stuffed with spiced paneer." },
  { id: "brd-20", name: "Pudina Paratha", category: "indian-breads", isVeg: true, price: 60, description: "Layered paratha scented with dried mint leaves." },
  { id: "brd-21", name: "Tandoori Paratha", category: "indian-breads", isVeg: true, price: 75, description: "Crispy flaky whole wheat paratha baked in the clay tandoor." },
  { id: "mc-v-1", name: "Aloo Mutter", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 119, description: "Potatoes and tender green peas simmered in a spiced onion-tomato curry." },
  { id: "mc-v-2", name: "Aloo Gobi Masala", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 129, description: "Classic homestyle potatoes and cauliflower tossed in aromatic Indian spices." },
  { id: "mc-v-3", name: "Dum Aloo", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 169, description: "Baby potatoes slow-cooked in a rich, velvety Kashmiri yogurt gravy." },
  { id: "mc-v-4", name: "Paneer Butter Masala", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 149, popular: true, description: "Cottage cheese cubes in a creamy, buttery tomato-cashew makhani gravy." },
  { id: "mc-v-5", name: "Paneer Chettinad", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 169, description: "Paneer simmered in robust Chettinad spices, black pepper, and roasted coconut." },
  { id: "mc-v-6", name: "Paneer Tikka Masala", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 169, popular: true, description: "Charcoal-grilled paneer tikka chunks simmered in a rich spiced gravy." },
  { id: "mc-v-7", name: "Kadai Paneer", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 139, description: "Paneer and crunchy bell peppers tossed with freshly pounded kadai spices." },
  { id: "mc-v-8", name: "Mutter Paneer", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 159, description: "Paneer cubes and green peas in a mildly spiced comforting tomato gravy." },
  { id: "mc-v-9", name: "Shahi Paneer", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 159, description: "Royal Mughlai preparation of paneer in a fragrant white cashew and cream sauce." },
  { id: "mc-v-10", name: "Palak Paneer", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 139, description: "Fresh paneer cooked in a smooth, spiced puree of organic spinach." },
  { id: "mc-v-11", name: "Mushroom Masala", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 149, description: "Fresh button mushrooms cooked in a flavorful onion-tomato masala." },
  { id: "mc-v-12", name: "Mushroom Chettinad", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 139, description: "Spicy South Indian Chettinad mushroom curry with freshly ground pepper." },
  { id: "mc-v-13", name: "Kadai Mushroom", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 149, description: "Mushrooms sautéed with bell peppers in spicy coriander and chili kadai masala." },
  { id: "mc-v-14", name: "Dal Tadka", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 149, popular: true, description: "Yellow lentils tempered with ghee, cumin seeds, garlic, and dried red chilies." },
  { id: "mc-v-15", name: "Dal Makhani", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 149, description: "Slow-cooked black lentils and kidney beans simmered overnight with butter and cream." },
  { id: "mc-v-16", name: "Dal Fry", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 159, description: "Hearty cooked lentils pan-fried with onions, tomatoes, ginger, and green chilies." },
  { id: "mc-v-17", name: "Green Peas Masala", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 149, description: "Tender green peas cooked in a rich, mildly spiced gravy." },
  { id: "mc-v-18", name: "Mixed Veg Curry", category: "main-course", subCategory: "Veg Main Course", isVeg: true, price: 169, description: "Assortment of fresh garden vegetables simmered in an aromatic curry." },
  { id: "mc-nv-1", name: "Egg Masala", category: "main-course", subCategory: "Non-Veg Main Course", isVeg: false, price: 119, description: "Boiled eggs simmered in a spiced onion, tomato, and coriander gravy." },
  { id: "mc-nv-2", name: "Egg Keema Masala", category: "main-course", subCategory: "Non-Veg Main Course", isVeg: false, price: 129, description: "Grated and minced eggs cooked in a savory, robust masala sauce." },
  { id: "mc-nv-3", name: "Chicken Masala", category: "main-course", subCategory: "Non-Veg Main Course", isVeg: false, price: 136, popular: true, description: "Tender chicken pieces cooked in a traditional homestyle spiced gravy." },
  { id: "mc-nv-4", name: "Chettinad Chicken Masala", category: "main-course", subCategory: "Non-Veg Main Course", isVeg: false, price: 159, popular: true, description: "Spicy Tamil Nadu style chicken cooked with roasted spices and black pepper." },
  { id: "mc-nv-5", name: "Kerala Chicken Masala", category: "main-course", subCategory: "Non-Veg Main Course", isVeg: false, price: 169, description: "Chicken cooked in a coconut-infused Malabar style curry tempered with curry leaves." },
  { id: "mc-nv-6", name: "Chicken Mughalai", category: "main-course", subCategory: "Non-Veg Main Course", isVeg: false, price: 179, description: "Rich royal chicken curry prepared with nuts, egg ribbon, and mild spices." },
  { id: "mc-nv-7", name: "Pepper Chicken Masala", category: "main-course", subCategory: "Non-Veg Main Course", isVeg: false, price: 159, description: "Tender chicken coated in intense black pepper and caramelized onion gravy." },
  { id: "mc-nv-8", name: "Kadai Chicken Masala", category: "main-course", subCategory: "Non-Veg Main Course", isVeg: false, price: 189, description: "Chicken and capsicum tossed with freshly roasted coriander and red chilies." },
  { id: "mc-nv-9", name: "Punjabi Chicken Masala", category: "main-course", subCategory: "Non-Veg Main Course", isVeg: false, price: 189, description: "Rustic North Indian dhaba style chicken curry with bold spices." },
  { id: "mc-nv-10", name: "Hyderabadi Chicken Masala", category: "main-course", subCategory: "Non-Veg Main Course", isVeg: false, price: 169, description: "Spicy Hyderabadi specialty chicken curry with mint, coriander, and yogurt." },
  { id: "mc-nv-11", name: "Chicken Dopiyaza", category: "main-course", subCategory: "Non-Veg Main Course", isVeg: false, price: 189, description: "Chicken simmered with double the quantity of caramelized and sautéed onions." },
  { id: "mc-nv-12", name: "Chicken Tikka Masala", category: "main-course", subCategory: "Non-Veg Main Course", isVeg: false, price: 179, popular: true, description: "Smoky tandoori chicken tikka pieces in a rich, creamy tomato gravy." },
  { id: "mc-nv-13", name: "Butter Chicken Masala", category: "main-course", subCategory: "Non-Veg Main Course", isVeg: false, price: 179, popular: true, description: "Juicy chicken in a silky, mildly sweet buttery makhani sauce with kasuri methi." },
  { id: "mc-nv-14", name: "Malabar Chicken Masala", category: "main-course", subCategory: "Non-Veg Main Course", isVeg: false, price: 169, description: "Authentic coastal Kerala chicken curry enriched with coconut milk." },
  { id: "soup-v-1", name: "Tomato Soup", category: "soups", subCategory: "Veg Soups", isVeg: true, price: 70, description: "Silky ripe tomato soup with butter, herbs, and crispy croutons." },
  { id: "soup-v-2", name: "Veg Clear Soup", category: "soups", subCategory: "Veg Soups", isVeg: true, price: 55, description: "Light, nourishing broth loaded with diced garden vegetables." },
  { id: "soup-v-3", name: "Veg Hot and Sour Soup", category: "soups", subCategory: "Veg Soups", isVeg: true, price: 80, description: "Tangy and spicy Indo-Chinese soup with shredded veggies and mushrooms." },
  { id: "soup-v-4", name: "Veg Manchow Soup", category: "soups", subCategory: "Veg Soups", isVeg: true, price: 80, popular: true, description: "Savory garlic-infused Chinese soup served with crispy fried noodles." },
  { id: "soup-v-5", name: "Sweet Corn Soup", category: "soups", subCategory: "Veg Soups", isVeg: true, price: 90, description: "Comforting creamy soup with sweet American corn kernels and vegetables." },
  { id: "soup-v-6", name: "Mushroom Soup", category: "soups", subCategory: "Veg Soups", isVeg: true, price: 90, description: "Warm, earthy broth prepared with fresh sliced button mushrooms." },
  { id: "soup-nv-1", name: "Chicken Clear Soup", category: "soups", subCategory: "Non-Veg Soups", isVeg: false, price: 80, description: "Delicate and wholesome simmered chicken broth with shredded chicken." },
  { id: "soup-nv-2", name: "Chicken Hot and Sour Soup", category: "soups", subCategory: "Non-Veg Soups", isVeg: false, price: 100, popular: true, description: "Spicy and tangy dark chicken broth with egg ribbons and vegetables." },
  { id: "soup-nv-3", name: "Chicken Pepper Soup", category: "soups", subCategory: "Non-Veg Soups", isVeg: false, price: 120, popular: true, description: "Traditional hot chicken soup infused with freshly crushed black pepper." },
  { id: "soup-nv-4", name: "Sweet Corn Chicken Soup", category: "soups", subCategory: "Non-Veg Soups", isVeg: false, price: 125, description: "Rich sweet corn broth with tender minced chicken and egg drops." },
  { id: "soup-nv-5", name: "Chicken Manchow Soup", category: "soups", subCategory: "Non-Veg Soups", isVeg: false, price: 125, popular: true, description: "Hearty spicy chicken soup topped with golden crispy fried noodles." }
];

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
