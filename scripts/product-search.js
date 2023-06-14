"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const searchOptionEl = document.getElementById("search-option");
  const categorySearchEl = document.getElementById("category-search");
  const categoryEl = document.getElementById("category");
  const productTableEl = document.getElementById("product-table");
  const productListEl = document.getElementById("product-list");

  searchOptionEl.addEventListener("change", () => {
    const selectedOption = searchOptionEl.value;

    if (selectedOption === "search-by-category") {
      categorySearchEl.style.display = "block";
    } else {
      categorySearchEl.style.display = "none";
    }
  });

  function buildProductRow(product) {
    const row = document.createElement("tr");

    const productIdCell = document.createElement("td");
    productIdCell.textContent = product.productId;
    row.appendChild(productIdCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = product.productName;
    row.appendChild(nameCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = `$${product.unitPrice}`;
    row.appendChild(priceCell);

    return row;
  }

  function displayProductList(products) {
    productListEl.innerHTML = "";

    products.forEach((product) => {
      const row = buildProductRow(product);
      productListEl.appendChild(row);
    });

    productTableEl.style.display = "table";
  }

  function searchProducts() {
    const selectedOption = searchOptionEl.value;

    if (selectedOption === "view-all") {
      fetch("http://localhost:8081/api/products")
        .then((response) => response.json())
        .then((products) => {
          displayProductList(products);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    } else if (selectedOption === "search-by-category") {
      const selectedCategory = categoryEl.value;

      if (selectedCategory !== "select-one") {
        fetch(`http://localhost:8081/api/categories/${selectedCategory}/products`)
          .then((response) => response.json())
          .then((products) => {
            displayProductList(products);
          })
          .catch((error) => {
            console.error("Error fetching products by category:", error);
          });
      }
    }
  }

  categoryEl.addEventListener("change", searchProducts);
});
