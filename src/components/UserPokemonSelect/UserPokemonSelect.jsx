import { useState, useEffect } from 'react';
import './UserPokemonSelect.css';

function UserPokemonSelect({ onSelectPokemon, onRelease, usersPokemon, isForBattle }) {
  const [userPokemons, setUserPokemons] = useState([]);

  useEffect(() => {
    const fetchUserPokemons = async () => {
      if (!usersPokemon || !usersPokemon.current) {
        return;
      }

      const fetchedPokemons = [];
      for (let url of usersPokemon.current) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          fetchedPokemons.push(data);
        } catch (error) {
          console.error(`Error fetching Pokémon from ${url}:`, error);
        }
      }
      setUserPokemons(fetchedPokemons);
    };

    fetchUserPokemons();
  }, [usersPokemon]);

  const handleRelease = (pokemonName) => {
    onRelease(pokemonName);
    setUserPokemons(prevPokemons => 
      prevPokemons.filter(pokemon => pokemon.name !== pokemonName)
    );
  };

  return (
    <div className="user-pokemon-select-container">
      <h3>My Pokémons</h3>
      <div className="user-pokemon-list">
        {userPokemons.map((pokemon, index) => (
          <div key={index} className={`user-pokemon-card ${isForBattle ? 'battle-mode' : ''}`}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>{pokemon.name}</p>
            <span>HP: {pokemon.stats[0].base_stat}</span>
            <span>Attack: {pokemon.stats[1].base_stat}</span>

            {isForBattle ? (
              <button onClick={() => onSelectPokemon(pokemon)}>
                Choose this Pokémon
              </button>
            ) : (
              <button onClick={() => handleRelease(pokemon.name)}>
                Be Free
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPokemonSelect;