import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LocationCard from './components/LocationCard/LocationCard';
import Header from './components/Header/Header';
import UserPokemonSelect from './components/UserPokemonSelect/UserPokemonSelect';
import BattleScreen from './components/BattleScreen/BattleScreen';
import { getRandomPokemonsFromLocation } from './components/RandomGenerator/RandomGenerator';
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';

function App() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [encounteredPokemon, setEncounteredPokemon] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [showLocations, setShowLocations] = useState(true);
  const [locationPokemonMap, setLocationPokemonMap] = useState({});
  const [showWelcome, setShowWelcome] = useState(true);

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

  const handleLocationClick = async (location) => {
    const locationPokemons = locationPokemonMap[location.name];

    if (locationPokemons && locationPokemons.length > 0) {
      const randomPokemonUrl = locationPokemons[Math.floor(Math.random() * locationPokemons.length)];

      try {
        const response = await fetch(randomPokemonUrl);
        const pokemonData = await response.json();

        setEncounteredPokemon({
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
      setEncounteredPokemon(null);
    }

    setShowLocations(false);
  };

  const handleSelectedPokemon = (pokemon) => {
    setSelectedPokemon({
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      stats: {
        hp: pokemon.stats[0].base_stat,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat
      },
    });
  };

  const handleRunFromBattle = () => {
    setEncounteredPokemon(null);
    setSelectedPokemon(null);
    setShowLocations(true);
  };

  const handleCatchPokemon = (pokemon) => {
    setEncounteredPokemon(null);
    setSelectedPokemon(null);
    setShowLocations(true);
    usersPokemon.current = [...usersPokemon.current, `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`];
    return (
      <p>You caught {pokemon.name}!</p>
    );
  };

  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

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
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<WelcomeScreen onStart={() => setShowWelcome(false)} />} />
          <Route path="/locations" element={showLocations ? (
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
                  <UserPokemonSelect
                    onSelectPokemon={handleSelectedPokemon}
                    usersPokemon={usersPokemon}
                    isForBattle={true}
                  />
                </div>
              ) : (
                <div className="no-pokemon">
                  <p>This location does not seem to have any Pokémon.</p>
                </div>
              )}
              {encounteredPokemon && (
                <UserPokemonSelect onSelectPokemon={handleSelectedPokemon} usersPokemon={usersPokemon} />
              )}
              <button onClick={() => setShowLocations(true)}>Back to Locations</button>
            </div>
          )} />
          <Route path="/mypokemons" element={
            <UserPokemonSelect
              usersPokemon={usersPokemon}
              onSelectPokemon={handleSelectedPokemon}
              isForBattle={false}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
