import Location from "./Location.js";
import Weather from "./Weather.js";

class WeatherLocation extends Location {
  constructor(location, fiveDayForecast, currentWeatherData, lastupdate) {
    super(location.name, location.lat, location.lon, location.country);
    this.fiveDayForecast = fiveDayForecast;
    this.currentWeatherData = currentWeatherData;
    this.lastupdate = lastupdate;
  }

  pushItemForfiveDayForecast(weather) {
    fiveDayForecast.push(weather);
  }

  clearFiveDayForecast() {
    fiveDayForecast = [];
  }

  setCurrentWeatherData(weather) {
    currentWeatherData = weather;
  }

  setCurrentWeatherData(
    dateTime,
    tempeture,
    feelsLike,
    minTempeture,
    maxTempeture,
    humidity,
    weatherID,
    weatherDescription,
    weatherIcon
  ) {
    currentWeatherData = new Weather(
      dateTime,
      tempeture,
      feelsLike,
      minTempeture,
      maxTempeture,
      humidity,
      weatherID,
      weatherDescription,
      weatherIcon
    );
  }
}

export default WeatherLocation;
