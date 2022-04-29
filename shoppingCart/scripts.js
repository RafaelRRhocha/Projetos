const fetchProducts = (id) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${id}`;
  return fetch(url)
  .then((response) => response.json())
  .then((data) => data.results)
}
fetchProducts();

console.log(fetchProducts('computador'))
