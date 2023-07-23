import React, { useEffect, useState } from 'react';

const App = () => {
  const [userLocation, setUserLocation] = useState(null);


  //Fetching the user's location on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.log('Geolocation is not available in this browser.');
    }
  }, []);


  return (
    <div>
      <h1>User Location:</h1>
      {userLocation ? (
        <p>
          Latitude: {userLocation.latitude}, Longitude: {userLocation.longitude}
        </p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default App;
