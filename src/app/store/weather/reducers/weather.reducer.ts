import { Action, createReducer, on } from '@ngrx/store';
import * as WeatherActions from '../actions/weather.actions';
import { City } from '../../../models/city.model';

export const weatherFeatureKey = 'weather';

interface Weather {
  weather?: any;
}
export interface State  extends Weather {
    currentCity: City;
    favorites: number[];
    loading: boolean;
    loaded: boolean;
    forecastDays: any[];
    citiesFound: any[];
    isDegreesCelsius: boolean;
    isThemeLight: boolean;
    isErrModalOpen: boolean;
    errMsg: string;
}

export const initialState: State = {

    currentCity: {
      id: 215854,
      date: '01/01/20',
      name: 'Tel Aviv',
      temperature: {
        celsius: {
          min: 22,
          max: 30,
          current: 27
        },
        fahrenheit: {
          min: 22,
          max: 30,
          current: 0
        },
        weatherText: 'Tel Aviv',
      },
       isFavorite: false
    },
    favorites: [],
    loading: false,
    loaded: false,
    forecastDays: [],
    citiesFound: [],
    isDegreesCelsius: true,
    isThemeLight: true,
    isErrModalOpen: false,
    errMsg:'',
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
      currentCity: {
        ...state.currentCity,
        isFavorite: true,
      }
    }
  }),
  on(WeatherActions.removeFromFav, (state, payload) => {
    return {
      ...state,
      favorites: removeFromFavReducer(state, payload),
      currentCity: {
        ...state.currentCity,
        isFavorite: false,
      }
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
  on(WeatherActions.setCityName, (state, payload) => {
    return {
      ...state,
      currentCity: {
        ...state.currentCity,
      name: payload.name,
      }
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
  }),
  on(WeatherActions.changeDegrees, (state, payload) => {
    return {
      ...state,
      isDegreesCelsius: !state.isDegreesCelsius,
    }
  }),
  on(WeatherActions.changeTheme, (state, payload) => {
    return {
      ...state,
      isThemeLight: !state.isThemeLight,
    }
  }),
  on(WeatherActions.toggleModal, (state, payload) => {
    return {
      ...state,
      isErrModalOpen: !state.isErrModalOpen,
      errMsg: payload.err
    }
  }),
  on(WeatherActions.getCityWeatherByIdSuccess, (state, payload) => {
    return {
      ...state,
      currentCity: {
        ...state.currentCity,
        temperature: {
          celsius: {
            min: 22,
            max: 30,
            current: payload.city.Temperature.Metric.Value
          },
          fahrenheit: {
            min: 22,
            max: 30,
            current: payload.city.Temperature.Imperial.Value
          },
          weatherText: payload.city.WeatherText,
        }
      }
    }
  })
);

function addToFavReducer(state, payload) {
  let newFavCities = Object.assign([], state.favorites);
  newFavCities.push(payload.city);
  localStorage.setItem('favorites', JSON.stringify(newFavCities));
  return newFavCities;
}

function removeFromFavReducer(state, payload) {
  let newFavCities = Object.assign([], state.favorites);
  newFavCities = newFavCities.filter(city => city.id != payload.city.id);
  localStorage.setItem('favorites', JSON.stringify(newFavCities));
  return newFavCities;
}
