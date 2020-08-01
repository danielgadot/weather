import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import { ApiService } from "../services/api.service";
import { Store, select } from "@ngrx/store";
import * as WeatherActions from "../store/weather/actions/weather.actions";
import { Observable } from 'rxjs';
import { State } from '../store/weather/reducers/weather.reducer';
import { tap } from "rxjs/operators";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchVal = '';
  citiesFound$: Observable<any>;
  isDropdownOpen = false;

  constructor(private apiService: ApiService, private store: Store<State>, private eRef: ElementRef) { }

  ngOnInit(): void {
    this.citiesFound$ = this.store.pipe(
      select('weather', 'citiesFound'),
      tap(cities => this.isDropdownOpen = cities.length > 0)
    )
  }

  searchCity() {
    this.store.dispatch(
      WeatherActions.searchCity({
        searchWord: this.searchVal,
      })
    )
  }

  onClickCity(city) {
    this.searchVal = '';
    this.store.dispatch(WeatherActions.removeCitiesFound({}))
    this.store.dispatch(WeatherActions.getCityWeatherById({
        id: city.Key,
        name: city.LocalizedName
      })
    )
    this.store.dispatch(WeatherActions.getForecastDays({ id: city.Key }))

  }

  @HostListener('document:click', ['$event'])
  toggleOffSearchResultMenu(event){
      if (this.isDropdownOpen && !event.target.classList.contains('search-result-wrapper')) {
        this.store.dispatch(
          WeatherActions.removeCitiesFound({})
        )
      }
  }

}
