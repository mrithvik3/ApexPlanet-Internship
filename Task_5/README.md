Capstone Store — Task_5/ecommerce

This is a minimal demo e-commerce storefront built for the Task 5 capstone.

Files:
- `index.html` — product listing and cart pane
- `cart.html` — separate cart page
- `product.html` — product details page
- `checkout.html` — checkout form (mock)
- `success.html` — simple order confirmation
- `products.js` — product rendering, add-to-cart, cart rendering
- `cart.js` — tiny cart utility (localStorage wrapper)
- `style.min.css` — single shared stylesheet
- `checkout.js` — checkout form logic

How to run locally:
1. Open `Task_5/ecommerce/index.html` in a browser (no server required).
2. Add products to cart, open the separate cart page, and proceed to checkout.

Notes:
- Cart state is persisted in `localStorage` under the key `capstone-cart`.
- Checkout is a mock flow — no real payments are performed.
- For further improvements: add images, server-side checkout, and accessibility focus trapping in the cart dialog.
