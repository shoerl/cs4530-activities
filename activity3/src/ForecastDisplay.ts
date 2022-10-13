import WeatherData from './WeatherData';
import WeatherDataObserver from './WeatherDataObserver';

export default class ForecastDisplay implements WeatherDataObserver {
  private _currentPressure = 0;

  private _lastPressure = 0;

  constructor (theWeatherData: WeatherData) {
    theWeatherData.addDisplay(this)
  }
  
  displayForecast(weatherData: WeatherData): void {
    this._lastPressure = this._currentPressure;
    this._currentPressure = weatherData.pressure;
    let forecast;
    if (this._currentPressure > this._lastPressure)
      forecast = 'Improving weather on the way!';
    else if (this._currentPressure === this._lastPressure)
      forecast = 'More of the same';
    else
      forecast = 'Watch out for cooler, rainy weather';
    // eslint-disable-next-line
    console.log('Forecast: %s', forecast);
  }

  notify(newData: WeatherData): void { 
    this.displayForecast(newData)
  }

}
