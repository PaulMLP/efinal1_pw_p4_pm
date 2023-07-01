const obtenerPokemons = async () => {
  return await obtenerListaPokemons(obtenerNumerosAleatorios());
};

const obtenerNumerosAleatorios = () => {
  const pokemons = [];
  for (let i = 0; i < 3; i++) {
    pokemons.push(obtenerNumeroAleatorio(145, 150));
  }
  return pokemons;
};

const obtenerListaPokemons = async ([id1, id2, id3] = []) => {
  const pokemones = [
    { name: (await consumirAPI(id1)).name, id: id1 },
    { name: (await consumirAPI(id2)).name, id: id2 },
    { name: (await consumirAPI(id3)).name, id: id3 },
  ];
  return pokemones;
};

const obtenerNumeroAleatorio = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const consumirAPI = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(
    (r) => r.json()
  );
  return res;
};

const fachadaObtenerPokemon = async () => {
  return await obtenerPokemons();
};

export default fachadaObtenerPokemon;
