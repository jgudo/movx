import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  IS_LOADING
} from '../constants/constants';

export default (state = {
  favorites: [],
  isLoading: false
}, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [
          action.payload,
          ...state.favorites 
        ]
      };    
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(favorite => favorite.id !== action.payload)
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};
