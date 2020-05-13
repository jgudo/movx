import { 
  IS_LOADING, 
  ADD_TO_FAVORITES, 
  REMOVE_FROM_FAVORITES,
  SET_DARK_MODE
} from 'constants/constants';

export const isCurrentlyFetching = (bool = true) => ({
  type: IS_LOADING,
  payload: bool
});

export const addToFavorites = favorites => ({
  type: ADD_TO_FAVORITES,
  payload: favorites
});

export const removeFromFavorites = id => ({
  type: REMOVE_FROM_FAVORITES,
  payload: id
});

export const setDarkMode = (bool = true) => ({
  type: SET_DARK_MODE,
  payload: bool
});
