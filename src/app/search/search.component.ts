import { Component, HostListener, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { Store, select } from "@ngrx/store";
import * as WeatherActions from "../store/weather/actions/weather.actions";
import {Observable, Subject } from 'rxjs';
import { State } from '../store/weather/reducers/weather.reducer';
import {tap, debounceTime, distinctUntilChanged} from "rxjs/operators";
import {setFavorites} from "../store/weather/actions/weather.actions";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  search: string;
  searchChanged: Subject<string> = new Subject<string>();
  citiesFound$: Observable<any>;
  isDropdownOpen = false;

  constructor(private apiService: ApiService, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.citiesFound$ = this.store.pipe(
      select('weather', 'citiesFound'),
      tap(cities => this.isDropdownOpen = cities && cities.length > 0)
    )

    this.searchChanged.pipe(
      debounceTime(300), // wait 300ms after the last event before emitting last event
      distinctUntilChanged()) // only emit if value is different from previous value
      .subscribe(search => {
        console.log('%c search :: ', 'color: red;font-size:16px', search);
        this.search = search;
        this.store.dispatch(
          WeatherActions.searchCity({
            searchWord: this.search,
          })
        )
      });

  }

  onClickCity(city) {
    this.search = '';
    this.store.dispatch(WeatherActions.removeCitiesFound({}))
    this.store.dispatch(WeatherActions.getCityWeatherById({
        id: city.Key,
        name: city.LocalizedName
      })
    )
    this.store.dispatch(WeatherActions.getForecastDays({id: city.Key}))
    this.store.dispatch(setFavorites({}))
  }

  @HostListener('document:click', ['$event'])
  toggleOffSearchResultMenu(event) {
    if (this.isDropdownOpen && !event.target.classList.contains('search-result-wrapper')) {
      this.store.dispatch(
        WeatherActions.removeCitiesFound({})
      )
    }
  }

  searchChangedHandler(text: string) {
    this.searchChanged.next(text);
  }
}
