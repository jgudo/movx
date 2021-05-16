import * as action from '@app/constants/actionType';
import { TFilterCategory, TSortType } from '@app/types/types';

export const setYearFilter = (year: string, target: TFilterCategory) => (<const>{
  type: action.SET_YEAR_FILTER,
  payload: {
    year,
    target,
  },
});

export const setSortFilter = (sort: TSortType, target: TFilterCategory) => (<const>{
  type: action.SET_SORT_FILTER,
  payload: {
    sort,
    target,
  },
});

export const setGenreFilter = (genre: string, target: TFilterCategory) => (<const>{
  type: action.SET_GENRE_FILTER,
  payload: {
    genre,
    target,
  },
});

export const updateQuery = (query: string, target: TFilterCategory) => (<const>{
  type: action.UPDATE_QUERY,
  payload: {
    query,
    target,
  }
});

export type TFilterActionType =
  | ReturnType<typeof setYearFilter>
  | ReturnType<typeof setSortFilter>
  | ReturnType<typeof setGenreFilter>
  | ReturnType<typeof updateQuery>;
