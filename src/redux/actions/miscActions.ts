import {
  IS_LOADING,
  SET_DARK_MODE
} from '@app/constants/actionType';

export const setLoading = (bool = true) => (<const>{
  type: IS_LOADING,
  payload: bool,
});

export const setDarkMode = (bool = true) => (<const>{
  type: SET_DARK_MODE,
  payload: bool,
});

export type TMiscActionType =
  | ReturnType<typeof setLoading>
  | ReturnType<typeof setDarkMode>
