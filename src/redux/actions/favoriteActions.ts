import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from '@app/constants/actionType';
import { IMovieData } from '@app/types/types';

export const addToFavorites = (movie: IMovieData) => (<const>{
  type: ADD_TO_FAVORITES,
  payload: movie,
});

export const removeFromFavorites = (id: number) => (<const>{
  type: REMOVE_FROM_FAVORITES,
  payload: id,
});

export type TFavoriteActionType =
  | ReturnType<typeof addToFavorites>
  | ReturnType<typeof removeFromFavorites>;
