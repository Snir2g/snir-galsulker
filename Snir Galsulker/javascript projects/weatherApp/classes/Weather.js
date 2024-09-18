class Weather {
  constructor(
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
    this.dateTime = dateTime;
    this.tempeture = tempeture;
    this.feelsLike = feelsLike;
    this.minTempeture = minTempeture;
    this.maxTempeture = maxTempeture;
    this.humidity = humidity;
    this.weatherID = weatherID;
    this.weatherDescription = weatherDescription;
    this.weatherIcon = weatherIcon;
  }
}

export default Weather;
