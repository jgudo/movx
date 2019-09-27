import { FETCH_GENRES_SUCCESS, FETCH_GENRE_CATEGORY_SUCCESS } from 'constants/constants';

export default (state = {
  genres: [],
  genreMovies: {}
}, action) => {
  switch (action.type) {
    case FETCH_GENRES_SUCCESS:
      return {
        ...state,
        genres: [...action.payload.genres]
      }; 
    case FETCH_GENRE_CATEGORY_SUCCESS:
      return {
        ...state,
        genreMovies: action.payload
      };
    default:
      return state;
  }
};
