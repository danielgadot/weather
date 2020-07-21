import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";
import {Store} from "@ngrx/store";
import * as WeatherActions from "../store/actions/weather.actions";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchVal = '';
  constructor(private apiService: ApiService, private store: Store) { }

  ngOnInit(): void {
    // this.apiService.searchLocation().subscribe((res) => console.log(' res :: ', res))
  }

  searchCity(val) {
    console.log('searchVal :: ', this.searchVal);
    
    this.store.dispatch(WeatherActions.searchCity({
      searchWord: this.searchVal,
    }))
  }

}
