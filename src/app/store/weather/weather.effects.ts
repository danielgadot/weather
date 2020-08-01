import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {switchMap, map, tap, catchError, mergeMap, exhaustMap} from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { initialState }  from './reducers/weather.reducer';
import { EMPTY } from 'rxjs'
import {
  searchCity,
  addToFav,
  removeFromFav,
  getForecastDays,
  setForecastDays,
  getCityWeatherById,
  setSearchResult,
  setFavorites,
  // setCurrentCity
} from './actions/weather.actions';
import { of, Observable } from "rxjs";
import { City } from '../../models/city.model';
import { State } from './reducers/weather.reducer';
import { Store, select } from "@ngrx/store";
import * as WeatherActions from "./actions/weather.actions";
import {action} from "../../models/action.model";

@Injectable()
export class WeatherEffects {
  constructor(private apiService: ApiService, private actions$: Actions, private store: Store<State>) {}

  ngrxOnInitEffects(): Action {
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    this.store.dispatch(WeatherActions.getCityWeatherById({ id: initialState.currentCity.id }));
    this.store.dispatch(WeatherActions.getForecastDays({ id: initialState.currentCity.id }));
    this.store.dispatch(setFavorites({ favorites }))
    return { type: '[WeatherEffects]: Init' };
  }

  searchCity$ = createEffect(
    (): any => this.actions$.pipe(
      ofType(searchCity),
      tap(payload => console.log('%c payload in getCurrentWeather$:: ', 'color: red;font-size:16px', payload)),
      switchMap((payload: { searchWord: string, type: string } ) => {
          return this.apiService.searchLocation(payload.searchWord).pipe(
            map((citiesFound) => {
              console.log('%c searchCity$ citiesFound:: ', 'color: red;font-size:16px', citiesFound)
              this.store.dispatch(setSearchResult({ cities: citiesFound }))
              return {type: 'dispatched cities found'}
            }),
            catchError((err) => {
              console.log('%c err :: ', 'color: red;font-size:16px', err);
              this.store.dispatch(WeatherActions.toggleModal({ err: err }))
              return of({ type: '[WeatherEffects] searchCity Network Error' })
            })
          )
        })
  ));

  getCityWeatherById$ = createEffect(
    (): any => this.actions$.pipe(
      ofType(getCityWeatherById),
      switchMap((payload) => {
        console.log('%c getCityWeatherById$ payload :: ', 'color: red;font-size:16px', payload)
        this.store.dispatch(WeatherActions.setCityName(payload))
        return this.apiService.getCurrentWeather(payload.id).pipe(
          map(cities => cities[0]),
          tap(cities => console.log('%c getCityWeatherById$ :: ', 'color: red;font-size:16px', cities)),
          map(city => {
            // ({ type: '[weather Effect] getCityWeatherByIdSuccess', payload: city})
            this.store.dispatch(WeatherActions.getCityWeatherByIdSuccess({ city: city }))
            return { type: '[weather Effect] getWeatherById DONE'}
          }),
          // map(cities => {
          //   this.store.dispatch(WeatherActions.getForecastDays({ id: payload.id }))
          //   return of({ type: '[weather Effect] getForecastDaysSuccess', payload: '' })
          // }),
          catchError(error => {
            this.store.dispatch(WeatherActions.toggleModal({err: error}))
            return of({ type: '[weather Effect] getCityWeatherByIdError', payload: error})
          }),
        )
      })
    ));

  getForecastDays$ = createEffect(
      () => this.actions$.pipe(
        ofType(getForecastDays),
        map((payload) => {
          console.log('%c getForecastDays$ payload :: ', 'color: red;font-size:16px', payload)

          return this.apiService.getForecast(payload.id).pipe(
        map(forecastDays => (forecastDays as any).DailyForecasts),
        map(forecastDays => {
          console.log('%c getForecastDays$ :: ', 'color: red;font-size:16px', forecastDays);
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
