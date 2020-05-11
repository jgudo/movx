import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  IS_LOADING
} from 'constants/constants';

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
      break;   
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(favorite => favorite.id !== action.payload)
      };
      break;
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
      break;
    default:
      return state;
  }
};
