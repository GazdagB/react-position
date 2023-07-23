import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy URL

const App = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [time, setTime] = useState([]);

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

  useEffect(() => {
    if (userLocation) {
      const url = `${CORS_PROXY}https://timeapi.io/api/Time/current/coordinate?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`;

      axios.get(url)
        .then((response) => {
          setTime([response.data]);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [userLocation]);

  return (
    <div>
      <h1>User Location:</h1>
      {time.map((item) => (
        <div key={item.id}>
          <p>Timezone: {item.timezone}</p>
          <p>Time: {item.date_time}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
