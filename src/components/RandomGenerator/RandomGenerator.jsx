export const getRandomPokemonsFromLocation = async (locationUrl) => {
  try {
    // Fetch location details
    const response = await fetch(locationUrl);
    const locationData = await response.json();

    if (!locationData.areas || locationData.areas.length === 0) {
      // If no areas are available, return an empty array
      return [];
    }

    // Select a random area from the location's areas
    const randomArea = locationData.areas[Math.floor(Math.random() * locationData.areas.length)];

    // Fetch Pokémon encounters for the selected area
    const areaResponse = await fetch(randomArea.url);
    const areaData = await areaResponse.json();

    if (!areaData.pokemon_encounters || areaData.pokemon_encounters.length === 0) {
      // If no Pokémon encounters are available, return an empty array
      return [];
    }

    // Choose a random number of Pokémon (e.g., 2-3)
    const min = 1;
    const max = 100;
    const count = Math.floor(Math.random() * (max - min + 1)) + max;

    // Randomly select Pokémon from the encounters
    const randomPokemons = Array.from({ length: count }, () => {
      const randomEncounter =
        areaData.pokemon_encounters[
          Math.floor(Math.random() * areaData.pokemon_encounters.length)
        ];
      return randomEncounter.pokemon.url; // Return the Pokémon's URL
    });

    return randomPokemons;
  } catch (error) {
    console.error('Error fetching random Pokémon:', error);
    return [];
  }
};