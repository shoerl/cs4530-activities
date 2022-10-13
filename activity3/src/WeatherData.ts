import WeatherDataObserver from './WeatherDataObserver';

export default class WeatherData {
  private _temperature = 0;

  get temperature(): number {
    return this._temperature;
  }

  private _humidity = 0;

  get humidity(): number {
    return this._humidity;
  }

  private _pressure = 0;

  get pressure(): number {
    return this._pressure;
  }

  private _displays: WeatherDataObserver[] = [];

  get displays(): WeatherDataObserver[] {
    return this._displays;
  }

  public addDisplay(obs:WeatherDataObserver): void {
    this._displays.push(obs);
  }

  private notifyAll() {
    this._displays.forEach(obs => obs.notify(this));
  }

  public setMeasurements(temperature: number, humidity: number, pressure: number): void {
    this._temperature = temperature;
    this._humidity = humidity;
    this._pressure = pressure;
    this.notifyAll()
  }

  /*
  private measurementsChanged() {
    this._statisticsDisplay.displayStatistics(this);
    this._forecastDisplay.displayForecast(this);
    CurrentConditionsDisplay.displayCurrentConditions(this);
    HeatIndexDisplay.displayHeatIndex(this);
  }
  */
}
