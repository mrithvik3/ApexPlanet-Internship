// cart helper used by product listing; minimal and safe
(function(){
  // expose simple API if needed by other pages
  window.CapstoneCart = {
    get() { try { return JSON.parse(localStorage.getItem('capstone-cart')||'{}') } catch { return {} } },
    set(obj) { localStorage.setItem('capstone-cart', JSON.stringify(obj)); }
  };
})();

