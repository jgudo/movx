import {
  IS_LOADING,
  SET_DARK_MODE,
} from '@app/constants/actionType';
import { IMiscState } from '@app/types/types';
import { TMiscActionType } from '../actions/miscActions';

const defaultState: IMiscState = {
  isLoading: false,
  darkMode: true,
}

export default (state = defaultState, action: TMiscActionType) => {
  switch (action.type) {
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_DARK_MODE:
      return {
        ...state,
        darkMode: action.payload,
      };
    default:
      return state;
  }
};
