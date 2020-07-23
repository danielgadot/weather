import {createAction, props} from '@ngrx/store';

export const addToFav = createAction('[city-weather Component] AddToFav', props<any>());
export const removeFromFav = createAction('[city-weather Component] removeFromFav', props<any>());
export const searchCity = createAction('[search Component] searchCity', props<any>());
export const fetchedCitySuccess = createAction('[city-weather Component] fetchedCitySuccess', props<any>());
export const getForecastDays = createAction('[city-weather Component] getForecastDays', props<any>());
export const setForecastDays = createAction('[weather Effect] setForecastDays', props<any>());
// Actions to add

// save favorites to localStorage
// get favorites from localStorage

// save ForecastDays to localStorage
// get ForecastDays from localStorage

// save currentCity to localStorage
// get currentCity from localStorage

