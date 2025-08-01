const menuIcon = document.getElementById("mobile-menu-icon");
const navbar = document.getElementById("navbar");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

//-----------------------Product page------------------------------------
const product = [
  { name: "product 1", price: 4100, img: "img/products/f1.jpg" },
  { name: "product 2", price: 7600, img: "img/products/f5.jpg" },
  { name: "product 3", price: 2000, img: "img/products/f6.jpg" },
  { name: "product 4", price: 4600, img: "img/products/f7.jpg" },
  { name: "product 5", price: 1500, img: "img/products/f8.jpg" },
  { name: "product 6", price: 7800, img: "img/products/n1.jpg" },
  { name: "product 7", price: 3400, img: "img/products/n2.jpg" },
  { name: "product 8", price: 5100, img: "img/products/n3.jpg" },
];

const productCont = document.querySelector(".product-cont");

product.forEach((productItem, index) => {
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
        <img src="${productItem.img}" alt="${productItem.name}">
        <h3>${productItem.name}</h3>
        <p>Rs. ${productItem.price}</p>
        <button>Add To Cart</button>
      `;

  const img = div.querySelector("img");
  img.addEventListener("click", () => {
    if (index === 0) {
      window.location.href = `view.html?product=${index}`;
    }
  });

  productCont.appendChild(div);
});

//---------------------------------------view page-----------------------------------
function changeImage(el) {
  const mainImg = document.getElementById("main-img");
  mainImg.src = el.src;
}


// cart and login and logout functionality

// const products = [
//   { id: 1, name: "Product 1", price: 500, image: "assets/product1.jpg" },
//   { id: 2, name: "Product 2", price: 750, image: "assets/product2.jpg" },
//   { id: 3, name: "Product 3", price: 300, image: "assets/product3.jpg" },
//   { id: 4, name: "Product 4", price: 900, image: "assets/product4.jpg" },
// ];

// Floating alert
function showAlert(message, type = "warning") {
  const alertBox = document.getElementById("custom-alert");
  alertBox.textContent = message;
  alertBox.className = `alert alert-${type} position-fixed`;
  alertBox.classList.remove("d-none");

  setTimeout(() => {
    alertBox.classList.add("d-none");
  }, 2500);
}

// Render Products
// function renderProducts() {
//   const container = document.getElementById("product-container");
//   if (!container) return;

//   container.innerHTML = "";
//   products.forEach(product => {
//     container.innerHTML += `
//       <div class="col-md-3 mb-4" data-aos="fade-up">
//         <div class="card h-100 product-card">
//           <img src="${product.image}" class="card-img-top" style="height:200px;" />
//           <div class="card-body">
//             <h5 class="card-title">${product.name}</h5>
//             <p>Rs ${product.price}</p>
//             <button onclick="addToCart(${product.id})" class="btn btn-dark">Add to Cart</button>
//           </div>
//         </div>
//       </div>`;
//   });

//   AOS.refresh();
// }

// Add to Cart
function addToCart(productId) {
  const user = JSON.parse(localStorage.getItem("currentUser")); // ✅ Use currentUser

  if (!user || !user.email) {
    sessionStorage.setItem("loginMessage", "Please log in to add items to cart.");
    sessionStorage.setItem("alertType", "warning");
    window.location.href = "login.html";

    return;
  }

  const cartKey = `cart_${user.email}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const product = products.find(p => p.id === productId);
    if (product) {
      cart.push({ ...product, quantity: 1 });
    }
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartCount();
  showAlert("Item added to cart!", "success");
}

// Update Cart Count
function updateCartCount() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || !user.email) return;

  const cartKey = `cart_${user.email}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartEl = document.getElementById("cart-count");
  if (cartEl) cartEl.innerText = total;
}

// Navbar Auth Status
function updateNavbarAuthStatus() {
  const navbar = document.getElementById("navbar-user-controls");
  const cartButton = document.getElementById("cart-button-container"); // <-- get cart button
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user && user.email) {
    navbar.innerHTML = `
      <button class="btn btn-sm btn-outline-light me-2" onclick="logout()">Logout</button>
    `;
    if (cartButton) cartButton.classList.remove("d-none"); // show cart
  } else {
    navbar.innerHTML = `
      <a href="login.html" class="btn btn-sm btn-outline-light me-2">Login/Register</a>
    `;
    if (cartButton) cartButton.classList.add("d-none"); // hide cart
  }
}


// Logout function
function logout() {
  localStorage.removeItem("currentUser");
  window.location.reload();
}


function renderCart() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || !user.email) {
    sessionStorage.setItem("loginMessage", "Please log in to view your cart.");
    sessionStorage.setItem("alertType", "warning");
    window.location.href = "login.html";
    return;
  }

  const cartKey = `cart_${user.email}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
  const cartContainer = document.getElementById("cart-items");
  const totalQtyEl = document.getElementById("total-qty");
  const totalPriceEl = document.getElementById("total-price");

  cartContainer.innerHTML = "";

  let totalQty = 0;
  let totalPrice = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
    totalQtyEl.textContent = "0";
    totalPriceEl.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    totalQty += item.quantity;
    totalPrice += subtotal;

    cartContainer.innerHTML += `
      <div class="card mb-3">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 class="card-title mb-1">${item.name}</h5>
            <p class="mb-0">Price: Rs ${item.price}</p>
            <p class="mb-0">Subtotal: Rs ${subtotal}</p>
          </div>
          <div class="d-flex align-items-center">
            <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, -1)">-</button>
            <span class="mx-2">${item.quantity}</span>
            <button class="btn btn-outline-secondary btn-sm" onclick="updateQuantity(${index}, 1)">+</button>
          </div>
        </div>
        
      </div>
    `;
  });

  totalQtyEl.textContent = totalQty;
  totalPriceEl.textContent = totalPrice;
  updateCartCount();
}

function updateQuantity(index, change) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const cartKey = `cart_${user.email}`;
  let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  if (!cart[index]) return;

  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1); // Remove if quantity is 0
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  renderCart();
}
