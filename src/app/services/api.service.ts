import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
const API_KEY = "EU1nwEDPNaZZfOPxC7PcwNkkdjOprVBq";

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) {

  }

  searchLocation(searchValue){
    return this.http.get('https://dataservice.accuweather.com/locations/v1/cities/autocomplete', { params: { q: `${searchValue}`, apikey: API_KEY }})
  }

  getCurrentWeather(locationKey) {
    return this.http.get(`https://dataservice.accuweather.com/currentconditions/v1/${locationKey}`, { params: { apikey: API_KEY }})
  }

  getForecast(locationKey) {
    return this.http.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`, { params: { apikey: API_KEY }})
  }

  getGeoPosition(lat, lon) {
    return this.http.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search`, { params: { q: `${lat},${lon}`, apikey: API_KEY }})
  }
}
