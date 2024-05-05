const products = [
  {
    name: "Sony Playstation 5",
    url: "images/playstation_5.png",
    type: "games",
    price: 499.99,
  },
  {
    name: "Samsung Galaxy",
    url: "images/samsung_galaxy.png",
    type: "smartphones",
    price: 399.99,
  },
  {
    name: "Cannon EOS Camera",
    url: "images/cannon_eos_camera.png",
    type: "cameras",
    price: 749.99,
  },
  {
    name: "Sony A7 Camera",
    url: "images/sony_a7_camera.png",
    type: "cameras",
    price: 1999.99,
  },
  {
    name: "LG TV",
    url: "images/lg_tv.png",
    type: "televisions",
    price: 799.99,
  },
  {
    name: "Nintendo Switch",
    url: "images/nintendo_switch.png",
    type: "games",
    price: 299.99,
  },
  {
    name: "Xbox Series X",
    url: "images/xbox_series_x.png",
    type: "games",
    price: 499.99,
  },
  {
    name: "Samsung TV",
    url: "images/samsung_tv.png",
    type: "televisions",
    price: 1099.99,
  },
  {
    name: "Google Pixel",
    url: "images/google_pixel.png",
    type: "smartphones",
    price: 499.99,
  },
  {
    name: "Sony ZV1F Camera",
    url: "images/sony_zv1f_camera.png",
    type: "cameras",
    price: 799.99,
  },
  {
    name: "Toshiba TV",
    url: "images/toshiba_tv.png",
    type: "televisions",
    price: 499.99,
  },
  {
    name: "iPhone 14",
    url: "images/iphone_14.png",
    type: "smartphones",
    price: 999.99,
  },
];

// Get DOM elements
const productsWrapperEl = document.getElementById("products-wrapper");
const checkBoxEls = document.querySelectorAll(".check");
const filtersContainerEl = document.getElementById("filters-container");
const searchInput = document.getElementById("search");
const cartButton = document.getElementById("cart-button");
const cartCount = document.getElementById("cart-count");

// Initialize cart item count
let cartItemCount = 0;

// Initialize products
const productsEls = [];

// Add/Remove to/from cart
const addToCart = (e) => {
  const statusEl = e.target;

  if (statusEl.classList.contains("added")) {
    //Remove from cart
    statusEl.classList.remove("added");
    statusEl.innerText = "Add to cart";
    statusEl.classList.remove("bg-red-600");
    statusEl.classList.add("bg-gray-800");

    cartItemCount--;
  } else {
    // Add to cart
    statusEl.classList.add("added");
    statusEl.innerText = "Remove from cart";
    statusEl.classList.remove("bg-gray-800");
    statusEl.classList.add("bg-red-600");

    cartItemCount++;
  }

  // Update cart item count
  cartCount.innerText = cartItemCount.toString();
};

// Create product element function
const createProductElement = (product) => {
  const productEl = document.createElement("div");
  productEl.className = "item space-y-2";

  productEl.innerHTML = `
    <div
        class="bg-gray-100 flex-justify-center relative overflow-hidden group cursor-pointer border"
    >
    <img
        src="${product.url}"
        class="w-full h-full object-cover"
        alt="${product.name}"
    />
    <span
        class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0"
        >Add to Cart</span
    >
    </div>
    <p class="text-xl">${product.name}</p>
    <strong>$${product.price.toLocaleString()}</strong>
  `;

  productEl.querySelector(".status").addEventListener("click", addToCart);
  return productEl;
};

// Loop over the products and create the product elements
products.forEach((product) => {
  const productEl = createProductElement(product);
  productsEls.push(productEl);
  productsWrapperEl.appendChild(productEl);
});

// filter products by search or checkbox
const filterProducts = (e) => {
  // get search term
  const searchTerm = searchInput.value.trim().toLowerCase();

  // get checked categories
  const category = Array.from(checkBoxEls)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.id);

  // Loop over products and check for matches
  productsEls.forEach((productEl, i) => {
    const product = products[i];

    // check to see if product matches the search or checked items
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
    const isInCheckedCategory =
      category.length === 0 || category.includes(product.type);

    // show or hide products based on matches
    if (matchesSearchTerm && isInCheckedCategory) {
      productEl.classList.remove("hidden");
    } else {
      productEl.classList.add("hidden");
    }
  });
};

// Add filter event listeners
filtersContainerEl.addEventListener("change", filterProducts);
searchInput.addEventListener("input", filterProducts);
