import './Header.css';

function Header() {
  const handleButtonClick = (buttonName) => {
    console.log(`${buttonName} button clicked`);
  };

  return (
    <header className="header">
      <h1 className="logo">Pokémon Explorer</h1>
      <nav className="nav">
        <button onClick={() => handleButtonClick('Locations')}>Locations</button>
        <button onClick={() => handleButtonClick('My Pokémons')}>My Pokémons</button>
        <button onClick={() => handleButtonClick('Friends')}>Friends</button>
        <button onClick={() => handleButtonClick('Login/Logout')}>Login/Logout</button>
      </nav>
    </header>
  );
}

export default Header;