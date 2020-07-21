import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
const API_KEY = "EU1nwEDPNaZZfOPxC7PcwNkkdjOprVBq";
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) {

  }

  searchLocation(searchValue){
    return this.http.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete', { params: { q: `${searchValue}`, apikey: API_KEY }})
  }

  getCurrentWeather(locationKey) {
    console.log('locationKey :: ', locationKey)
    return this.http.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`, { params: { apikey: API_KEY }})
  }

  getForecast(locationKey) {
    // return this.http.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`, { params: { apikey: API_KEY }})
    return of({
      "Headline": {
        "EffectiveDate": "2020-07-15T02:00:00+02:00",
        "EffectiveEpochDate": 1594771200,
        "Severity": 3,
        "Text": "Showers and thunderstorms around late Tuesday night through late Wednesday night",
        "Category": "thunderstorm",
        "EndDate": "2020-07-16T08:00:00+02:00",
        "EndEpochDate": 1594879200,
        "MobileLink": "http://m.accuweather.com/en/ch/meisterschwanden/1/extended-weather-forecast/1?lang=en-us",
        "Link": "http://www.accuweather.com/en/ch/meisterschwanden/1/daily-weather-forecast/1?lang=en-us"
      },
      "DailyForecasts": [
        {
          "Date": "2020-07-13T07:00:00+02:00",
          "EpochDate": 1594616400,
          "Temperature": {
            "Minimum": {
              "Value": 54.0,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 77.0,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 2,
            "IconPhrase": "Mostly sunny",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 35,
            "IconPhrase": "Partly cloudy",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/ch/meisterschwanden/1/daily-weather-forecast/1?day=1&lang=en-us",
          "Link": "http://www.accuweather.com/en/ch/meisterschwanden/1/daily-weather-forecast/1?day=1&lang=en-us"
        },
        {
          "Date": "2020-07-14T07:00:00+02:00",
          "EpochDate": 1594702800,
          "Temperature": {
            "Minimum": {
              "Value": 55.0,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 79.0,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 4,
            "IconPhrase": "Intermittent clouds",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 40,
            "IconPhrase": "Mostly cloudy w/ showers",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Light"
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/ch/meisterschwanden/1/daily-weather-forecast/1?day=2&lang=en-us",
          "Link": "http://www.accuweather.com/en/ch/meisterschwanden/1/daily-weather-forecast/1?day=2&lang=en-us"
        },
        {
          "Date": "2020-07-15T07:00:00+02:00",
          "EpochDate": 1594789200,
          "Temperature": {
            "Minimum": {
              "Value": 56.0,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 67.0,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 15,
            "IconPhrase": "Thunderstorms",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Moderate"
          },
          "Night": {
            "Icon": 12,
            "IconPhrase": "Showers",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Light"
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/ch/meisterschwanden/1/daily-weather-forecast/1?day=3&lang=en-us",
          "Link": "http://www.accuweather.com/en/ch/meisterschwanden/1/daily-weather-forecast/1?day=3&lang=en-us"
        },
        {
          "Date": "2020-07-16T07:00:00+02:00",
          "EpochDate": 1594875600,
          "Temperature": {
            "Minimum": {
              "Value": 53.0,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 67.0,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 4,
            "IconPhrase": "Intermittent clouds",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 35,
            "IconPhrase": "Partly cloudy",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/ch/meisterschwanden/1/daily-weather-forecast/1?day=4&lang=en-us",
          "Link": "http://www.accuweather.com/en/ch/meisterschwanden/1/daily-weather-forecast/1?day=4&lang=en-us"
        },
        {
          "Date": "2020-07-17T07:00:00+02:00",
          "EpochDate": 1594962000,
          "Temperature": {
            "Minimum": {
              "Value": 52.0,
              "Unit": "F",
              "UnitType": 18
            },
            "Maximum": {
              "Value": 73.0,
              "Unit": "F",
              "UnitType": 18
            }
          },
          "Day": {
            "Icon": 3,
            "IconPhrase": "Partly sunny",
            "HasPrecipitation": false
          },
          "Night": {
            "Icon": 33,
            "IconPhrase": "Clear",
            "HasPrecipitation": false
          },
          "Sources": [
            "AccuWeather"
          ],
          "MobileLink": "http://m.accuweather.com/en/ch/meisterschwanden/1/daily-weather-forecast/1?day=5&lang=en-us",
          "Link": "http://www.accuweather.com/en/ch/meisterschwanden/1/daily-weather-forecast/1?day=5&lang=en-us"
        }
      ]
    })


  }
}
