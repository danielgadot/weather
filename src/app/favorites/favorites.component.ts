import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import { State } from '../store/weather/reducers/weather.reducer';
import * as WeatherActions from '../store/weather/actions/weather.actions';
import {Router} from "@angular/router";

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites$: Observable<any> = this.store.pipe(select('weather', 'favorites'),
    map(favorites => {
      console.log('%c favorites :: ', 'color: red;font-size:16px', favorites);
      return favorites.map(favCity => ({
        name: favCity.name,
        temperature: favCity.temperature,
        weatherText: favCity.weatherText,
        showWeatherText: true

      }));
    })
    )
  constructor(private store: Store<State>, private router: Router) { }

  ngOnInit(): void {}

  navigateToHome(city) {
    console.log('%c clicked navigate :: ', 'color: red;font-size:16px', city);
    this.store.dispatch(WeatherActions.setCurrentCity(city));
    this.router.navigateByUrl('/')
  }

}
