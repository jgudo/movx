import {
  FETCH_CURRENT_GENRE,
  FETCH_CURRENT_GENRE_SUCCESS, FETCH_GENRES,
  FETCH_GENRES_SUCCESS
} from '@app/constants/actionType';
import { IGenre, IMovieData } from '@app/types/types';

export const fetchGenres = () => (<const>{
  type: FETCH_GENRES
});

export const fetchGenreCategory = (genreId: string, page = 1) => (<const>{
  type: FETCH_CURRENT_GENRE,
  payload: {
    genreId,
    page,
  },
});

export const fetchGenresSuccess = (data: { genres: IGenre[] }) => (<const>{
  type: FETCH_GENRES_SUCCESS,
  payload: data
});

export const fetchGenreCategorySuccess = (data: IMovieData[]) => (<const>{
  type: FETCH_CURRENT_GENRE_SUCCESS,
  payload: data
});

export type TGenreActionType =
  | ReturnType<typeof fetchGenres>
  | ReturnType<typeof fetchGenreCategory>
  | ReturnType<typeof fetchGenresSuccess>
  | ReturnType<typeof fetchGenreCategorySuccess>;
