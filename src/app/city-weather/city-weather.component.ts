import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { City } from '../models/city.model';
import { Observable, Subject } from "rxjs";
import { Store, select } from "@ngrx/store";
import { tap, map, switchMap } from 'rxjs/operators';
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
  city;

  isDegreesCelsius$ = this.store.pipe(select('weather', 'isDegreesCelsius'));
  isThemeLight$ = this.store.pipe(select('weather', 'isThemeLight'));

  ngOnInit(): void {

    this.city$ = this.store.pipe(
      select('weather', 'currentCity'),
      map((currentCity: City) => {
        console.log('%c currentCity :: ', 'color: red;font-size:16px', currentCity);
          this.city = currentCity;
          // this.isFavorite$ = this.streamFavorites();
          return currentCity;
      }),
    );

      this.forecastDays$ = this.store.pipe(select('weather', 'forecastDays'));
  }

  addRemoveFavorite(operation) {
    if (operation === 'add') {
      this.store.dispatch(WeatherActions.addToFav({
        /*
        * @Effect() logoutEffect$ = this.actions$
          .ofType(LOGOUT)
          .withLatestFrom(this.store$)
          .map(([action: Action, storeState: AppState]) => {
             return storeState.getUser;
           })
          .map(payload => ({type: 'LOGOUT_USER', payload}))
        * */
        city: this.city,
      }))
    } else if ('remove') {
      this.store.dispatch(WeatherActions.removeFromFav({
        city: this.city,
      }))
    }
  }
  onCardClick(){
  }

}
