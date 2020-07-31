import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {State} from "../store/weather/reducers/weather.reducer";

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  links = [
    { title: 'Home', fragment: '/' },
    { title: 'Favorites', fragment: 'favorites' }
  ];

  isDegreesCelsius$ = this.store.pipe(select('weather', 'isDegreesCelsius'));
  isThemeLight$ = this.store.pipe(select('weather', 'isThemeLight'));

  constructor(public route: ActivatedRoute, private store: Store<State>) {

  }

  ngOnInit(): void {}
  changeDegrees() {
    this.store.dispatch({type: '[Navbar] change Degrees'})

  }
  changeTheme() {
    this.store.dispatch({type: '[Navbar] change Theme'})
  }
}
