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

  favorites = [1, 2, 3];
  favorites$: Observable<any>
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.favorites$ = this.store.pipe(
      select(store => store),
      map((res: Store) => {
        console.log('favorites$ :: ', res)
        return (res as any).weatherStore.favorites
      }),
    );
  }

}
