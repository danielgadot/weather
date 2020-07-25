import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { CityWeather } from '../models/city-weather.model';
import {Observable, Subject} from "rxjs";
import { Store, select } from "@ngrx/store";
import { tap, map } from 'rxjs/operators';
import * as WeatherActions from '../store/actions/weather.actions';
import { State } from '../store/reducers/weather.reducer';

@Component({
  selector: 'city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})
export class CityWeatherComponent implements OnInit {

  constructor(private apiService: ApiService, private store: Store<State>) { }

  temperature$: Subject<any> = new Subject<any>();
  city$: Observable<any>;
  forecastDays$: Observable<any>;
  isFavorite$: Observable<boolean>;
  // get from store
  cityKey: number = 215854;

  ngOnInit(): void {
    this.store.dispatch(WeatherActions.searchCityById({ id: 215854 }))

    this.city$ = this.store.pipe(
      select('weather', 'currentCity'),

      map((res: CityWeather) => {
        console.log('city$ :: ', res);
        if (res) {
          this.isFavorite$ = this.store.pipe(
            select('weather', 'favorites'),
            tap((favoriteCities: Number[]) => {
              console.log('favoriteCities :: ', favoriteCities)
              console.log('favoriteCities :: ', favoriteCities.includes(this.cityKey))

            }),
            map((cities: Number[]) => cities.includes(this.cityKey) )
            )
          return res
        } else {
          console.log('city$ :: ', res)
        }
      }),
    );
    this.store.dispatch(WeatherActions.getForecastDays({ id: 215854 }))
    this.store.pipe(
      select('weather', 'loaded'),
      tap(() => this.store.dispatch(WeatherActions.getForecastDays({ id: 215854 })))
    )
      this.forecastDays$ = this.store.pipe(
        select('weather', 'forecastDays'),
        tap((res) => console.log('forecastDays :: ', res)),
        map(res => res)
      )
  }

  addRemoveFavorite(operation) {
    if (operation === 'add') {
    this.store.dispatch(WeatherActions.addToFav({
      // change later when tou have da city key
      cityKey: this.cityKey,
    }))
    } else if ('remove') {
      this.store.dispatch(WeatherActions.removeFromFav({
        // change later when tou have da city key
        cityKey: this.cityKey,
      }))
    }

  }

}
