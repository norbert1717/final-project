import { useEffect } from "react";
import LocationCard from "./LocationCard/LocationCard";


export default function Locations({ locations, handleLocationClick, setShowWelcome }) {

  useEffect(() => {
    setShowWelcome(false);
  }, [setShowWelcome])

  return (
    (
      <div className="locations-grid">
        {locations.map((location) => (
          <LocationCard
            key={location.name}
            location={location}
            onClick={() => handleLocationClick(location)}
          />
        ))}
      </div>
    )
  )
}