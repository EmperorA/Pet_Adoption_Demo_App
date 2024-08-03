import { useState, useEffect } from 'react';
import { getCityFromCoordinates } from '../services/locationUtils'; // Adjust the path as needed

export default function Location (){
 
    const [city, setCity] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const cityName = await getCityFromCoordinates(latitude, longitude);
            if (cityName) {
              setCity(cityName);
            } else {
              setError('Unable to retrieve city name.');
            }
          },
          (geoError) => {
            console.error('Error getting user location:', geoError);
            setError('Unable to retrieve location.');
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    }, []);
  
    return (
      <div style={{marginLeft: '20px'}}>
        {city ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
          <p style={{fontSize: '10px', color: 'white'}}>Location <img src="./src/assets/down-arrow.svg" alt="down-arrow"/></p>
          <p>{city}</p>
          </div>
        ) : (
          <p>{error ? error : 'Fetching your city...'}</p>
        )}
      </div>
    );
  }