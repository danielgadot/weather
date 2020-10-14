import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
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
  counter: number = 0;
  @ViewChild('countriesDropdown') countriesDropdown;
  private cities: any[];

  constructor(private apiService: ApiService, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.citiesFound$ = this.store.pipe(
      select('weather', 'citiesFound'),
      tap(cities => {
        this.isDropdownOpen = cities && cities.length > 0
        this.cities = cities;
      })
    )

    this.searchChanged.pipe(
      debounceTime(300), // wait 300ms after the last event before emitting last event
      distinctUntilChanged()) // only emit if value is different from previous value
      .subscribe(search => {
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
  toggleOffSearchResultMenu(event: MouseEvent) {
    if (this.isDropdownOpen && !(event.target as Element).classList.contains('search-result-wrapper')) {
      this.store.dispatch(
        WeatherActions.removeCitiesFound({})
      )
    }
  }

  @HostListener('keydown', ['$event'])
  handleSelectCityKey(event: KeyboardEvent) {
    if (this.isDropdownOpen && event.key === 'Enter') {
      this.onClickCity(this.cities[this.counter])
    }
  }

  selectPreviousCity() {
    if (this.counter > 0) {
      this.counter--
    }
  }
  selectNextCity() {
    if (this.counter < this.cities.length - 1) {
      this.counter++
    }
  }
  onHoverCity(key) {
    this.counter = key;
  }

  searchChangedHandler(text: string) {
    this.searchChanged.next(text);
  }

}
