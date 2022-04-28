const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
const buscarPokemon = () => {

  const pokemonPromisses = [];

  for (let index = 1; index <= 151; index++) {
    pokemonPromisses.push(fetch(getPokemonUrl(index)).then(response => response.json()))
  }

  Promise.all(pokemonPromisses) 
    .then(pokemons => {
      const liPoke = pokemons.reduce((acc, pokes) => {

        const types = pokes.types.map(typeInfo => typeInfo.type.name);

        acc += `
          <li class="card ${types[0]}">
            <img class="card-image" alt="${pokes.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokes.id}.png"/>
            <h2 class="card-title">${pokes.id}. ${pokes.name}</h2>
            <p class="card-subtitle">${types.join(' | ')}</p>
          </li>`
        return acc;
      }, '')

      const ul = document.querySelector('[data-js="pokedex"]');
      ul.innerHTML = liPoke;
    })
}
buscarPokemon();