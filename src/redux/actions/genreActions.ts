import { FETCH_GENRES, FETCH_GENRES_SUCCESS, FETCH_GENRE_CATEGORY, FETCH_GENRE_CATEGORY_SUCCESS } from '@app/constants/actionType';
import { IGenre, IMovieData } from '@app/types/types';

export const fetchGenres = (query: string, page = 1) => (<const>{
  type: FETCH_GENRES,
  payload: {
    query,
    page,
  },
});

export const fetchGenreCategory = (query: string, page = 1) => (<const>{
  type: FETCH_GENRE_CATEGORY,
  payload: {
    query,
    page,
  },
});

export const fetchGenresSuccess = (data: IGenre[]) => (<const>{
  type: FETCH_GENRES_SUCCESS,
  payload: data
});

export const fetchGenreCategorySuccess = (data: IMovieData[]) => (<const>{
  type: FETCH_GENRE_CATEGORY_SUCCESS,
  payload: data
});

export type TGenreActionType =
  | ReturnType<typeof fetchGenres>
  | ReturnType<typeof fetchGenreCategory>
  | ReturnType<typeof fetchGenresSuccess>
  | ReturnType<typeof fetchGenreCategorySuccess>;
