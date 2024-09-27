async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]
  

  let weatherWidget = document.querySelector('#weatherWidget');
  weatherWidget.style.display = 'none';

  const dropDown = document.querySelector('#citySelect');
  dropDown.addEventListener('change', (evt) => {
    const selectedCity = evt.target.value;
    //console.log(`${selectedCity} selected`);

    evt.target.disabled = true;

    weatherWidget.style.display = 'none';

    document.querySelector('.info').textContent = `Fetching weather data...`

    var weatherData = `http://localhost:3003/api/weather?city=${selectedCity}`;
  axios.get(weatherData)
  .then(res => {
    weatherData = res.data;
    //console.log(weatherData)

     document.querySelector('.info').textContent = ``;
     evt.target.disabled = false;
     weatherWidget.style.display = 'inline';

    const tempToday = document.querySelector('#apparentTemp');
    tempToday.children[1].textContent = `${weatherData.current.apparent_temperature}\u00B0`;

    const matchingEmoji = descriptions.find(description =>
      description[0] === weatherData.current.weather_description)[1]
    document.querySelector('#todayDescription').innerText = matchingEmoji;

    const todayStats = document.querySelector('#todayStats');
    todayStats.children[0].textContent = `${weatherData.current.temperature_max}\u00B0/${weatherData.current.temperature_min}\u00B0`;
    todayStats.children[1].textContent = `Precipitation: ${weatherData.current.precipitation_probability * 100}%`;

    todayStats.children[2].textContent = `Humidity: ${weatherData.current.humidity}%`;

    todayStats.children[3].textContent = `Wind: ${weatherData.current.wind_speed} m/s`

    const forcast = document.querySelectorAll('.next-day');
    forcast.forEach((day, index) => {
      const dailyForecast = weatherData.forecast.daily[index];
      const matchingEmoji = descriptions.find(description => description[0] === dailyForecast.weather_description)[1];

      if (dailyForecast) {
      const date = new Date(dailyForecast.date);
      day.querySelector('div:nth-child(1)').textContent = date.toLocaleDateString('en-US', { weekday: 'long' });

      day.querySelector('div:nth-child(2)').textContent = matchingEmoji ;

      day.querySelector('div:nth-child(3)').textContent = `${dailyForecast.temperature_max}\u00B0/${dailyForecast.temperature_min}\u00B0`;

      day.querySelector('div:nth-child(4)').textContent = `Precipitation: ${dailyForecast.precipitation_probability * 100}`
     }
    })

    const location = document.querySelector('#location');
    location.children[0].textContent = weatherData.location.city
    location.children[1].textContent = weatherData.location.country

  })
  .catch(err => {
    console.log(err.message)
  })
  .finally(() => {
    console.log('Done!')
  })

  })



  

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
