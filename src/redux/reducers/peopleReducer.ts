import {
  FETCH_PEOPLE_SUCCESS,
  FETCH_SELECTED_PERSON_SUCCESS
} from '@app/constants/actionType';
import { IPeopleState } from '@app/types/types';
import { TPeopleActionType } from '../actions/peopleActions';

const defaultState: IPeopleState = {
  people: null,
  current: {
    actor: null,
    casting: [],
  }
}

export default (state = defaultState, action: TPeopleActionType) => {
  switch (action.type) {
    case FETCH_PEOPLE_SUCCESS:
      return {
        ...state,
        people: action.payload,
      };
      break;
    case FETCH_SELECTED_PERSON_SUCCESS:
      return {
        ...state,
        current: {
          actor: action.payload.actor,
          casting: action.payload.casting,
        },
      };
      break;
    default:
      return state;
  }
};
