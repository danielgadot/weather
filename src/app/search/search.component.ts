import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import { ApiService } from "../services/api.service";
import { Store, select } from "@ngrx/store";
import * as WeatherActions from "../store/weather/actions/weather.actions";
import { Observable } from 'rxjs';
import { State } from '../store/weather/reducers/weather.reducer';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchVal = '';
  citiesFound$: Observable<any>;

  constructor(private apiService: ApiService, private store: Store<State>, private eRef: ElementRef) { }

  ngOnInit(): void {
    this.citiesFound$ = this.store.pipe(select('weather', 'citiesFound'))
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
    this.store.dispatch(
      WeatherActions.removeCitiesFound({})
    )
    this.store.dispatch(
      WeatherActions.getCityWeatherById({
        id: city.Key,
        name: city.LocalizedName
      })
    )
  }

  @HostListener('document:click', ['$event'])
  toggleOffSearchResultMenu(event){
      if (!this.eRef.nativeElement.contains(event.target)) {
        this.store.dispatch(
          WeatherActions.removeCitiesFound({})
        )
      }
  }

}
