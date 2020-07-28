import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {switchMap, map, tap, catchError, mergeMap} from 'rxjs/operators';
import { ApiService } from './api.service';
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
} from './store/actions/weather.actions';
import { of, Observable } from "rxjs";
import { CityWeather } from './models/city-weather.model';
import { State } from './store/reducers/weather.reducer';
import { Store, select } from "@ngrx/store";

@Injectable()
export class WeatherEffects {
  constructor(private apiService: ApiService, private actions$: Actions, private store: Store<State>) {}

  getCurrentWeather$ = createEffect(
    (): any => this.actions$.pipe(
        ofType(searchCity),
        tap((res) => { console.log('new getCurrentWeather$ occurred in queue', res) }),
        switchMap((action: CityWeather) => {
          return this.searchLocationStream(action)
        })
    ));

  getCurrentWeatherbyId$ = createEffect(
    (): any => this.actions$.pipe(
      ofType(searchCityById),
      tap((res) => { console.log('new  bt idgetCurrentWeather$', res) }),
      map((action: any) => {
        this.getCurrentWeather(action);
        return {type: 'loading city current weather'}
      })
    ));

    ngrxOnInitEffects(): Action {
      const favorites = JSON.parse(localStorage.getItem('favorites'));
      this.store.dispatch(setFavorites({ favorites }))
      return { type: '[UserEffects]: Init' };
    }
    // private cacheCityStream(cachedCity) {
    //   return of(cachedCity).pipe(
    //     map(resData => this.store.dispatch(fetchedCitySuccess({ data: [resData] }))),
    //     catchError(error => of(console.log(' err :: ', error))),
    //     tap(() => { console.log('getCurrentWeather Finished fetching from local storage') })
    //   )
    // }


    private searchLocationStream(action) {
      console.log('action in searchLocation :: ', action)
      return this.apiService.searchLocation(action.searchWord).pipe(
        map((citiesFound) => {
          console.log('city search :: ', citiesFound);
          this.store.dispatch(setSearchResult({ cities: citiesFound }))
          return {type: 'dispatched cities found'}
        })
      )
    }

    private getCurrentWeather(action) {
      return this.apiService.getCurrentWeather(action.id).pipe(
        tap((resData) => { console.log('resData :: ', resData) }),
        map(cities => cities[0]),
        tap((city) => { console.log('%c city in effect :: ', 'color: red;font-size:16px', city) }),
        tap((city) => { console.log('%c action :: ', 'color: red;font-size:16px', action) }),
        // id: 215854,
        // date: 'day.Date',
        // weatherText: 'day.Day.IconPhrase',
        // name: 'Tel Aviv',
        // temperature: {
        // min: 0,
        //   max: 0
      // }
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
        tap(() => { console.log('getCurrentWeather Finished from server') })
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
            console.log('forecastDays :: ', forecastDays);
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
            console.log('newForecastDays :: ', newForecastDays);
          }
          return newForecastDays
        }),
          tap((forecastDays) => {
            console.log('forecastDays :: ', forecastDays)
            this.store.dispatch(setForecastDays({ forecastDays }));
          }),
        ).subscribe() }),
      )
    , { dispatch: false })

}
