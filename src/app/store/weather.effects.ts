import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {switchMap, map, tap, catchError, mergeMap} from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import {
  searchCity,
  addToFav,
  removeFromFav,
  fetchedCitySuccess,
  getForecastDays,
  setForecastDays,
  searchCityById,
  setSearchResult,
  setFavorites
} from './weather/actions/weather.actions';
import { of, Observable } from "rxjs";
import { CityWeather } from '../models/city-weather.model';
import { State } from './weather/reducers/weather.reducer';
import { Store, select } from "@ngrx/store";
import * as WeatherActions from "./weather/actions/weather.actions";

@Injectable()
export class WeatherEffects {
  constructor(private apiService: ApiService, private actions$: Actions, private store: Store<State>) {}

    ngrxOnInitEffects(): Action {
      const favorites = JSON.parse(localStorage.getItem('favorites'));
      this.store.dispatch(setFavorites({ favorites }))
      this.store.dispatch(WeatherActions.searchCityById({ id: 215854, name: 'Tel Aviv' }));
      this.store.dispatch(WeatherActions.getForecastDays({ id: 215854 }))
      return { type: '[UserEffects]: Init' };
    }

  getCurrentWeather$ = createEffect(
    (): any => this.actions$.pipe(
        ofType(searchCity),
        switchMap((action: CityWeather) => {
          return this.searchLocationStream(action)
        })
    ));

  getCurrentWeatherbyId$ = createEffect(
    (): any => this.actions$.pipe(
      ofType(searchCityById),
      map((action: any) => {
        this.getCurrentWeather(action);
        return {type: 'loading city current weather'}
      })
    ));


    private searchLocationStream(action) {
      return this.apiService.searchLocation(action.searchWord).pipe(
        map((citiesFound) => {
          this.store.dispatch(setSearchResult({ cities: citiesFound }))
          return {type: 'dispatched cities found'}
        })
      )
    }

    private getCurrentWeather(action) {
      return this.apiService.getCurrentWeather(action.id).pipe(
        map(cities => cities[0]),
        map(city => this.store.dispatch(fetchedCitySuccess({
          id: action.id,
          name:  action.name,
          temperature: {
            min: 0,
            max: 0,
            current: city.Temperature.Metric.Value
          },
          weatherText: city.WeatherText
        }))),
        catchError(error => of(console.log(' err :: ', error))),
      ).subscribe()
    }

    getForecast$ = createEffect(
      () => this.actions$.pipe(
        ofType(getForecastDays),
        map((res) => { return this.apiService.getForecast(res.id).pipe(

        map(forecastDays => (forecastDays as any).DailyForecasts),
        map(forecastDays => {
          let newForecastDays;
          if (forecastDays) {
            newForecastDays = forecastDays.map(day => {
              return {
                date: day.Date,
                weatherText: day.Day.IconPhrase,
                temperature: {
                  min: day.Temperature.Minimum.Value,
                  max: day.Temperature.Maximum.Value,
                }
              }
            })
          }
          return newForecastDays
        }),
          tap((forecastDays) => {
            this.store.dispatch(setForecastDays({ forecastDays }));
          }),
        ).subscribe() }),
      )
    , { dispatch: false })

}
