import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { CityWeather } from '../models/city-weather.model';
import {Observable, Subject} from "rxjs";
import { Store, select } from "@ngrx/store";
import {tap, map, switchMap} from 'rxjs/operators';
import * as WeatherActions from '../store/weather/actions/weather.actions';
import { State } from '../store/weather/reducers/weather.reducer';

@Component({
  selector: 'city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss']
})
export class CityWeatherComponent implements OnInit {

  constructor(private apiService: ApiService, private store: Store<State>) { }

  city$: Observable<any>;
  forecastDays$: Observable<any>;
  isFavorite$: Observable<boolean>;
  // get from store
  city;
  ngOnInit(): void {
    this.store.dispatch(WeatherActions.searchCityById({ id: 215854, name: 'Tel Aviv' }))

    this.city$ = this.store.pipe(
      select('weather', 'currentCity'),

      map((res: CityWeather) => {
        if (res) {
          this.city = res;
          this.isFavorite$ = this.store.pipe(
            select('weather', 'favorites'),
            map((favoriteCities: any[]) => {
              const isfav = favoriteCities.filter(city => city.id === this.city.id);
              return isfav.length > 0;
            }),
            )
          return res
        } else {
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
        map(res => res)
      )
  }

  addRemoveFavorite(operation) {
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
