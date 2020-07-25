import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites$: Observable<any>
  constructor(private store: Store) { }

  ngOnInit(): void {
    // this.favorites$ = this.store.pipe(
    //   select('weather', 'favorites'),
    //   map((favorites: number[]) => {
    //     console.log('favorites$ :: ', favorites)
    //     return favorites;
    //   }),
    // );
  }

}
