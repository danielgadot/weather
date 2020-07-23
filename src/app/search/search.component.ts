import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { Store } from "@ngrx/store";
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
  }

  searchCity() {
    this.store.dispatch(
      WeatherActions.searchCity({
        searchWord: this.searchVal,
      })
    )
  }

}
