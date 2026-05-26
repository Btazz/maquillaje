let cartCount = Number(localStorage.getItem('prettyCartCount') || 0);

const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
const cartCountEls = document.querySelectorAll('.cart-count');
const carousel = document.getElementById('brandsCarousel');

function updateCartCount() {
  localStorage.setItem('prettyCartCount', String(cartCount));
  cartCountEls.forEach(el => el.textContent = cartCount);
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('show');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

updateCartCount();

if (carousel) {
  let scrollAmount = 0;
  const step = 0.5;
  let max = carousel.scrollWidth - carousel.clientWidth;

  const autoScroll = () => {
    max = carousel.scrollWidth - carousel.clientWidth;
    if (max <= 0) return;
    scrollAmount += step;
    if (scrollAmount >= max) scrollAmount = 0;
    carousel.scrollLeft = scrollAmount;
  };

  let timer = setInterval(autoScroll, 25);
  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', () => { timer = setInterval(autoScroll, 25); });
  window.addEventListener('resize', () => { max = carousel.scrollWidth - carousel.clientWidth; });
}

document.addEventListener('click', (e) => {
  const brandLink = e.target.closest('.brand-item');
  if (brandLink) {
    cartCount += 1;
    updateCartCount();
    return;
  }

  const addBtn = e.target.closest('.add-to-cart');
  if (addBtn) {
    cartCount += 1;
    updateCartCount();
    addBtn.textContent = 'Agregado';
    addBtn.disabled = true;
    setTimeout(() => {
      addBtn.textContent = 'Agregar al carrito';
      addBtn.disabled = false;
    }, 900);
  }
});