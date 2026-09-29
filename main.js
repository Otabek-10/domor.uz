let products = [
  {
    id: 1,
    name: "Avto Organizer",
    category: "Avto",
    price: 89000,
    icon: "🚗",
    description:
      "Avtomobil salonini tartibli va qulay saqlash uchun zamonaviy organizer.",
    badge: "Yangi",
  },

  {
    id: 2,
    name: "Aroma Diffuser",
    category: "Uy",
    price: 129000,
    icon: "◌",
    description:
      "Xonangizga yoqimli hid va sokin atmosfera beruvchi ixcham diffuser.",
    badge: "Top",
  },

  {
    id: 3,
    name: "Smart Lunch Box",
    category: "Idishlar",
    price: 99000,
    icon: "🥡",
    description:
      "Ovqatni qulay olib yurish uchun zamonaviy va ixcham lunch box.",
    badge: "Tanlov",
  },

  {
    id: 4,
    name: "Night Lamp",
    category: "Uy",
    price: 149000,
    icon: "◐",
    description:
      "Yotoqxona va ish stoli uchun yumshoq yorug‘lik beruvchi lampa.",
    badge: "Yangi",
  },

  {
    id: 5,
    name: "Kids Creative Set",
    category: "Bolalar",
    price: 79000,
    icon: "🧸",
    description:
      "Bolalar ijodkorligini rivojlantirish uchun rang-barang kreativ to‘plam.",
    badge: "Kids",
  },

  {
    id: 6,
    name: "Gift Box Premium",
    category: "Sovg'alar",
    price: 179000,
    icon: "🎁",
    description:
      "Yaqinlaringiz uchun chiroyli va tayyor premium sovg‘a to‘plami.",
    badge: "Premium",
  },

  {
    id: 7,
    name: "Travel Mug",
    category: "Idishlar",
    price: 119000,
    icon: "☕",
    description:
      "Issiq ichimliklarni yo‘lda olib yurish uchun qulay termo krujka.",
    badge: "Top",
  },

  {
    id: 8,
    name: "Car Phone Holder",
    category: "Avto",
    price: 69000,
    icon: "📱",
    description:
      "Telefonni avtomobilda xavfsiz va qulay ushlab turuvchi holder.",
    badge: "Top",
  },
];

// ==============================
// O'ZGARUVCHILAR
// ==============================

let currentCategory = "Barchasi";

let cart = [];

let selectedProduct = null;

let selectedQuantity = 1;

// ==============================
// ELEMENTLAR
// ==============================

let productsGrid = document.getElementById("productsGrid");

let resultCount = document.getElementById("resultCount");

let tabs = document.querySelectorAll(".tab");

// MUHIM:
// Bu yerda cart emas, cartElement ishlatamiz
let cartElement = document.getElementById("cart");

let overlay = document.getElementById("overlay");

let cartProducts = document.getElementById("cartProducts");

let emptyCart = document.getElementById("emptyCart");

let cartCount = document.getElementById("cartCount");

let totalPrice = document.getElementById("totalPrice");

let productModal = document.getElementById("productModal");

let toast = document.getElementById("toast");

// ==============================
// PUL FORMAT
// ==============================

function money(number) {
  return new Intl.NumberFormat("uz-UZ").format(number) + " so‘m";
}

// ==============================
// MAHSULOTLARNI CHIQARISH
// ==============================

function renderProducts() {
  let filteredProducts;

  if (currentCategory === "Barchasi") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(function (product) {
      return product.category === currentCategory;
    });
  }

  resultCount.innerText = filteredProducts.length + " ta mahsulot";

  productsGrid.innerHTML = "";

  filteredProducts.forEach(function (product) {
    productsGrid.innerHTML += `
            <div class="product-card">

                <div class="product-image">

                    <span class="badge">
                        ${product.badge}
                    </span>

                    <span class="product-icon">
                        ${product.icon}
                    </span>

                </div>


                <div class="product-info">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.description}
                    </p>


                    <div class="product-bottom">

                        <span class="price">
                            ${money(product.price)}
                        </span>

                        <button
                            class="add-button"
                            onclick="openProduct(${product.id})"
                        >
                            +
                        </button>

                    </div>

                </div>

            </div>
        `;
  });
}

// ==============================
// TAB
// ==============================

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    tabs.forEach(function (item) {
      item.classList.remove("active");
    });

    tab.classList.add("active");

    currentCategory = tab.dataset.category;

    renderProducts();
  });
});

// ==============================
// PRODUCT MODAL
// ==============================

