"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("productid");
  const productDetailsEl = document.getElementById("product-details");
  const productIdEl = document.getElementById("product-id");
  const productPriceEl = document.getElementById("product-price");

  fetch(`http://localhost:8081/api/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      productDetailsEl.textContent = product.productName;
      productIdEl.textContent = `Product ID: ${product.productId}`;
      productPriceEl.textContent = `Price: $${product.unitPrice}`;
    })
    .catch(error => {
      console.error("Error fetching product details:", error);
    });
});
