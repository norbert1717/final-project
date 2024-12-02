import { useState } from 'react';
import './BattleScreen.css';

function BattleScreen({ playerPokemon, enemyPokemon, onCatch, onRun }) {
  const [playerHP, setPlayerHP] = useState(playerPokemon.stats.hp); // Player's current HP
  const [enemyHP, setEnemyHP] = useState(enemyPokemon.stats.hp); // Enemy's current HP
  const [catchEnabled, setCatchEnabled] = useState(false); // Catch button enabled status

  const calculateDamage = (attacker, defender) => {
    const { attack } = attacker.stats;
    const { defense } = defender.stats;
    const Z = Math.floor(Math.random() * (255 - 217 + 1)) + 217; // Random multiplier
    return Math.max(Math.floor(((((2 / 5 + 2) * attack * 60) / defense) / 50) + 2) * Z / 255, 1); // Min 1 damage
  };

  const handleAttack = () => {
    const playerDamage = calculateDamage(playerPokemon, enemyPokemon);
    const enemyDamage = calculateDamage(enemyPokemon, playerPokemon);

    setEnemyHP((prev) => Math.max(Math.round(prev - playerDamage, 0))); // Reduce enemy HP
    setPlayerHP((prev) => Math.max(Math.round(prev - enemyDamage, 0))); // Reduce player HP

    if (enemyHP - playerDamage <= 0) {
      setCatchEnabled(true); // Enable catch when enemy HP reaches 0
    }
  };

  const handleCatch = () => {
    if (catchEnabled) {
      onCatch(enemyPokemon); // Trigger the catch logic
    }
  };

  return (
    <div className="battle-screen">
      <h2>Battle Screen</h2>
      <div className="battle-pokemon-container">
        <div className="player-pokemon">
          <h3>{playerPokemon.name}</h3>
          <img src={playerPokemon.sprite} alt={playerPokemon.name} />
          <p>HP: {playerHP <= 0 ? 0 : playerHP}</p>
        </div>
        <div className="enemy-pokemon">
          <h3>{enemyPokemon.name}</h3>
          <img src={enemyPokemon.sprite} alt={enemyPokemon.name} />
          <p>HP: {enemyHP <= 0 ? 0 : enemyHP}</p>
        </div>
      </div>
      <div className="battle-actions">
        <button onClick={handleAttack} disabled={playerHP <= 0 || enemyHP <= 0}>Attack</button>
        <button onClick={handleCatch} disabled={!catchEnabled}>Catch</button>
        <button onClick={onRun}>Run</button>
      </div>
    </div>
  );
}

export default BattleScreen;