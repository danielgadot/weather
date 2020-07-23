import { Action, createReducer, on } from '@ngrx/store';
import * as WeatherActions from '../actions/weather.actions';
import { CityWeather } from '../../models/city-weather.model';

interface Weather {
  weather?: any;
}


export interface State extends Weather{
    currentCityWeather: CityWeather;
    currentCity: any;
    favorites: any[];
    loading: boolean;
    loaded: boolean;
    forecastDays: any[];
}

export const initialState: State = {
    currentCityWeather: {
      Temperature: {
        Metric: {
          Value: 25
        }
      }
    },
    currentCity: {},
    favorites: [
      {
        city: 'Tel Aviv',
        temperature: 38,
        desc: 'Sunny'
      },
      {
        city: 'Madrid',
        temperature: 22,
        desc: 'Sunny'
      }
    ],
    loading: false,
    loaded: false,
    forecastDays: []
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
  on(WeatherActions.searchCity, (state, payload) => {
    return {
      ...state,
      currentCity: searchCityReducer(state, payload),
      loading: true
    }
  }),
  on(WeatherActions.fetchedCitySuccess, (state, payload) => {
    return {
      ...state,
      currentCityWeather: payload.data,
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
    console.log('payload ForecastDays:: ', payload);
    return {
      ...state,
      forecastDays: payload.forecastDays,
    }
  })
);




function addToFavReducer(state, payload) {
  let newFavs = Object.assign([], state.favorites);
  newFavs.push(payload)
  return newFavs;
}

function removeFromFavReducer(state, payload) {
  let newFavs = Object.assign([], state.favorites);
  newFavs = newFavs.filter(city => city !== payload)
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
