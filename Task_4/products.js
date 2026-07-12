const products = [
  { id: 1, name: "Wireless Earbuds", category: "electronics", price: 79, rating: 4.5, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" },
  { id: 2, name: "Smart Watch", category: "electronics", price: 149, rating: 4.2, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop" },
  { id: 3, name: "Cotton Hoodie", category: "fashion", price: 39, rating: 4.1, image: "https://media.istockphoto.com/id/2154756656/photo/template-blank-flat-black-hoodie-top-view-isolated-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=2s6pHWh-8ilz-4VAldiX7WghksVMcO93CBbb_Kui9QQ=" },
  { id: 4, name: "Running Shoes", category: "fashion", price: 89, rating: 4.6, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop" },
  { id: 5, name: "Desk Lamp", category: "home", price: 29, rating: 4.0, image: "https://plus.unsplash.com/premium_photo-1681412205156-bb506a4ea970?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGVza2xhbXB8ZW58MHx8MHx8fDA%3D" },
  { id: 6, name: "Storage Basket", category: "home", price: 19, rating: 3.9, image: "https://images.unsplash.com/photo-1777869779118-2389f6c951eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3RvcmFnZSUyMGJhc2tldHxlbnwwfHwwfHx8MA%3D%3D" },
  { id: 7, name: "Bluetooth Speaker", category: "electronics", price: 59, rating: 4.3, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop" },
  { id: 8, name: "Wall Clock", category: "home", price: 25, rating: 4.4, image: "https://plus.unsplash.com/premium_photo-1725075084045-4c1ee2ab9349?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbCUyMGNsb2NrfGVufDB8fDB8fHww" }
];

const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const productsGrid = document.getElementById("productsGrid");

function getFilteredProducts() {
  const category = categoryFilter.value;
  const sortBy = sortFilter.value;

  let list = [...products];

  if (category !== "all") {
    list = list.filter((product) => product.category === category);
  }

  if (sortBy === "priceLow") {
    list.sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceHigh") {
    list.sort((a, b) => b.price - a.price);
  } else if (sortBy === "ratingHigh") {
    list.sort((a, b) => b.rating - a.rating);
  }

  return list;
}

function renderProducts() {
  const list = getFilteredProducts();
  productsGrid.innerHTML = "";

  if (!list.length) {
    productsGrid.innerHTML = "<p>No products found for this filter.</p>";
    return;
  }

  list.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3>${product.name}</h3>
      <p class="meta">Category: ${product.category}</p>
      <p class="meta">Rating: ${product.rating}</p>
      <p class="price">$${product.price}</p>
    `;

    productsGrid.appendChild(card);
  });

  // stagger reveal for product cards
  const cards = Array.from(productsGrid.querySelectorAll('.product-card'));
  cards.forEach((c, i) => setTimeout(() => c.classList.add('reveal'), i * 70));
}

categoryFilter.addEventListener("change", renderProducts);
sortFilter.addEventListener("change", renderProducts);

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  // Trigger card reveals
  document.querySelectorAll('.card').forEach((el, i) => 
    setTimeout(() => el.classList.add('reveal'), 120 + i * 80)
  );
});