import {
  FETCH_CURRENT_GENRE_SUCCESS, FETCH_GENRES_SUCCESS
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
        genres: action.payload.genres,
      };
    case FETCH_CURRENT_GENRE_SUCCESS:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
};
