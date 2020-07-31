import {createAction, props} from '@ngrx/store';

export const addToFav = createAction('[city-weather Component] AddToFav', props<any>());
export const removeFromFav = createAction('[city-weather Component] removeFromFav', props<any>());
export const getForecastDays = createAction('[city-weather Component] getForecastDays', props<any>());

export const getCityWeatherById = createAction('[weather Effect] getCityWeatherById', props<any>());
export const getCityWeatherByIdSuccess = createAction('[weather Effect] getCityWeatherByIdSuccess', props<any>());
export const setForecastDays = createAction('[weather Effect] setForecastDays', props<any>());
export const setSearchResult = createAction('[weather Effect] setSearchResult', props<any>());
export const setFavorites = createAction('[weather effect] setFavorites', props<any>());
export const setCurrentCity = createAction('[weather effect] setCurrentCity', props<any>());

export const searchCity = createAction('[search Component] searchCity', props<any>());
export const removeCitiesFound = createAction('[search Component] removeCitiesFound', props<any>());

export const changeTheme = createAction('[Navbar] change Theme', props<any>());
export const changeDegrees = createAction('[Navbar] change Degrees', props<any>());

// Actions to add

// save favorites to localStorage
// get favorites from localStorage

// save ForecastDays to localStorage
// get ForecastDays from localStorage

// save currentCity to localStorage
// get currentCity from localStorage

