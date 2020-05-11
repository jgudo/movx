import { FETCH_PEOPLE_SUCCESS, FETCH_SELECTED_PERSON_SUCCESS } from 'constants/constants';

export default (state = {
  people: {},
  person: {
    actor: {},
    casting: []
  }
}, action) => {
  switch (action.type) {
    case FETCH_PEOPLE_SUCCESS:
      return {
        ...state,
        people: { ...action.payload }
      };   
      break;
    case FETCH_SELECTED_PERSON_SUCCESS:
      return {
        ...state,
        person: {
          ...state.person,
          actor: action.payload.actor,
          casting: action.payload.casting
        }
      };
      break;
    default:
      return state;
  }
}