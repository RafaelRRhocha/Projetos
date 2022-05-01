const cart = document.querySelector('.cart__items');
const clearCart = document.querySelector('.empty-cart');
const amount = document.querySelector('.total-price');
const countCart = document.querySelector('.count');
const cartStyle = document.querySelector('.cart');
const cardTitle = document.querySelector('.container-cartTitle');

document.querySelector('.material-icons').addEventListener('click', () => {
  cartStyle.style.display = cartStyle.style.display === 'none' ? 'flex' : 'none';
});

document.querySelector('.material-icons').addEventListener('click', () => {
  cardTitle.style.display = cardTitle.style.display === 'none' ? 'flex' : 'none';
});

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

async function getPrice() {
  const cartItemPrice = document.querySelectorAll('.cart__item');
  let total = 0;

  cartItemPrice.forEach((item) => {
  const product = item.innerText.split('$');
  total += parseFloat(product[1]);
  });

  if (cartItemPrice.length === 0) {
    total += 0;
  }

  amount.innerText = `Valor Total: $${total}`;
}

async function getLength() {
  const cartItemPrice = document.querySelectorAll('.cart__item');
  let total = 0;

  const product = cartItemPrice.length;
  total += product;

  if (cartItemPrice.length === 0) {
    total += 0;
  }

  countCart.innerText = `${total}`;
}

// Requisito 3
function cartItemClickListener(event) {
  cart.removeChild(event.target);
  getPrice();
  getLength();
  saveCartItems(cart.innerHTML);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `
  ${name}
  Valor: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Requisito 2
async function addToCart(event) {
  const result = await fetchItem(event.target.id);

  const { id, title, price } = result;
  const obj = { sku: id, name: title, salePrice: price };
  const item = createCartItemElement(obj);
  cart.appendChild(item);
  saveCartItems(cart.innerHTML);
  getPrice();
  getLength();
}

// Requisito 6
function clearCartAll() {
  clearCart.addEventListener('click', () => {
    cart.innerHTML = '';
    getPrice();
    getLength();
    saveCartItems(cart.innerHTML);
  });
}

// Requisito 4
function loading() {
  cart.innerHTML = getSavedCartItems();
  for (let index = 0; index < cart.children.length; index += 1) {
    const element = cart.children[index];
    element.addEventListener('click', cartItemClickListener);
  }
}

function createProductItemElement({ sku, name, image, salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', salePrice));
  const btn = createCustomElement('button', 'item__add', 'Comprar');
  btn.addEventListener('click', addToCart);
  btn.id = sku;
  section.appendChild(btn);
  return section;
}

// Requisito 1
async function adicionarProdutos(item) {
  const section = document.querySelector('.items');
  const load = document.createElement('span');
  load.classList = 'loading';
  load.innerText = 'carregando...';
  section.appendChild(load);

  const data = await fetchProducts(item);
  section.removeChild(load);

  data.results.forEach((produto) => {
    const { id, title, thumbnail, price } = produto;
    const obj = { sku: id, name: title, image: thumbnail, salePrice: `$ ${price}` };
    const makeProduct = createProductItemElement(obj);
    section.appendChild(makeProduct);
  });
}

window.onload = () => {
  loading();
  adicionarProdutos('computador');
  clearCartAll();
  getPrice();
  getLength();
 };
