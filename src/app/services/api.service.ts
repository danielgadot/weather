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
    return this.http.get(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`, { params: { apikey: API_KEY }})
    // return of({
    //   EpochTime: 1595975760,
    //   HasPrecipitation: false,
    //   IsDayTime: false,
    //   Link: "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
    //   LocalObservationDateTime: "2020-07-29T01:36:00+03:00",
    //   MobileLink: "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
    //   PrecipitationType: null,
    //   Temperature: {Metric: {Value: 27.1, Unit: "C", UnitType: 17}, Imperial: {Value: 81, Unit: "F", UnitType: 18}},
    //   WeatherIcon: 34,
    //   WeatherText: "Mostly clear"
    // })
  }

  getForecast(locationKey) {
    return this.http.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`, { params: { apikey: API_KEY }})
    // return of({
    //   "Headline": {
    //     "EffectiveDate": "2020-08-01T08:00:00+03:00",
    //     "EffectiveEpochDate": 1596258000,
    //     "Severity": 4,
    //     "Text": "Pleasant Saturday",
    //     "Category": "mild",
    //     "EndDate": null,
    //     "EndEpochDate": null,
    //     "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/extended-weather-forecast/215854?lang=en-us",
    //     "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
    //   },
    //   "DailyForecasts": [
    //     {
    //       "Date": "2020-07-28T07:00:00+03:00",
    //       "EpochDate": 1595908800,
    //       "Temperature": {
    //         "Minimum": {
    //           "Value": 78,
    //           "Unit": "F",
    //           "UnitType": 18
    //         },
    //         "Maximum": {
    //           "Value": 91,
    //           "Unit": "F",
    //           "UnitType": 18
    //         }
    //       },
    //       "Day": {
    //         "Icon": 1,
    //         "IconPhrase": "Sunny",
    //         "HasPrecipitation": false
    //       },
    //       "Night": {
    //         "Icon": 34,
    //         "IconPhrase": "Mostly clear",
    //         "HasPrecipitation": false
    //       },
    //       "Sources": [
    //         "AccuWeather"
    //       ],
    //       "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
    //       "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
    //     },
    //     {
    //       "Date": "2020-07-29T07:00:00+03:00",
    //       "EpochDate": 1595995200,
    //       "Temperature": {
    //         "Minimum": {
    //           "Value": 78,
    //           "Unit": "F",
    //           "UnitType": 18
    //         },
    //         "Maximum": {
    //           "Value": 91,
    //           "Unit": "F",
    //           "UnitType": 18
    //         }
    //       },
    //       "Day": {
    //         "Icon": 1,
    //         "IconPhrase": "Sunny",
    //         "HasPrecipitation": false
    //       },
    //       "Night": {
    //         "Icon": 33,
    //         "IconPhrase": "Clear",
    //         "HasPrecipitation": false
    //       },
    //       "Sources": [
    //         "AccuWeather"
    //       ],
    //       "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
    //       "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
    //     },
    //     {
    //       "Date": "2020-07-30T07:00:00+03:00",
    //       "EpochDate": 1596081600,
    //       "Temperature": {
    //         "Minimum": {
    //           "Value": 78,
    //           "Unit": "F",
    //           "UnitType": 18
    //         },
    //         "Maximum": {
    //           "Value": 91,
    //           "Unit": "F",
    //           "UnitType": 18
    //         }
    //       },
    //       "Day": {
    //         "Icon": 1,
    //         "IconPhrase": "Sunny",
    //         "HasPrecipitation": false
    //       },
    //       "Night": {
    //         "Icon": 33,
    //         "IconPhrase": "Clear",
    //         "HasPrecipitation": false
    //       },
    //       "Sources": [
    //         "AccuWeather"
    //       ],
    //       "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
    //       "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us"
    //     },
    //     {
    //       "Date": "2020-07-31T07:00:00+03:00",
    //       "EpochDate": 1596168000,
    //       "Temperature": {
    //         "Minimum": {
    //           "Value": 79,
    //           "Unit": "F",
    //           "UnitType": 18
    //         },
    //         "Maximum": {
    //           "Value": 89,
    //           "Unit": "F",
    //           "UnitType": 18
    //         }
    //       },
    //       "Day": {
    //         "Icon": 1,
    //         "IconPhrase": "Sunny",
    //         "HasPrecipitation": false
    //       },
    //       "Night": {
    //         "Icon": 36,
    //         "IconPhrase": "Intermittent clouds",
    //         "HasPrecipitation": false
    //       },
    //       "Sources": [
    //         "AccuWeather"
    //       ],
    //       "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
    //       "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us"
    //     },
    //     {
    //       "Date": "2020-08-01T07:00:00+03:00",
    //       "EpochDate": 1596254400,
    //       "Temperature": {
    //         "Minimum": {
    //           "Value": 77,
    //           "Unit": "F",
    //           "UnitType": 18
    //         },
    //         "Maximum": {
    //           "Value": 88,
    //           "Unit": "F",
    //           "UnitType": 18
    //         }
    //       },
    //       "Day": {
    //         "Icon": 2,
    //         "IconPhrase": "Mostly sunny",
    //         "HasPrecipitation": false
    //       },
    //       "Night": {
    //         "Icon": 34,
    //         "IconPhrase": "Mostly clear",
    //         "HasPrecipitation": false
    //       },
    //       "Sources": [
    //         "AccuWeather"
    //       ],
    //       "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
    //       "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us"
    //     }
    //   ]
    // })
  }
}
