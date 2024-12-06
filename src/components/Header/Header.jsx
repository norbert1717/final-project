import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate(); 

  const handleButtonClick = (buttonName) => {
    console.log(`${buttonName} button clicked`);
    if (buttonName === 'Locations') {
      navigate('/locations');
    } else if (buttonName === 'My Pokémons') {
      navigate('/mypokemons'); 
    }
  };

  return (
    <header className="header">
      <h1 className="logo">Pokémon Explorer</h1>
      <nav className="nav">
        <button onClick={() => handleButtonClick('Locations')}>Locations</button>
        <button onClick={() => handleButtonClick('My Pokémons')}>My Pokémons</button>
      </nav>
    </header>
  );
}

export default Header;