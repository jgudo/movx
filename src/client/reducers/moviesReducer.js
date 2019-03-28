import { 
  IS_LOADING,
  ADD_SEARCH_HISTORY,
  CLEAR_SEARCH_HISTORY,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  // FETCH_SELECTED_MOVIE,
  FETCH_SELECTED_MOVIE_SUCCESS,
  FETCH_SELECTED_PERSON,
  // FETCH_DISCOVER_MOVIES,
  FETCH_DISCOVER_MOVIES_SUCCESS,
  // FETCH_TV_SHOWS,
  FETCH_TV_SHOWS_SUCCESS,
  // FETCH_PEOPLE,
  FETCH_PEOPLE_SUCCESS,
  // FETCH_GENRES,
  FETCH_GENRES_SUCCESS,
  // FETCH_GENRE_CATEGORY,
  FETCH_GENRE_CATEGORY_SUCCESS,
  // FETCH_POPULAR_MOVIES,
  FETCH_POPULAR_MOVIES_SUCCESS,
  // FETCH_TRENDING_MOVIES,
  FETCH_TRENDING_MOVIES_SUCCESS,
  // FETCH_TOPRATED_MOVIES,
  FETCH_TOPRATED_MOVIES_SUCCESS,
  // FETCH_UPCOMING_MOVIES,
  FETCH_UPCOMING_MOVIES_SUCCESS,
  SET_DISCOVER_YEAR_FILTER,
  SET_TV_YEAR_FILTER,
  SET_DISCOVER_SORT_FILTER,
  SET_TV_SORT_FILTER,
  SET_DISCOVER_GENRE_FILTER,
  SET_TV_GENRE_FILTER,
  UPDATE_DISCOVER_QUERY,
  UPDATE_TV_QUERY,
  // SEARCH_MOVIES,
  SEARCH_MOVIES_SUCCESS,
  // SEARCH_TV_SHOWS,
  SEARCH_TV_SHOWS_SUCCESS,
  // SEARCH_PEOPLE,
  SEARCH_PEOPLE_SUCCESS,
  UPDATE_SEARCH_QUERY

} from '../constants/constants';

const moviesReducer = (state = {
  trendingMovies: {},
  discoverMovies: {},
  current: {
    movie: {
      images: {
        posters: [],
        backdrops: []
      },
      videos: {
        results: []
      }
    },
    keywords: [],
    casts: [],
    reviews: {}
  },
  popularMovies: {},
  topRatedMovies: {},
  upcomingMovies: {},
  tvShows: {},
  people: {},
  person: {
    actor: {},
    casting: []
  },
  search: {
    query: '',
    tv: {},
    movies: {},
    people: {}
  },
  genres: [],
  genreMovies: {},
  favorites: [],
  filter: {
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
  },
  recentSearch: [],
  isLoading: false
}, action) => {
  switch (action.type) {
    case FETCH_TRENDING_MOVIES_SUCCESS:
      return {
        ...state,
        trendingMovies: { ...action.data },
        isLoading: false
      };
    case FETCH_DISCOVER_MOVIES_SUCCESS:
      return {
        ...state,
        discoverMovies: { ...action.data },
        isLoading: false
      };
    case FETCH_TV_SHOWS_SUCCESS:
      return {
        ...state,
        tvShows: { ...action.data },
        isLoading: false
      };
    case FETCH_PEOPLE_SUCCESS:
      return {
        ...state,
        people: { ...action.data },
        isLoading: false
      };    
    case FETCH_GENRES_SUCCESS:
      return {
        ...state,
        genres: [...action.data.genres], 
        isLoading: false
      }; 
    case FETCH_GENRE_CATEGORY_SUCCESS:
      return {
        ...state,
        genreMovies: action.data, 
        isLoading: false
      };
    case FETCH_SELECTED_MOVIE_SUCCESS:
      return {
        ...state,
        current: action.data, 
        isLoading: false
      };
    case FETCH_SELECTED_PERSON:
      return {
        ...state,
        person: {
          ...state.person,
          actor: action.actor,
          casting: action.casting
        }, 
        isLoading: false
      };
    case FETCH_POPULAR_MOVIES_SUCCESS:
      return {
        ...state,
        popularMovies: action.data, 
        isLoading: false
      };
    case FETCH_TOPRATED_MOVIES_SUCCESS:
      return {
        ...state,
        topRatedMovies: action.data, 
        isLoading: false
      };
    case FETCH_UPCOMING_MOVIES_SUCCESS:
      return {
        ...state,
        upcomingMovies: action.data, 
        isLoading: false
      };
    case SET_DISCOVER_YEAR_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          discover: {
            ...state.filter.discover,
            year: action.year
          }
        }
      };
    case SET_TV_YEAR_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          tv: {
            ...state.filter.tv,
            year: action.year
          }
        }
      }; 
    case SET_DISCOVER_SORT_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          discover: {
            ...state.filter.discover,
            sort: action.sort
          }
        }
      };
    case SET_TV_SORT_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          tv: {
            ...state.filter.tv,
            sort: action.sort
          }
        }
      };
    case SET_DISCOVER_GENRE_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          discover: {
            ...state.filter.discover,
            genre: action.genre
          }
        }
      };     
    case SET_TV_GENRE_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          tv: {
            ...state.filter.tv,
            genre: action.genre
          }
        }
      };   
    case UPDATE_DISCOVER_QUERY:
      return {
        ...state,
        filter: {
          ...state.filter,
          discover: {
            ...state.filter.discover,
            query: action.query
          }
        }
      };
    case UPDATE_TV_QUERY:
      return {
        ...state,
        filter: {
          ...state.filter,
          tv: {
            ...state.filter.tv,
            query: action.query
          }
        }
      };
    case ADD_SEARCH_HISTORY:
      return {
        ...state,
        recentSearch: [
          ...state.recentSearch, 
          action.search
        ]
      };
    case CLEAR_SEARCH_HISTORY:
      return {
        ...state,
        recentSearch: []
      };
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [
          action.favorites,
          ...state.favorites 
        ]
      };    
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(favorite => favorite.id !== action.id)
      };
                     
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.bool
      };
    case SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          movies: action.data
        },
        isLoading: false
      };
    case SEARCH_TV_SHOWS_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          tv: action.data
        },
        isLoading: false
      };
    case SEARCH_PEOPLE_SUCCESS:
      return {
        ...state,
        search: {
          ...state.search,
          people: action.data
        },
        isLoading: false
      };
    case UPDATE_SEARCH_QUERY:
      return {
        ...state,
        search: {
          ...state.search,
          query: action.query
        }
      };
    default: 
      return state;
  }
};

export default moviesReducer;
