import {
  FETCH_DISCOVER_MOVIES_SUCCESS,
  FETCH_MAIN_MOVIES_SUCCESS, FETCH_POPULAR_MOVIES_SUCCESS, FETCH_SELECTED_MOVIE_SUCCESS,
  FETCH_TOPRATED_MOVIES_SUCCESS, FETCH_TRENDING_MOVIES_SUCCESS,
  FETCH_TV_SHOWS_SUCCESS,
  FETCH_UPCOMING_MOVIES_SUCCESS
} from '@app/constants/actionType';
import { IMovieState } from '@app/types/types';
import { TMovieActionType } from '../actions/movieActions';

const defaultState: IMovieState = {
  trending: null,
  discover: null,
  current: {
    movie: null,
    keywords: [],
    casts: [],
    reviews: [],
  },
  popular: null,
  topRated: null,
  upcoming: null,
  tvShows: null,
}

const moviesReducer = (state = defaultState, action: TMovieActionType) => {
  switch (action.type) {
    case FETCH_TRENDING_MOVIES_SUCCESS:
      return {
        ...state,
        trending: { ...action.payload },
      };
    case FETCH_DISCOVER_MOVIES_SUCCESS:
      return {
        ...state,
        discover: { ...action.payload },
      };
    case FETCH_TV_SHOWS_SUCCESS:
      return {
        ...state,
        tvShows: { ...action.payload },
      };
    case FETCH_SELECTED_MOVIE_SUCCESS:
      return {
        ...state,
        current: action.payload,
      };
    case FETCH_POPULAR_MOVIES_SUCCESS:
      return {
        ...state,
        popular: action.payload,
      };
    case FETCH_TOPRATED_MOVIES_SUCCESS:
      return {
        ...state,
        topRated: action.payload,
      };
    case FETCH_UPCOMING_MOVIES_SUCCESS:
      return {
        ...state,
        upcoming: action.payload,
      };
    case FETCH_MAIN_MOVIES_SUCCESS:
      return {
        ...state,
        upcoming: action.payload.upcoming,
        topRated: action.payload.topRated,
        popular: action.payload.popular,
      };
    default:
      return state;
  }
};

export default moviesReducer;
