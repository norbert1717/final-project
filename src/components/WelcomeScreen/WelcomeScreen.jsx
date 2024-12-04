import './WelcomeScreen.css';

function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to my PokéWorld!</h1>
        <button className="start-button" onClick={onStart}>
          Jump to the locations
        </button>
      </div>
    </div>
  );
}

export default WelcomeScreen;