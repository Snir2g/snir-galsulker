import Weather from "./WeatherLocation.js";

const API_KEY = "7818564f86e51491552159c819494582";

class WeatherApiManager {
  constructor() {
    this.savedLocations = [];
    this.weatherLocations = [];
    this.currentWeatherLocationsDisplay = -1; //no locations in start
  }

  static async getAPIRequestCurrentWeatherData(lat, lon) {
    let urlRequset = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    try {
      const response = await fetch(urlRequset);
      const CurrentWeatherDataResponse = await response.json();
      this.extratWeather(CurrentWeatherDataResponse);
    } catch (e) {}
  }

  static extratWeather(weather) {
    return new Weather(
      new Location(
        weather.sys.id,
        weather.sys.country,
        lat,
        lon,
        weather.sys.country
      )
    );
  }

  addLoctaion(id, name, lat, lon, country) {
    savedLocations.push(new Location(id, name, lat, lon, country));
  }

  addWeatherLocation(location, fiveDayForecast, currentWeatherData) {
    this.weatherLocations.push(
      new WeatherLocation(location, fiveDayForecast, currentWeatherData)
    );
  }

  deleteLocation(id) {
    this.savedLocations = this.savedLocations.filter(
      (savedLocation) => savedLocation.id != id
    );
    this.weatherLocations = this.weatherLocations.filter(
      (weatherLocation) => weatherLocation.location.id != id
    );
  }

  updateTaskDescription(id, newDesc) {
    let indexToUpdate = this.tasks.findIndex((task) => task.id == id);
    this.tasks[indexToUpdate].description = newDesc;
  }
  completeTask(id) {
    let indexToUpdate = this.tasks.findIndex((task) => task.id == id);
    this.tasks[indexToUpdate].completed = true;
  }
}

export default WeatherApiManager;
