import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { City } from '../models/city.model';
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { map } from 'rxjs/operators';
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
  city: any;
  weatherIcon: string;
  isDegreesCelsius$ = this.store.pipe(select('weather', 'isDegreesCelsius'));
  isThemeLight$ = this.store.pipe(select('weather', 'isThemeLight'));

  ngOnInit(): void {
    this.city$ = this.store.pipe(
      select('weather', 'currentCity'),
      map((currentCity: City) => {
          this.city = currentCity;
          this.setWeatherIcon(currentCity);
          return currentCity;
      }),
    );
  }

  addRemoveFavorite(operation) {
    if (operation === 'add') {
      this.store.dispatch(WeatherActions.addToFav({
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
  setWeatherIcon(city) {
    if (city.temperature.weatherText.match(/sun/gi)) {
      this.weatherIcon = './../../assets/img/sunny.svg';
    } else if (city.temperature.weatherText.match(/rain/gi)) {
      this.weatherIcon = './../../assets/img/rain.svg';
    } else if (city.temperature.weatherText.match(/cloud/gi)) {
      this.weatherIcon = './../../assets/img/cloudy.svg';
    }
  }

}
