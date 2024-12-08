import { useNavigate } from 'react-router';
import './WelcomeScreen.css';

function WelcomeScreen() {

const navigate = useNavigate();

const handleClick = () => {
  navigate('/locations')

}

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to my PokéWorld!</h1>
        <button className="start-button" onClick={handleClick}>
          Jump to the locations
        </button>
      </div>
    </div>
  );
}

export default WelcomeScreen;