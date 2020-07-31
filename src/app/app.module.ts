import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { weatherReducer, weatherFeatureKey } from './store/weather/reducers/weather.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { WeatherEffects } from './store/weather.effects';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchComponent } from './search/search.component';
import { CityWeatherComponent } from './city-weather/city-weather.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Routes, RouterModule } from "@angular/router";
import {LocationStrategy, Location, PathLocationStrategy} from '@angular/common';
import { FormsModule } from "@angular/forms";
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { ForecastComponent } from './forecast/forecast.component';


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
    NavbarComponent,
    WeatherCardComponent,
    ForecastComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({}),
    StoreModule.forFeature(weatherFeatureKey, weatherReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    FormsModule,
    EffectsModule.forRoot([WeatherEffects]),
  ],
  providers: [
    Location,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
