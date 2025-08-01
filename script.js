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
