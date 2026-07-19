document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('checkoutForm');
  var msg = document.getElementById('checkoutMsg');
  var cancel = document.getElementById('cancelBtn');

  if (cancel) cancel.addEventListener('click', function() { window.location.href = 'index.html'; });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var data = new FormData(form);
    var name = (data.get('name') || '').trim();
    var email = (data.get('email') || '').trim();
    var address = (data.get('address') || '').trim();
    var card = (data.get('card') || '').trim();

    if (!name || !email || !address || !card) {
      msg.textContent = 'Please complete all required fields.';
      msg.style.color = '#ffbaba';
      return;
    }

    // Basic email pattern check
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      msg.textContent = 'Please enter a valid email address.';
      msg.style.color = '#ffbaba';
      return;
    }

    // Mock success
    msg.textContent = 'Order placed — thank you! Clearing cart...';
    msg.style.color = '#b9f5d0';
    localStorage.removeItem('capstone-cart');
    setTimeout(function() {
      window.location.href = 'success.html';
    }, 900);
  });
});

