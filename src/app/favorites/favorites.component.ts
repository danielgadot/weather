import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import { State } from '../store/weather/reducers/weather.reducer';

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites$: Observable<any>
  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.favorites$ = this.store.pipe(
      select('weather', 'favorites'),
      map((favorites: any[]) => {
        return favorites;
      }),
    );
  }

}
