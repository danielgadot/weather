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
          // const cachedCity = JSON.parse(localStorage.getItem('city'));
          // if (cachedCity && !(action as any).payload.searchWord) {
          //   this.cacheCityStream(cachedCity)
          // }
          return this.searchLocationStream(action)
        })
    ));

  getCurrentWeatherbyId$ = createEffect(
    (): any => this.actions$.pipe(
      ofType(searchCityById),
      tap((res) => { console.log('new  bt idgetCurrentWeather$', res) }),
      map((action: any) => {
        this.getCurrentWeather(action.id);
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
          // if (city) {
            // const cityStr = JSON.stringify(city[0]);
            // localStorage.setItem('city', cityStr);

            // return this.getCurrentWeather(city[0].Key)
          // }
        })
      )
    }

    private getCurrentWeather(cityKey) {
      return this.apiService.getCurrentWeather(cityKey).pipe(
        tap((resData) => { console.log('resData :: ', resData) }),
        map(resData => this.store.dispatch(fetchedCitySuccess({ data: resData[0] }))),
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
