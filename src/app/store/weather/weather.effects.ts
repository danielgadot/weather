import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {switchMap, map, tap, catchError, withLatestFrom} from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { initialState }  from './reducers/weather.reducer';
import {
  searchCity,
  getForecastDays,
  setForecastDays,
  getCityWeatherById,
  setSearchResult,
  setFavorites,
  setCurrentLocation
} from './actions/weather.actions';
import { of, Observable } from "rxjs";
import { State } from './reducers/weather.reducer';
import { Store, select } from "@ngrx/store";
import * as WeatherActions from "./actions/weather.actions";

@Injectable()
export class WeatherEffects {
  constructor(private apiService: ApiService, private actions$: Actions, private store: Store<State>) {}

  async ngrxOnInitEffects() {
    await navigator.geolocation.getCurrentPosition(location => {
      this.store.dispatch(WeatherActions.setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }))
    });
    this.apiService.getGeoPosition(this.store.currentLocation.latitude, this.store.currentLocation.latitude).pipe(

    )
    const favorites = JSON.parse(localStorage.getItem('favorites'))
    this.store.dispatch(WeatherActions.getCityWeatherById({ id: initialState.currentCity.id, name:  initialState.currentCity.name}));
    this.store.dispatch(WeatherActions.getForecastDays({ id: initialState.currentCity.id }));
    this.store.dispatch(setFavorites({ favorites }))
    return { type: '[WeatherEffects]: Init' };
  }

  searchCity$ = createEffect(
    (): any => this.actions$.pipe(
      ofType(searchCity),
      switchMap((payload: { searchWord: string, type: string } ) => {
          return this.apiService.searchLocation(payload.searchWord).pipe(
            map((citiesFound) => {
              this.store.dispatch(setSearchResult({ cities: citiesFound }))
              return {type: 'dispatched cities found'}
            }),
            catchError((err) => {
              this.store.dispatch(WeatherActions.toggleModalOn({ err: err }))
              return of({ type: '[WeatherEffects] searchCity Network Error' })
            })
          )
        })
  ));

  getCityWeatherById$ = createEffect(
    (): any => this.actions$.pipe(
      ofType(getCityWeatherById),
      switchMap((payload) => {
        this.store.dispatch(WeatherActions.setCityName(payload))
        return this.apiService.getCurrentWeather(payload.id).pipe(
          map(cities => cities[0]),
          map(city => {
            this.store.dispatch(WeatherActions.getCityWeatherByIdSuccess({ city: city }))
            return { type: '[weather Effect] getWeatherById DONE'}
          }),
          catchError(error => {
            this.store.dispatch(WeatherActions.toggleModalOn({err: error}))
            return of({ type: '[weather Effect] getCityWeatherByIdError', payload: error})
          }),
        )
      })
    ));

  getForecastDays$ = createEffect(
      () => this.actions$.pipe(
        ofType(getForecastDays),
        map((payload) => {
          return this.apiService.getForecast(payload.id).pipe(
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
            catchError(error => {
              this.store.dispatch(WeatherActions.toggleModalOn({err: error}))
              return of({ type: '[weather Effect] getForecastDays Error', payload: error})
            }),
        ).subscribe() }),
      )
    , { dispatch: false })
  // getLocation$ = createEffect(
  //   () => this.actions$.pipe(
  //     ofType({type: '[WeatherEffects]: Init'}),
  //     map((l) => {
  //       console.log('%c getLocation$ :: ', 'color: red;font-size:16px', l);
  //       return of({ type: '[weather Effect] getForecastDays Error', payload: error})
  //     })
  // )

}
