import CurrentConditionsDisplay from './CurrentConditionsDisplay';
import ForecastDisplay from './ForecastDisplay';
import HeatIndexDisplay from './HeatIndexDisplay';
import StatisticsDisplay from './StatisticsDisplay';
import WeatherData from './WeatherData';

const weatherData = new WeatherData();

weatherData.addDisplay(new CurrentConditionsDisplay(weatherData));

weatherData.addDisplay(new ForecastDisplay(weatherData));

weatherData.addDisplay(new HeatIndexDisplay(weatherData));

weatherData.addDisplay(new StatisticsDisplay(weatherData));

weatherData.setMeasurements(80, 65, 30.4);

weatherData.setMeasurements(82, 70, 29.2);

weatherData.setMeasurements(78, 90, 29.2);
