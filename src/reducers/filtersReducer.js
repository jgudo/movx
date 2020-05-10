import * as act from 'constants/constants';

export default (state = {
  tv: {
    genre: '',
    sort: '',
    year: '',
    query: ''
  },
  discover: {
    genre: '',
    sort: '',
    year: '',
    query: ''
  }
}, action) => {
  switch (action.type) {
    case act.SET_YEAR_FILTER:
      return {
        ...state,
        [action.payload.target]: {
          ...state[action.payload.target],
          year: action.payload.year
        }
      };
      break;
    case act.SET_GENRE_FILTER:
      return {
        ...state,
        [action.payload.target]: {
          ...state[action.payload.target],
          genre: action.payload.genre
        }
      };
      break;
    case act.SET_SORT_FILTER:
      return {
        ...state,
        [action.payload.target]: {
          ...state[action.payload.target],
          sort: action.payload.sort
        }
      };
      break;
    case act.UPDATE_QUERY:
      return {
        ...state,
        [action.payload.target]: {
          ...state[action.payload.target],
          query: action.payload.query
        }
      };
      break;
    default:
      return state;
  }
};
