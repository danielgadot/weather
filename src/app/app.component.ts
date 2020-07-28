import { Component } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {State} from "./store/reducers/weather.reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loading$: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.loading$ = this.store.pipe(
      select('weather', 'loaded'),
      )
  }
}


