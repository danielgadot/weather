import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../store/weather/reducers/weather.reducer";
import * as WeatherActions from "../store/weather/actions/weather.actions";
import {Router} from "@angular/router";

@Component({
  selector: 'favorite-weather-card',
  templateUrl: './favorite-weather-card.component.html',
  styleUrls: ['./favorite-weather-card.component.scss']
})
export class FavoriteWeatherCardComponent implements OnInit {

  isDegreesCelsius$ = this.store.pipe(select('weather', 'isDegreesCelsius'));
  isThemeLight$ = this.store.pipe(select('weather', 'isThemeLight'));

  @Input() weatherData;
  constructor(private store: Store<State>, private router: Router) { }

  ngOnInit(): void {
  }

  navigateToHome(city) {
    console.log('%c weatherData :: ', 'color: red;font-size:16px', this.weatherData);
    this.store.dispatch(WeatherActions.getCityWeatherById({ id: this.weatherData.id, name: this.weatherData.name }));
    this.router.navigateByUrl('/')
  }

}
