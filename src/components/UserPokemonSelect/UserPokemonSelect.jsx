import { useState, useEffect } from 'react';
import './UserPokemonSelect.css';

function UserPokemonSelect({ onSelectPokemon, usersPokemon, isForBattle }) {
  const [userPokemons, setUserPokemons] = useState([]);

  useEffect(() => {
    const fetchUserPokemons = async () => {
      const fetchedPokemons = [];
      for (let url of usersPokemon.current) {
        try {
          const response = await fetch(url);
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

  return (
    <div className="user-pokemon-select-container">
      <h3>Your Pokémon</h3>
      <div className="user-pokemon-list">
        {userPokemons.map((pokemon, index) => (
          <div key={index} className={`user-pokemon-card ${isForBattle ? 'battle-mode' : ''}`}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
            <span>attack: {pokemon.stats[1].base_stat} </span>
            <span>hp: {pokemon.stats[0].base_stat}</span>
            
            {isForBattle ? (
              <button onClick={() => onSelectPokemon(pokemon)}>
                Choose this Pokémon
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPokemonSelect;