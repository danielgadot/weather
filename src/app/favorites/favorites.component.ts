import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Component({
  selector: 'favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  favorites$: Observable<any>
  constructor(private store: Store) { }

  ngOnInit(): void {
    // this.favorites$ = of(JSON.parse(localStorage.getItem('favorites')));
    this.favorites$ = this.store.pipe(
      select('weather', 'favorites'),
      map((favorites: any[]) => {
        return favorites;
      }),
    );
  }

}
