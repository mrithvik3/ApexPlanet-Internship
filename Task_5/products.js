var PRODUCTS = [
  { id: 'p1', title: 'Minimal Headphones', price: 59.99, img: 'images/HeadPhones.jpg', desc: 'Comfortable on-ear headphones with clear sound.' },
  { id: 'p2', title: 'Smart Speaker', price: 129.0, img: 'images/SmartSpeaker.webp', desc: 'Compact smart speaker with voice assistant.' },
  { id: 'p3', title: 'Wireless Charger', price: 29.5, img: 'images/wirelessCharger.jpg', desc: 'Fast wireless charging pad.' },
  { id: 'p4', title: 'Travel Backpack', price: 89.0, img: 'images/TravelBagPack.jpg', desc: 'Water-resistant everyday backpack.' },
  { id: 'p5', title: 'Coffee Mug', price: 12.75, img: 'images/CoffeeMug.jpg', desc: 'Ceramic mug with insulated cover.' },
  { id: 'p6', title: 'Desk Lamp', price: 39.99, img: 'images/DeskLamp.jpg', desc: 'Adjustable LED desk lamp with warm light.' }
];

var productsRoot = document.getElementById('products');
var cartCountEl = document.getElementById('cartCount');

function getCart() {
  if (window.CapstoneCart && typeof window.CapstoneCart.get === 'function') {
    return window.CapstoneCart.get();
  }
  try {
    return JSON.parse(localStorage.getItem('capstone-cart') || '{}');
  } catch (e) { return {}; }
}

function saveCart(cart) {
  if (window.CapstoneCart && typeof window.CapstoneCart.set === 'function') {
    window.CapstoneCart.set(cart);
  } else {
    localStorage.setItem('capstone-cart', JSON.stringify(cart));
  }
  renderCartCount();
}

