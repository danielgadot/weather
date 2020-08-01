import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import { Observable } from "rxjs";
import { State } from '../store/weather/reducers/weather.reducer';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites$: Observable<any> = this.store.pipe(select('weather', 'favorites'),
    map(favorites => {
      return favorites.map(favCity => ({
        name: favCity.name,
        temperature: favCity.temperature,
        weatherText: favCity.weatherText,
        showWeatherText: true,
        id: favCity.id

      }));
    })
    )
  constructor(private store: Store<State>) { }

  ngOnInit(): void {}

}
