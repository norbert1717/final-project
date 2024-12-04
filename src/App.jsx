import { useState, useEffect, useRef } from 'react';
import './App.css';
import LocationCard from './components/LocationCard/LocationCard';
import Header from './components/Header/Header';
import UserPokemonSelect from './components/UserPokemonSelect/UserPokemonSelect';
import BattleScreen from './components/BattleScreen/BattleScreen';
import { getRandomPokemonsFromLocation } from './components/RandomGenerator/RandomGenerator';

function App() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [encounteredPokemon, setEncounteredPokemon] = useState(null); // The currently encountered Pokémon
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Selected Pokémon during encounter
  const [showLocations, setShowLocations] = useState(true); // Whether to display locations or the encounter/battle
  const [locationPokemonMap, setLocationPokemonMap] = useState({}); // Map of Pokémon by location

  // List of default Pokémon URLs representing the user's Pokémon
const usersPokemon = useRef([
  "https://pokeapi.co/api/v2/pokemon/bulbasaur",
  "https://pokeapi.co/api/v2/pokemon/charizard",
  "https://pokeapi.co/api/v2/pokemon/poliwhirl"
]);

useEffect(() => {
  const fetchLocations = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/location?limit=20');
      const data = await response.json();

      setLocations(data.results);

      const newLocationPokemonMap = {};
      for (const location of data.results) {
        const pokemons = await getRandomPokemonsFromLocation(location.url);
        newLocationPokemonMap[location.name] = pokemons;
      }

      setLocationPokemonMap(newLocationPokemonMap);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  fetchLocations();
}, []);

  // Handle selecting a location
  const handleLocationClick = async (location) => {
    const locationPokemons = locationPokemonMap[location.name]; // Retrieve the list of Pokémon URLs for the clicked location

    if (locationPokemons && locationPokemons.length > 0) {
      const randomPokemonUrl = locationPokemons[Math.floor(Math.random() * locationPokemons.length)]; // Pick a random Pokémon from the available list for this location

      try {
        const response = await fetch(randomPokemonUrl);
        const pokemonData = await response.json();

        setEncounteredPokemon({ // Update the state to store the encountered Pokémon's full data
          name: pokemonData.name,
          sprite: pokemonData.sprites.front_default,
          stats: {
            hp: pokemonData.stats[0].base_stat,
            attack: pokemonData.stats[1].base_stat,
            defense: pokemonData.stats[2].base_stat
          },
        });

      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    } else {
      setEncounteredPokemon(null); // If there are no Pokémon for this location, set encountered Pokémon to null
    }

    setShowLocations(false); // Switch to showing the encountered Pokémon screen (not the location grid)
  };

  // Handles user selection of one of their Pokémon
  const handleSelectedPokemon = (pokemon) => {
    setSelectedPokemon({
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      stats: {
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat
      },
    }); // Set the player's selected Pokémon for the battle
  };

  // Handle running away from battle
  const handleRunFromBattle = () => {
    setEncounteredPokemon(null); // Reset the encountered Pokémon
    setSelectedPokemon(null); // Reset the selected Pokémon
    setShowLocations(true); // Return to locations view
  };

  // Handle catching the Pokémon
  const handleCatchPokemon = (pokemon) => {
    setEncounteredPokemon(null); // Reset the encountered Pokémon
    setSelectedPokemon(null); // Reset the selected Pokémon
    setShowLocations(true); // Return to locations view
    usersPokemon.current = [...usersPokemon.current, `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`]
    return (
    <p>You caught{pokemon.name}!;</p> // Notify the user
    )
  };

  if (loading) {
    return (
      <div className="app-container">
        <Header />
        <h1 className="page-title">Pokémon Locations</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
<div className="app-container">
<Header />
<h1 className="page-title">Pokémon Locations</h1>

{showLocations ? (
  <div className="locations-grid">
    {locations.map((location) => (
      <LocationCard
        key={location.name}
        location={location}
        onClick={() => handleLocationClick(location)}
      />
    ))}
  </div>
) : encounteredPokemon && selectedPokemon ? (
  // Render the BattleScreen if both player's and enemy's Pokémon are selected
  <BattleScreen
    playerPokemon={selectedPokemon}
    enemyPokemon={encounteredPokemon}
    onCatch={handleCatchPokemon}
    onRun={handleRunFromBattle}
  />
) : (
  <div className="encounter">
    {encounteredPokemon ? (
      <div className="pokemon-encounter">
        <h2>Encountered Pokémon: {encounteredPokemon.name}</h2>
        <img src={encounteredPokemon.sprite} alt={encounteredPokemon.name} />
      </div>
    ) : (
      <div className="no-pokemon">
        <p>This location does not seem to have any Pokémon.</p>
      </div>
    )}

    {/* Show user's Pokémon selection options */}
    {encounteredPokemon && (
      <UserPokemonSelect onSelectPokemon={handleSelectedPokemon} usersPokemon={usersPokemon} />
    )}

    <button onClick={() => setShowLocations(true)}>Back to Locations</button>
  </div>
)}
</div>

  );
}

export default App;
