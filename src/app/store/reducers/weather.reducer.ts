import { Action, createReducer, on } from '@ngrx/store';
import * as WeatherActions from '../actions/weather.actions';
import { CityWeather } from '../../models/city-weather.model';

interface Weather {
  weather?: any;
}

interface City {
  id: number;
  name: string;
  temperature: any;
  date: string;
  weatherText: any;
}

export interface State extends Weather {
    currentCity: City;
    favorites: number[];
    loading: boolean;
    loaded: boolean;
    forecastDays: any[];
    citiesFound: any[];
}

export const initialState: State = {
    currentCity: {
      id: 215854,
      date: 'day.Date',
      weatherText: 'Tel Aviv',
      name: 'Tel Aviv',
      temperature: {
        min: 0,
        max: 0
      }
    },
    favorites: [],
    loading: false,
    loaded: false,
    forecastDays: [],
    citiesFound: [],
};

export function weatherReducer(state: State | undefined, action: Action) {
  return _weatherReducer(state, action);
}

const _weatherReducer = createReducer(
  initialState,
  on(WeatherActions.addToFav, (state, payload) => {
    return {
      ...state,
      favorites: addToFavReducer(state, payload),
    }
  }),
  on(WeatherActions.removeFromFav, (state, payload) => {
    return {
      ...state,
      favorites: removeFromFavReducer(state, payload),
    }
  }),
  on(WeatherActions.fetchedCitySuccess, (state, payload) => {
    return {
      ...state,
      currentCity: payload,
      loading: false,
      loaded: true
    }
  }),
  on(WeatherActions.getForecastDays, (state, payload) => {

    return {
      ...state,
      forecastDays: [],
    }
  }),
  on(WeatherActions.setForecastDays, (state, payload) => {
    return {
      ...state,
      forecastDays: payload.forecastDays,
    }
  }),
  on(WeatherActions.setSearchResult, (state, payload) => {
    return {
      ...state,
      citiesFound: payload.cities,
    }
  }),
  on(WeatherActions.removeCitiesFound, (state, payload) => {
    return {
      ...state,
      citiesFound: [],
    }
  }),
  on(WeatherActions.setFavorites, (state, payload) => {
    return {
      ...state,
      favorites: payload.favorites,
    }
  })
);




function addToFavReducer(state, payload) {
  let newFavs = Object.assign([], state.favorites);
  newFavs.push(payload.city);
  localStorage.setItem('favorites', JSON.stringify(newFavs));
  return newFavs;
}

function removeFromFavReducer(state, payload) {
  let newFavs = Object.assign([], state.favorites);
  newFavs = newFavs.filter(city => city.id !== payload.city.id);
  localStorage.setItem('favorites', JSON.stringify(newFavs));
  return newFavs;
}

function searchCityReducer(state, payload) {
  if (payload.id) {
    return payload.id
  }
  else {
    return payload.searchWord;
  }
}
