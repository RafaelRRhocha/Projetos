// const listaSelecaoPokemon = document.querySelectorAll('.pokemon');
// const pokemonCard = document.querySelectorAll('.cartao-pokemon');

// listaSelecaoPokemon.forEach(pokemon => {
//     pokemon.addEventListener('click', () => {
//         const cartaoPokemonAberto = document.querySelector('.aberto')
//         cartaoPokemonAberto.classList.remove('aberto')

//         const idPokemonSelecionado = pokemon.attributes.id.value

//         const cartaoPokemonParaAbrir = document.getElementById('cartao-' + idPokemonSelecionado)
//         cartaoPokemonParaAbrir.classList.add('aberto')

//         const pokemonAbertoNaListagem = document.querySelector('.ativo')
//         pokemonAbertoNaListagem.classList.remove('ativo')

//         const pokemonSelecionadoNaListagem = document.getElementById(idPokemonSelecionado)
//         pokemonSelecionadoNaListagem.classList.add('ativo')

//     })
// })

const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;
const buscarPokemon = () => {

  const pokemonPromisses = [];

  for (let index = 1; index <= 151; index++) {
    pokemonPromisses.push(fetch(getPokemonUrl(index)).then(response => response.json()))
  }

  Promise.all(pokemonPromisses) 
    .then(pokemons => {

      const modal =  pokemons.reduce((accu, poke) => {

        accu += `
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${poke.name}</h5>
            </div>
              <div class="modal-body">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${poke.id}.svg" alt="${poke.name}">
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>`
          return accu;
      }, '');
      const modalPrin = document.querySelector('[data-js="modals"]');
      modalPrin.innerHTML = modal;

      const liPoke = pokemons.reduce((acc, pokes) => {

        const types = pokes.types.map(typeInfo => typeInfo.type.name);

        acc += `
          <li class="card ${types[0]}">
            <img class="card-image" alt="${pokes.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokes.id}.svg"/>
            <h2 class="card-title">#${pokes.id} - ${pokes.name}</h2>
            <p class="card-subtitle">${types.join(' / ')}</p>
            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#pokeModal">Saiba Mais</button>
          </li>`
        return acc;
      }, '')

      const ul = document.querySelector('[data-js="pokedex"]');
      ul.innerHTML = liPoke;
    })
}
buscarPokemon();