function svgPlaceholder(title) {
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">' +
    '<rect width="100%" height="100%" fill="#20272d"/>' +
    '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="#aab6c2">' + title + '</text>' +
    '</svg>';
  return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

function renderProducts() {
  var html = '';
  for (var i = 0; i < PRODUCTS.length; i++) {
    var p = PRODUCTS[i];
    var img = p.img || svgPlaceholder(p.title);
    html += '<article class="product" data-id="' + p.id + '">';
    html += '<img src="' + img + '" loading="lazy" alt="' + p.title + '" />';
    html += '<h4>' + p.title + '</h4>';
    html += '<p class="muted">' + p.desc + '</p>';
    html += '<div class="price">$' + p.price.toFixed(2) + '</div>';
    html += '<div class="actions">';
    html += '<button class="btn primary" data-add="' + p.id + '" aria-label="Add ' + p.title + ' to cart">Add to cart</button>';
    html += '<a class="btn ghost" href="product.html?id=' + p.id + '">Details</a>';
    html += '</div></article>';
  }
  productsRoot.innerHTML = html;
}

function addToCart(id, qty) {
  if (qty == null) qty = 1;
  var cart = getCart();
  cart[id] = (cart[id] || 0) + qty;
  saveCart(cart);
}

function renderCartCount() {
  var cart = getCart();
  var count = 0;
  for (var k in cart) { if (Object.prototype.hasOwnProperty.call(cart, k)) { count += cart[k]; } }
  if (cartCountEl) cartCountEl.textContent = count;
}

if (productsRoot) productsRoot.addEventListener('click', function(e) {
  var add = e.target.closest && e.target.closest('[data-add]');
  if (add) {
    var id = add.getAttribute('data-add');
    addToCart(id);
    add.classList.add('pop');
    setTimeout(function(){ add.classList.remove('pop'); }, 300);
  }
});

// cart pane open/close wiring
var openCart = document.getElementById('openCart');
var closeCart = document.getElementById('closeCart');
var cartPane = document.getElementById('cartPane');
var cartItemsRoot = document.getElementById('cartItems');
var cartTotalEl = document.getElementById('cartTotal');
var checkoutBtn = document.getElementById('checkoutBtn');

if (openCart && cartPane) openCart.addEventListener('click', function() {
  renderCart();
  cartPane.hidden = false;
  cartPane.setAttribute('aria-hidden','false');
  cartPane.setAttribute('aria-modal','true');
  openCart.setAttribute('aria-expanded','true');
  // move focus to close button for keyboard users
  setTimeout(function(){
    var el = document.getElementById('closeCart');
    if (el) el.focus();
  }, 40);
  // enable focus trap while cart is open
  enableCartFocusTrap();
});
if (closeCart && cartPane) closeCart.addEventListener('click', function() {
  cartPane.hidden = true;
  cartPane.setAttribute('aria-hidden','true');
  cartPane.setAttribute('aria-modal','false');
  openCart.setAttribute('aria-expanded','false');
  openCart.focus();
  // disable focus trap when closing
  disableCartFocusTrap();
});

// Focus trap implementation for cart dialog
var _cartTrap = null;
function enableCartFocusTrap() {
  var dialog = cartPane;
  if (!dialog) return;
  var focusable = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  var nodeList = dialog.querySelectorAll(focusable);
  var nodes = Array.prototype.slice.call(nodeList);
  if (!nodes.length) return;
  var first = nodes[0];
  var last = nodes[nodes.length - 1];

  function handleKey(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    if (e.key === 'Escape') {
      closeCart.click();
    }
  }

  document.addEventListener('keydown', handleKey);
  _cartTrap = handleKey;
}

function disableCartFocusTrap() {
  if (!_cartTrap) return;
  document.removeEventListener('keydown', _cartTrap);
  _cartTrap = null;
}

function renderCart() {
  var cart = getCart();
  var ids = Object.keys(cart || {});
  if (!ids.length) {
    if (cartItemsRoot) cartItemsRoot.innerHTML = '<div class="empty">Your cart is empty.</div>';
    if (cartTotalEl) cartTotalEl.textContent = '0.00';
    return;
  }
  var html = '';
  var total = 0;
  for (var i = 0; i < ids.length; i++) {
    var id = ids[i];
    var product = null;
    for (var j = 0; j < PRODUCTS.length; j++) { if (PRODUCTS[j].id === id) { product = PRODUCTS[j]; break; } }
    if (!product) product = { title: 'Unknown', price: 0 };
    var qty = cart[id];
    total += product.price * qty;
    html += '<div class="cart-row" data-id="' + id + '">';
    html += '<div><div class="muted">' + product.title + '</div>';
    html += '<div class="small muted">$' + product.price.toFixed(2) + ' x ' + qty + '</div></div>';
    html += '<div><button data-dec="' + id + '">−</button><button data-inc="' + id + '">+</button><button data-rm="' + id + '">Remove</button></div>';
    html += '</div>';
  }
  if (cartItemsRoot) cartItemsRoot.innerHTML = html;
  if (cartTotalEl) cartTotalEl.textContent = total.toFixed(2);
}

if (cartItemsRoot) cartItemsRoot.addEventListener('click', function(e) {
  var dec = e.target.closest && e.target.closest('[data-dec]');
  var inc = e.target.closest && e.target.closest('[data-inc]');
  var rm = e.target.closest && e.target.closest('[data-rm]');
  var cart = getCart();
  if (dec) {
    var id = dec.getAttribute('data-dec');
    cart[id] = Math.max(0, (cart[id] || 0) - 1);
    if (cart[id] === 0) delete cart[id];
    saveCart(cart);
    renderCart();
  }
  if (inc) {
    var id = inc.getAttribute('data-inc');
    cart[id] = (cart[id] || 0) + 1;
    saveCart(cart);
    renderCart();
  }
  if (rm) {
    var id = rm.getAttribute('data-rm');
    delete cart[id];
    saveCart(cart);
    renderCart();
  }
});

if (checkoutBtn) checkoutBtn.addEventListener('click', function() {
  // navigate to checkout page for finalization
  window.location.href = 'checkout.html';
});

// init
if (productsRoot) renderProducts();
renderCartCount();
if (cartItemsRoot) renderCart();

