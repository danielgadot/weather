import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import * as config from './../../assets/config.json';
import { Config } from '../models/config';
import {Observable} from "rxjs";
import {Geoposition} from "../models/geoposition";
import { Forecast } from "../models/forecast.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) {

  }

  searchLocation(searchValue: string): Observable<Config>{
    return this.http.get<Config>(`${config.baseUrl}/locations/v1/cities/autocomplete`, { params: { q: `${searchValue}`, apikey: config.API_KEY }})
  }

  getCurrentWeather(locationKey): Observable<Config> {
    return this.http.get<Config>(`${config.baseUrl}/currentconditions/v1/${locationKey}`, { params: { apikey: config.API_KEY }})
  }

  getForecast(locationKey): Observable<Forecast> {
    return this.http.get<Forecast>(`${config.baseUrl}/forecasts/v1/daily/5day/${locationKey}`, { params: { apikey: config.API_KEY }})
  }

  getGeoPosition(lat, lon): Observable<Geoposition> {
    return this.http.get<Geoposition>(`${config.baseUrl}/locations/v1/cities/geoposition/search`, { params: { q: `${lat},${lon}`, apikey: config.API_KEY }})
  }
}
