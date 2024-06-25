// Toggle class active untuk hamburger menu
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

document.addEventListener("DOMContentLoaded", (event) => {
  let previewContainer = document.querySelector(".products-preview");
  let previewBox = previewContainer.querySelectorAll(".preview");

  document
    .querySelectorAll(".products-container .product")
    .forEach((product) => {
      product.addEventListener("click", () => {
        previewContainer.style.display = "flex";
        let name = product.getAttribute("data-name");
        previewBox.forEach((preview) => {
          let target = preview.getAttribute("data-target");
          if (name === target) {
            preview.classList.add("active");
          } else {
            preview.classList.remove("active");
          }
        });
      });
    });

  previewBox.forEach((preview) => {
    preview.querySelector(".fa-times").addEventListener("click", () => {
      preview.classList.remove("active");
      previewContainer.style.display = "none";
    });
  });

  let purchaseModal = document.getElementById("purchaseModal");
  let closeModal = document.querySelector(".close-modal");
  let purchaseForm = document.getElementById("purchaseForm");
  let priceElement = document.getElementById("price");
  let confirmPaymentButton = document.getElementById("confirmPayment");
  let phoneNumberContainer = document.getElementById("phoneNumberContainer");

  document.querySelectorAll(".buy").forEach((buyButton) => {
    buyButton.addEventListener("click", (e) => {
      e.preventDefault();
      let product = e.target.closest(".preview");
      let price = product.querySelector(".price").innerText;
      if (price === "Free") {
        alert("Pembelian berhasil!");
        previewContainer.style.display = "none";
        return;
      }
      priceElement.innerText = `Price: ${price}`;
      previewContainer.style.display = "none";
      purchaseModal.style.display = "flex";
    });
  });

  // Berfungsi untuk menangani menampilkan modal dan menetapkan harga
  function handleBuyButtonClick(product) {
    let price = product.querySelector(".price").innerText;
    if (price === "Free") {
      alert("Pembelian berhasil!");
      return;
    }
    priceElement.innerText = `Price: ${price}`;
    previewContainer.style.display = "none";
    purchaseModal.style.display = "flex";
  }

  document
    .querySelectorAll(".products-container .product")
    .forEach((product) => {
      product.addEventListener("click", () => {
        previewContainer.style.display = "flex";
        let name = product.getAttribute("data-name");
        previewBox.forEach((preview) => {
          let target = preview.getAttribute("data-target");
          if (name === target) {
            preview.classList.add("active");
          } else {
            preview.classList.remove("active");
          }
        });

        // Pengulangan Untuk Semua Produk
        phoneNumberContainer.style.display = "none";
        confirmPaymentButton.innerText = "Confirm Payment";
        confirmPaymentButton.removeEventListener("click", handleBuyNow);
        purchaseForm.reset();
      });
    });

  previewBox.forEach((preview) => {
    preview.querySelector(".fa-times").addEventListener("click", () => {
      preview.classList.remove("active");
      previewContainer.style.display = "none";
    });
  });

  closeModal.addEventListener("click", () => {
    purchaseModal.style.display = "none";
    previewContainer.style.display = "flex";
  });

  window.addEventListener("click", (event) => {
    if (event.target === purchaseModal) {
      purchaseModal.style.display = "none";
      previewContainer.style.display = "flex";
    }
  });

  purchaseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // konfirmasi pembayaran
    let paymentMethod = document.getElementById("paymentMethod").value;
    if (paymentMethod === "eWallet" || paymentMethod === "eWallet2") {
      // Menampilkan input nomer telepon
      phoneNumberContainer.style.display = "block";
      confirmPaymentButton.innerText = "Buy Now";
      confirmPaymentButton.addEventListener("click", handleBuyNow);
    } else {
      // menangani metode pembayaran lain secara langsung
      handleBuyNow();
    }
  });

  function handleBuyNow() {
    let paymentMethod = document.getElementById("paymentMethod").value;
    if (paymentMethod === "eWallet" || paymentMethod === "eWallet2") {
      let phoneNumber = document.getElementById("phoneNumber").value;
      if (phoneNumber.trim() === "") {
        alert("Please enter your phone number.");
        return;
      }
    }
    // Notif Pembelian berhasil
    alert("Pembelian berhasil!");
    purchaseModal.style.display = "none";
  }
});
