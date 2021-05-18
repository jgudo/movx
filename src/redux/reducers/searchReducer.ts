import {
  ADD_SEARCH_HISTORY,
  CLEAR_SEARCH_HISTORY,

  SEARCH_MOVIES_SUCCESS,

  SEARCH_PEOPLE_SUCCESS, SEARCH_SUCCESS,

  SEARCH_TV_SHOWS_SUCCESS,

  UPDATE_SEARCH_QUERY
} from '@app/constants/actionType';
import { ISearchState } from '@app/types/types';
import { TSearchActionType } from '../actions/searchActions';

const defaultState: ISearchState = {
  query: '',
  tv: null,
  movies: null,
  people: null,
  recent: [],
}

export default (state = defaultState, action: TSearchActionType) => {
  switch (action.type) {
    case ADD_SEARCH_HISTORY:
      return {
        ...state,
        recent: [...state.recent, action.payload],
      };
    case CLEAR_SEARCH_HISTORY:
      return {
        ...state,
        recent: [],
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        movies: action.payload.movies,
        tv: action.payload.tv,
        people: action.payload.people,
      };
    case SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload,
      };
    case SEARCH_TV_SHOWS_SUCCESS:
      return {
        ...state,
        tv: action.payload,
      };
    case SEARCH_PEOPLE_SUCCESS:
      return {
        ...state,
        people: action.payload,
      };
    case UPDATE_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};
