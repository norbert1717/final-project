// List of Pokémon URLs to use for randomly filling locations
const pokemonUrls = [
  "https://pokeapi.co/api/v2/pokemon/1",
  "https://pokeapi.co/api/v2/pokemon/5",
  "https://pokeapi.co/api/v2/pokemon/8",
  "https://pokeapi.co/api/v2/pokemon/26",
  "https://pokeapi.co/api/v2/pokemon/42",
  "https://pokeapi.co/api/v2/pokemon/63", 
];

// Helper function to select a random set of Pokémon URLs or no Pokémon at all
export const getRandomPokemons = (min, max) => {
  const chanceOfPokemon = Math.random();

  if (chanceOfPokemon < 0.5) {
    // 50% chance of assigning Pokémon to this location
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    return Array.from({ length: count }, () => pokemonUrls[Math.floor(Math.random() * pokemonUrls.length)]);
  } else {
    // 50% chance of no Pokémon at this location
    return [];
  }
};