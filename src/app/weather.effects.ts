import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import {switchMap, map, tap, catchError, mergeMap} from 'rxjs/operators';
import { ApiService } from './api.service';
import { searchCity, addToFav, removeFromFav, fetchedCitySuccess, getForecastDays, setForecastDays, searchCityById, setSearchResult } from './store/actions/weather.actions';
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

    private cacheCityStream(cachedCity) {
      return of(cachedCity).pipe(
        map(resData => this.store.dispatch(fetchedCitySuccess({ data: [resData] }))),
        catchError(error => of(console.log(' err :: ', error))),
        tap(() => { console.log('getCurrentWeather Finished fetching from local storage') })
      )
    }

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
        map(resData => this.store.dispatch(fetchedCitySuccess({ data: resData[0], cityKey: action.id, cityName:  action.name}))),
        catchError(error => of(console.log(' err :: ', error))),
        tap(() => { console.log('getCurrentWeather Finished from server') })
      ).subscribe()
    }

    getForecast$ = createEffect(
      () => this.actions$.pipe(
        ofType(getForecastDays),
        map((res) => { return this.apiService.getForecast(res.id).pipe(
        tap((forecastDays) => {
          console.log('forecastDays :: ', forecastDays)
          this.store.dispatch(setForecastDays({ forecastDays: (forecastDays as any).DailyForecasts }));
          }),

        ).subscribe() }),
      )
    , { dispatch: false })

}
