import {createAction, props} from '@ngrx/store';

// City-Weather Component
export const addToFav = createAction('[city-weather Component] AddToFav', props<any>());
export const removeFromFav = createAction('[city-weather Component] removeFromFav', props<any>());

// Weather Effect
export const getForecastDays = createAction('[weather Effect Component] getForecastDays', props<any>());

export const getCityWeatherById = createAction('[weather Effect Component] getCityWeatherById', props<any>());
export const getCityWeatherByIdSuccess = createAction('[weather Effect] getCityWeatherById SUCCESS', props<any>());
export const setCityName = createAction('[weather Effect] setCityName', props<any>());

export const setForecastDays = createAction('[weather Effect] setForecastDays', props<any>());
export const setSearchResult = createAction('[weather Effect] setSearchResult', props<any>());
export const setFavorites = createAction('[weather Effect] setFavorites', props<any>());
export const toggleModal = createAction('[weather Effect] toggleModal', props<any>());
// export const setCurrentCity = createAction('[weather effect] setCurrentCity', props<any>());

// Search Component

export const searchCity = createAction('[search Component] searchCity', props<any>());
export const removeCitiesFound = createAction('[search Component] removeCitiesFound', props<any>());

// Navbar Component

export const changeTheme = createAction('[Navbar Component] change Theme', props<any>());
export const changeDegrees = createAction('[Navbar Component] change Degrees', props<any>());



// Actions to add

// save favorites to localStorage
// get favorites from localStorage

// save ForecastDays to localStorage
// get ForecastDays from localStorage

// save currentCity to localStorage
// get currentCity from localStorage

