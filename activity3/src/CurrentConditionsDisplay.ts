import WeatherData from './WeatherData';
import WeatherDataObserver from './WeatherDataObserver';

export default class CurrentConditionsDisplay implements WeatherDataObserver {

  constructor (weatherData: WeatherData) {
    weatherData.addDisplay(this)
  }
  
  static displayCurrentConditions(weatherData: WeatherData): void {
    // eslint-disable-next-line
    console.log('Current conditions: %fF degrees and %f% humidity', weatherData.temperature, weatherData.humidity);
  }

  notify(newData: WeatherData): void { 
    CurrentConditionsDisplay.displayCurrentConditions(newData)
  }
}
