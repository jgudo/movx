import { 
  IS_LOADING, 
  ADD_TO_FAVORITES, 
  REMOVE_FROM_FAVORITES 
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
