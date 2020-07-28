import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { CityWeather } from '../models/city-weather.model';
import {Observable, Subject} from "rxjs";
import { Store, select } from "@ngrx/store";
import {tap, map, switchMap} from 'rxjs/operators';
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
  city;
  ngOnInit(): void {
    this.store.dispatch(WeatherActions.searchCityById({ id: 215854, name: 'Tel Aviv' }))

    this.city$ = this.store.pipe(
      select('weather', 'currentCity'),

      map((res: CityWeather) => {
        console.log('city$ $$$$$$$$$$$$$$$$$$$$$$$$$$$ :: ', res);
        if (res) {
          this.city = res;
          this.isFavorite$ = this.store.pipe(
            select('weather', 'favorites'),
            map((favoriteCities: any[]) => {
              console.log('favoriteCities :: ', favoriteCities);
              console.log('this.city :: ', this.city);
              console.log('favoriteCities.filter(city => city.id === this.city.id); :: ', favoriteCities.filter(city => city.id === this.city.id))
              const isfav = favoriteCities.filter(city => city.id === this.city.id);
              return isfav.length > 0;
            }),
            // map((cities: any[]) => cities.includes(this.city.id) )
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
    console.log('%c this.city$ :: ', 'color: red;font-size:16px', this.city);
    if (operation === 'add') {
      this.store.dispatch(WeatherActions.addToFav({
        // change later when tou have da city key
        city: this.city,
      }))
    } else if ('remove') {
      this.store.dispatch(WeatherActions.removeFromFav({
        // change later when tou have da city key
        city: this.city,
      }))
    }

  }

}
