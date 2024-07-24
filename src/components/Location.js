import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FiMapPin } from "react-icons/fi";
import { AppContext } from '../context/AppContext';

const API_KEY = process.env.REACT_APP_API_KEY;

const Location = () => {
    const {isLoggedIn} = useContext(AppContext);
    const [city, setCity] = useState('');
    const [area, setArea] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                const { latitude, longitude } = position.coords;

                axios
                    .get(
                    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
                    )
                    .then((response) => {
                    if (response.data.results.length > 0) {
                        const result = response.data.results[0];
                        const city = result.components.city || result.components.town || result.components.village;
                        const area = result.components.suburb || result.components.neighbourhood || result.components.locality;
                        setCity(city);
                        setArea(area);
                    } else {
                        setError('Unable to retrieve city name.');
                    }
                    })
                    .catch((error) => {
                        setError('Error fetching city name.');
                    });
                },
                (error) => {
                    setError(error.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);
  return (
    <div className={`flex items-end gap-1 ${!isLoggedIn && 'max-sm:w-[90vw] max-sm:items-center'}`}>
        <div className='pb-1'><FiMapPin className='text-2xl text-gray-500 max-sm:text-xl'/></div>
        {!error && 
        (
            <div className={`flex flex-col ${!isLoggedIn && 'max-sm:flex-row max-sm:items-baseline max-sm:gap-2'}`}>
                <div className='text-base font-bold text-gray-600 max-sm:text-sm'>{city},</div>
                <div className='text-xs font-semibold text-gray-400 max-sm:text-gray-500'>{area}</div>
            </div>
        )}
    </div>
  )
}

export default Location