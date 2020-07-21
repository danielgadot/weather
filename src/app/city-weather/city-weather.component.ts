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

  ngOnInit(): void {
    // this.store.dispatch(WeatherActions.searchCity({ id: 215854 }))

    this.city$ = this.store.pipe(
      select('weather', 'currentCityWeather'),

      map((res: CityWeather) => {
        console.log('city$ :: ', res)
        if (res) {
          return res.Temperature.Metric.Value
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
        map(res => res)
      )
  }

  addToFav() {
    this.store.dispatch(WeatherActions.addToFav({
      city: 'new city',
      temperature: -2,
      desc: 'Sunny'
    }))
  }

}
