import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { Store, select } from "@ngrx/store";
import * as WeatherActions from "../store/actions/weather.actions";
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchVal = '';
  citiesFound$: Observable<any>;

  constructor(private apiService: ApiService, private store: Store) { }

  ngOnInit(): void {
    this.citiesFound$ = this.store.pipe(
      select('weather', 'citiesFound'),
      tap(cities => console.log('cities found in search component :: ', cities)),
      map(cities => cities)
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
    console.log(' ');
    
    this.store.dispatch(
      WeatherActions.searchCityById({
        id: city.Key,
      })
    )
  }

}
