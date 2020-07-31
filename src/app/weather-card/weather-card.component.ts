import {Component, Input, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../store/weather/reducers/weather.reducer";

@Component({
  selector: 'weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  isDegreesCelsius$ = this.store.pipe(select('weather', 'isDegreesCelsius'));
  isThemeLight$ = this.store.pipe(select('weather', 'isThemeLight'));

  constructor(private store: Store<State>) { }

  @Input() weatherData;

  ngOnInit(): void {
  }

  fahrenheitToCelsius(fahrenheit) {
    return parseInt(String((fahrenheit - 32) * 5 / 9));
  }
}
