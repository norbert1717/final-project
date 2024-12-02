import { useState, useEffect } from 'react';
import './UserPokemonSelect.css';


// `UserPokemonSelect` component allowing the user to select one of their own Pokémon
function UserPokemonSelect({ onSelectPokemon, usersPokemon }) {
  const [userPokemons, setUserPokemons] = useState([]); 

  useEffect(() => {
    const fetchUserPokemons = async () => {
      const fetchedPokemons = []; // Initialize an array to store each fetched Pokémon
      
      // Fetch each Pokémon URL one at a time
      for (let url of usersPokemon.current) {
        try {
          const response = await fetch(url);
          const data = await response.json(); 
          fetchedPokemons.push(data); // Add the fetched data to the array
        } catch (error) {
          console.error(`Error fetching Pokémon from ${url}:`, error);
        }
      }
      
      setUserPokemons(fetchedPokemons); // Update state after all Pokémon are fetched
    };
  
    fetchUserPokemons();
  }, [usersPokemon]);

  return (
    <div className="user-pokemon-select-container">
      <h3>Your Pokémon</h3> {/* Title for user's Pokémon list */}
      <div className="user-pokemon-list">
        {userPokemons.map((pokemon, index) => (
          <div key={index} className="user-pokemon-card">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <p>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
            
            {/* Button to select this Pokémon */}
            <button onClick={() => onSelectPokemon(pokemon)}>
              Choose this Pokémon
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserPokemonSelect;