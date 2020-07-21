import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {switchMap, map, tap, catchError, mergeMap} from 'rxjs/operators';

import { ApiService } from './api.service';
import { searchCity, addToFav, removeFromFav, fetchedCitySuccess, getForecastDays } from './store/actions/weather.actions';
import { of, Observable } from "rxjs";

@Injectable()
export class WeatherEffects {
  constructor(private apiService: ApiService, private actions$: Actions) {}

  getCurrentWeather$ = createEffect(
    () => this.actions$.pipe(
        ofType(searchCity),
        tap((res) => { console.log('new getCurrentWeather$ occurred in queue', res) }),
        mergeMap((action) => {
          const cachedCity = JSON.parse(localStorage.getItem('city'));
          if (cachedCity && !action.searchWord) {
            this.cacheCityStream(cachedCity)
          }
          return this.searchLocationStream(action)
        })
    ));
    
    private cacheCityStream(cachedCity) {
      return of(cachedCity).pipe(
        map(resData => fetchedCitySuccess({ data: [resData] })),
        catchError(error => of(console.log(' err :: ', error))),
        tap(() => { console.log('getCurrentWeather Finished fetching from local storage') })
      )
    }

    private searchLocationStream(action) {
      return this.apiService.searchLocation(action.searchWord).pipe(
        tap((city) => {
          console.log('city search :: ', city)
          const cityStr = JSON.stringify(city[0]);
          localStorage.setItem('city', cityStr)
        }),
        switchMap((city) => {
          console.log('city in switchmap :: ', city)
          return this.getCurrentWeather(city)
      }),
      ) 
    }

    private getCurrentWeather(city) {
      return this.apiService.getCurrentWeather((city as any)[0].Key).pipe(
        tap(() => { console.log('city search :: ', city) }),
        map(resData => fetchedCitySuccess({ data: [resData] })),
        catchError(error => of(console.log(' err :: ', error))),
        tap(() => { console.log('getCurrentWeather Finished from server') })
      )
    }

    getForecast$ = createEffect(
      () => this.actions$.pipe(
        ofType(getForecastDays),
        tap((res) => { console.log('getForecast', res) }),
      )
    , { dispatch: false })

}