function openProduct(id) {
  selectedProduct = products.find(function (product) {
    return product.id === id;
  });

  if (!selectedProduct) return;

  selectedQuantity = 1;

  document.getElementById("modalImage").innerText = selectedProduct.icon;

  document.getElementById("modalCategory").innerText = selectedProduct.category;

  document.getElementById("modalName").innerText = selectedProduct.name;

  document.getElementById("modalDescription").innerText =
    selectedProduct.description;

  document.getElementById("modalPrice").innerText = money(
    selectedProduct.price,
  );

  document.getElementById("quantity").innerText = 1;

  document.getElementById("modalTotal").innerText = money(
    selectedProduct.price,
  );

  productModal.classList.add("show");

  overlay.classList.add("show");
}

// ==============================
// MODALNI YOPISH
// ==============================

document.getElementById("closeModal").addEventListener("click", function () {
  productModal.classList.remove("show");

  if (!cartElement.classList.contains("open")) {
    overlay.classList.remove("show");
  }
});

// ==============================
// MINUS
// ==============================

document.getElementById("minus").addEventListener("click", function () {
  if (selectedQuantity > 1) {
    selectedQuantity--;

    updateQuantity();
  }
});

// ==============================
// PLUS
// ==============================

document.getElementById("plus").addEventListener("click", function () {
  selectedQuantity++;

  updateQuantity();
});

// ==============================
// QUANTITY
// ==============================

function updateQuantity() {
  document.getElementById("quantity").innerText = selectedQuantity;

  document.getElementById("modalTotal").innerText = money(
    selectedProduct.price * selectedQuantity,
  );
}

// ==============================
// MODALDAN SAVATGA
// ==============================

document.getElementById("addToCart").addEventListener("click", function () {
  if (!selectedProduct) return;

  addToCart(selectedProduct.id, selectedQuantity);

  productModal.classList.remove("show");

  overlay.classList.remove("show");

  showToast();
});

// ==============================
// SAVATGA QO'SHISH
// ==============================

function addToCart(id, quantity) {
  let existing = cart.find(function (item) {
    return item.id === id;
  });

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: id,
      quantity: quantity,
    });
  }

  renderCart();
}

// ==============================
// SAVAT
// ==============================

function renderCart() {
  let totalItems = 0;

  let total = 0;

  cartProducts.innerHTML = "";

  cart.forEach(function (item) {
    let product = products.find(function (product) {
      return product.id === item.id;
    });

    if (!product) return;

    totalItems += item.quantity;

    total += product.price * item.quantity;

    cartProducts.innerHTML += `
            <div class="cart-item">

                <div class="cart-item-image">
                    ${product.icon}
                </div>


                <div>

                    <h4>
                        ${product.name}
                    </h4>

                    <small>
                        ${money(product.price)} / dona
                    </small>


                    <div class="cart-quantity">

                        <button
                            onclick="changeQuantity(${product.id}, -1)"
                        >
                            −
                        </button>

                        <b>
                            ${item.quantity}
                        </b>

                        <button
                            onclick="changeQuantity(${product.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>


                <span class="cart-price">
                    ${money(product.price * item.quantity)}
                </span>

            </div>
        `;
  });

  cartCount.innerText = totalItems;

  totalPrice.innerText = money(total);

  if (cart.length === 0) {
    emptyCart.style.display = "grid";
  } else {
    emptyCart.style.display = "none";
  }
}

// ==============================
// SAVAT SONINI O'ZGARTIRISH
// ==============================

function changeQuantity(id, amount) {
  let item = cart.find(function (item) {
    return item.id === id;
  });

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(function (item) {
      return item.id !== id;
    });
  }

  renderCart();
}

// ==============================
// SAVATNI OCHISH
// ==============================

document.getElementById("openCart").addEventListener("click", function () {
  cartElement.classList.add("open");

  overlay.classList.add("show");
});

// ==============================
// SAVATNI YOPISH
// ==============================

document.getElementById("closeCart").addEventListener("click", function () {
  cartElement.classList.remove("open");

  overlay.classList.remove("show");
});

// ==============================
// OVERLAY
// ==============================

overlay.addEventListener("click", function () {
  cartElement.classList.remove("open");

  productModal.classList.remove("show");

  overlay.classList.remove("show");
});

// ==============================
// TOAST
// ==============================

function showToast() {
  toast.classList.add("show");

  setTimeout(function () {
    toast.classList.remove("show");
  }, 2200);
}

// ==============================
// BOSHLANG'ICH
// ==============================

renderProducts();

renderCart();
