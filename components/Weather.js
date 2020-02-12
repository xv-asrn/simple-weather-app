import React, { useState, useEffect } from 'react';

export default function Weather() {
  const [weather, setWeather] = useState([]);

  const [query, setQuery] = useState('');
  const [error, setError] = useState([]);

  const API_KEY = '95a0dcfcbc48eeaefa7815cee27e0354';

  const fetchWeather = e => {
    if (e.key === 'Enter') {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`
      )
        .then(result => result.json())
        .then(data => {
          setWeather(data);
          setQuery('');

          console.log(data);
        })
        .catch(err => setError);
    }
  };

  const dateBuilder = d => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="application">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search city..."
          className="search-bar"
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={fetchWeather}
        ></input>
        {typeof weather.main != 'undefined' ? (
          <div>
            <h1 className="city">
              {weather.name}, {weather.sys.country}
            </h1>
            <div className="date">{dateBuilder(new Date())}</div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}&deg;C</div>
            </div>

            <div className="current-weather">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              ></img>
              <p>{weather.weather[0].main}</p>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
