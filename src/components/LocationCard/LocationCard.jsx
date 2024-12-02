import './LocationCard.css';

function LocationCard({ location, onClick }) {
  // Function to format the location name nicely
  const formatName = (name) => {
    return name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Handle click on the location name button
  const handleLocationClick = () => {
    console.log(`Location "${formatName(location.name)}" button clicked`);
    onClick(); // Call the onClick prop passed from App
  };

  return (
    <div className="location-card">
      {/* Display the formatted location name as a button */}
      <button
        className="location-name-button"
        onClick={handleLocationClick} // Use handleLocationClick
      >
        {formatName(location.name)}
      </button>
    </div>
  );
}

export default LocationCard;