// script.js

document.addEventListener("DOMContentLoaded", function () {
  const images = [
    "./images/image-product-1-thumbnail.jpg",
    "./images/image-product-2-thumbnail.jpg",
    "./images/image-product-3-thumbnail.jpg",
    "./images/image-product-4-thumbnail.jpg",
  ];

  let currentImageIndex = 0;
  let cartQuantity = 0;

  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const lightboxOverlay = document.getElementById("lightboxOverlay");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxThumbs = document.querySelectorAll(".lightbox-thumb");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartSidebar = document.getElementById("cartSidebar");
  const cartIcon = document.getElementById("cartIcon");
  const cartBadge = document.getElementById("cartBadge");
  const cartContent = document.getElementById("cartContent");
  const cartItems = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const checkoutBtn = document.getElementById("checkoutBtn");

  const increaseBtn = document.getElementById("increaseBtn");
  const decreaseBtn = document.getElementById("decreaseBtn");
  const quantityDisplay = document.getElementById("quantity");
  const addToCartBtn = document.getElementById("addToCartBtn");

  function updateMainImage(index) {
    currentImageIndex = index;
    mainImage.style.backgroundImage = `url(./${images[index]})`;
    lightboxImage.style.backgroundImage = `url(./${images[index]})`;

    thumbnails.forEach((thumb) => thumb.classList.remove("active"));
    thumbnails[index].classList.add("active");

    lightboxThumbs.forEach((thumb) => thumb.classList.remove("active"));
    lightboxThumbs[index].classList.add("active");
  }

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const index = parseInt(thumb.getAttribute("data-image")) - 1;
      updateMainImage(index);
    });
  });

  lightboxThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const index = parseInt(thumb.getAttribute("data-image")) - 1;
      updateMainImage(index);
    });
  });

  mainImage.addEventListener("click", () => {
    lightboxOverlay.style.display = "flex";
  });

  lightboxClose.addEventListener("click", () => {
    lightboxOverlay.style.display = "none";
  });

  lightboxPrev.addEventListener("click", () => {
    const index = (currentImageIndex - 1 + images.length) % images.length;
    updateMainImage(index);
  });

  lightboxNext.addEventListener("click", () => {
    const index = (currentImageIndex + 1) % images.length;
    updateMainImage(index);
  });

  increaseBtn.addEventListener("click", () => {
    let quantity = parseInt(quantityDisplay.textContent);
    quantity++;
    quantityDisplay.textContent = quantity;
  });

  decreaseBtn.addEventListener("click", () => {
    let quantity = parseInt(quantityDisplay.textContent);
    if (quantity > 0) quantity--;
    quantityDisplay.textContent = quantity;
  });

  addToCartBtn.addEventListener("click", () => {
    const addedQty = parseInt(quantityDisplay.textContent);
    if (addedQty > 0) {
      cartQuantity += addedQty;
      cartBadge.textContent = cartQuantity;
      cartBadge.style.display = "block";

      cartItems.innerHTML = `
        <div class="cart-item">
          <div class="item-details">
            Fall Limited Edition Sneakers<br />
            $125.00 × ${cartQuantity} = <strong>$${125 * cartQuantity}.00</strong>
          </div>
          <button class="remove-item" aria-label="Remove item from cart">Clear cart</button>
        </div>
      `;

      cartEmpty.style.display = "none";
      cartItems.style.display = "block";
      checkoutBtn.style.display = "block";

      quantityDisplay.textContent = 0;
    }
  });

  cartIcon.addEventListener("click", () => {
    cartOverlay.classList.toggle("active");
  });

  checkoutBtn.addEventListener("click", () => {
    alert(`Proceeding to checkout with ${cartQuantity} item(s) in cart.`);
  });

  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      cartQuantity = 0;
      cartBadge.textContent = "0";
      cartItems.style.display = "none";
      cartEmpty.style.display = "block";
      checkoutBtn.style.display = "none";
    }
  });

  document.addEventListener("click", (e) => {
    if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
      cartOverlay.classList.remove("active");
    }
  });


  // Initial image
  updateMainImage(0);
});
