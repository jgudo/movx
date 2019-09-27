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
    case act.SET_DISCOVER_YEAR_FILTER:
      return {
        ...state,
        discover: {
          ...state.discover,
          year: action.payload.year
        }
      };
    case act.SET_TV_YEAR_FILTER:
      return {
        ...state,
        tv: {
          ...state.tv,
          year: action.payload.year
        }
      }; 
    case act.SET_DISCOVER_SORT_FILTER:
      return {
        ...state,
        discover: {
          ...state.discover,
          sort: action.payload.sort
        }
      };
    case act.SET_TV_SORT_FILTER:
      return {
        ...state,
        tv: {
          ...state.tv,
          sort: action.payload.sort
        }
      };
    case act.SET_DISCOVER_GENRE_FILTER:
      return {
        ...state,
        discover: {
          ...state.discover,
          genre: action.payload.genre
        }
      };     
    case act.SET_TV_GENRE_FILTER:
      return {
        ...state,
        tv: {
          ...state.tv,
          genre: action.payload.genre
        }
      };   
    case act.UPDATE_DISCOVER_QUERY:
      return {
        ...state,
        discover: {
          ...state.discover,
          query: action.payload
        }
      };
    case act.UPDATE_TV_QUERY:
      return {
        ...state,
        tv: {
          ...state.tv,
          query: action.payload
        }
      };
    default:
      return state;
  }
};
