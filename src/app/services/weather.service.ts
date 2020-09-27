import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor() { }

  getWeatherIcon(weatherText) {
    if (weatherText.match(/sun/gi)) {
      return 'sunny';
    } else if (weatherText.match(/rain|showers/gi)) {
      return 'rain';
    } else if (weatherText.match(/cloud/gi)) {
      return 'cloudy';
    }
  }
}
