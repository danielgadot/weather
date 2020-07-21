import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'; // Angular CLI environment

import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { weatherReducer } from './store/reducers/weather.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './weather.effects';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchComponent } from './search/search.component';
import { CityWeatherComponent } from './city-weather/city-weather.component';
import { DayWeatherComponent } from './day-weather/day-weather.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from "@angular/router";
import {LocationStrategy, Location, PathLocationStrategy} from '@angular/common';
import { ForecastDayComponent } from './forecast-day/forecast-day.component';
import { FormsModule } from "@angular/forms";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'favorites', component: FavoritesComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
    SearchComponent,
    CityWeatherComponent,
    DayWeatherComponent,
    NavbarComponent,
    ForecastDayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({weather : weatherReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    FormsModule,
    EffectsModule.forRoot([WeatherEffects]),
  ],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
