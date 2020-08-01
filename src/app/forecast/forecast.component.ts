import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {State} from "../store/weather/reducers/weather.reducer";

@Component({
  selector: 'forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  forecastDays$ = this.store.pipe(select('weather', 'forecastDays'));

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
  }

}
