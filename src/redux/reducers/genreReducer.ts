import {
  FETCH_GENRES_SUCCESS,
  FETCH_GENRE_CATEGORY_SUCCESS
} from '@app/constants/actionType';
import { IGenreState } from '@app/types/types';
import { TGenreActionType } from '../actions/genreActions';

const defaultState: IGenreState = {
  genres: [],
  current: null,
}

export default (state = defaultState, action: TGenreActionType) => {
  switch (action.type) {
    case FETCH_GENRES_SUCCESS:
      return {
        ...state,
        genres: [...action.payload],
      };
      break;
    case FETCH_GENRE_CATEGORY_SUCCESS:
      return {
        ...state,
        genreMovies: action.payload,
      };
      break;
    default:
      return state;
  }
};
