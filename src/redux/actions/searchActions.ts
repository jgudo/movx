import * as action from '@app/constants/actionType';
import { ISearchState } from '@app/types/types';

export const search = (query: string) => (<const>{
  type: action.SEARCH,
  payload: {
    query,
  },
});

export const searchTvShows = (query: string, page = 1) => (<const>{
  type: action.SEARCH_TV_SHOWS,
  payload: {
    query,
    page,
  },
});

export const searchPeople = (query: string, page = 1) => (<const>{
  type: action.SEARCH_PEOPLE,
  payload: {
    query,
    page,
  },
});

export const searchMovies = (query: string, page = 1) => (<const>{
  type: action.SEARCH_MOVIES,
  payload: {
    query,
    page,
  },
});

export const updateSearchQuery = (query: string) => (<const>{
  type: action.UPDATE_SEARCH_QUERY,
  payload: {
    query,
  },
});

export const addSearchHistory = (search: string) => (<const>{
  type: action.ADD_SEARCH_HISTORY,
  payload: search,
});

export const clearSearchHistory = () => (<const>{
  type: action.CLEAR_SEARCH_HISTORY,
});

export const searchSuccess = (data: Pick<ISearchState, 'movies' | 'tv' | 'people'>) => (<const>{
  type: action.SEARCH_SUCCESS,
  payload: data
});

export const searchMoviesSuccess = (data: Pick<ISearchState, 'movies'>) => (<const>{
  type: action.SEARCH_MOVIES_SUCCESS,
  payload: data
});

export const searchTvShowsSuccess = (data: Pick<ISearchState, 'tv'>) => (<const>{
  type: action.SEARCH_TV_SHOWS_SUCCESS,
  payload: data
});

export const searchPeopleSuccess = (data: Pick<ISearchState, 'people'>) => (<const>{
  type: action.SEARCH_PEOPLE_SUCCESS,
  payload: data
});

export type TSearchActionType =
  | ReturnType<typeof search>
  | ReturnType<typeof searchSuccess>
  | ReturnType<typeof searchTvShows>
  | ReturnType<typeof searchTvShowsSuccess>
  | ReturnType<typeof searchPeople>
  | ReturnType<typeof searchPeopleSuccess>
  | ReturnType<typeof searchMovies>
  | ReturnType<typeof searchMoviesSuccess>
  | ReturnType<typeof searchMoviesSuccess>
  | ReturnType<typeof updateSearchQuery>
  | ReturnType<typeof addSearchHistory>
  | ReturnType<typeof clearSearchHistory>;
