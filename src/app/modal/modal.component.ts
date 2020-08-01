import { Component, OnInit } from '@angular/core';
import * as WeatherActions from "../store/weather/actions/weather.actions";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {State} from "../store/weather/reducers/weather.reducer";

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  isErrModalOpen$: Observable<boolean> = this.store.pipe(select('weather', 'isErrModalOpen'));
  errMsg$: Observable<any> = this.store.pipe(select('weather', 'errMsg'));

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
  }

  openModal() {
    this.store.dispatch(WeatherActions.toggleModalOn({}))
  }

  closeModal() {
    this.store.dispatch(WeatherActions.toggleModalOff({}))
  }

}
