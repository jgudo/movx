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
  genres: {},
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
    case 'FETCH_TRENDING_MOVIES':
      return {
        ...state,
        trendingMovies: { ...action.data },
        isLoading: false
      };
    case 'FETCH_DISCOVER_MOVIES':
      return {
        ...state,
        discoverMovies: { ...action.data },
        isLoading: false
      };
    case 'FETCH_TV_SHOWS':
      return {
        ...state,
        tvShows: { ...action.data },
        isLoading: false
      };
    case 'FETCH_PEOPLE':
      return {
        ...state,
        people: { ...action.data },
        isLoading: false
      };    
    case 'FETCH_GENRES':
      return {
        ...state,
        genres: action.data, 
        isLoading: false
      }; 
    case 'FETCH_GENRE_CATEGORY':
      return {
        ...state,
        genreMovies: action.data, 
        isLoading: false
      };
    case 'FETCH_SELECTED_MOVIE':
      return {
        ...state,
        current: action.data, 
        isLoading: false
      };
    case 'FETCH_SELECTED_PERSON':
      return {
        ...state,
        person: {
          ...state.person,
          actor: action.actor,
          casting: action.casting
        }, 
        isLoading: false
      };
    case 'FETCH_POPULAR_MOVIES':
      return {
        ...state,
        popularMovies: action.data, 
        isLoading: false
      };
    case 'FETCH_TOPRATED_MOVIES':
      return {
        ...state,
        topRatedMovies: action.data, 
        isLoading: false
      };
    case 'FETCH_UPCOMING_MOVIES':
      return {
        ...state,
        upcomingMovies: action.data, 
        isLoading: false
      };
    case 'SET_DISCOVER_YEAR_FILTER':
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
    case 'SET_TV_YEAR_FILTER':
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
    case 'SET_DISCOVER_SORT_FILTER':
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
    case 'SET_TV_SORT_FILTER':
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
    case 'SET_DISCOVER_GENRE_FILTER':
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
    case 'SET_TV_GENRE_FILTER':
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
    case 'UPDATE_DISCOVER_QUERY':
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
    case 'UPDATE_TV_QUERY':
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
    case 'ADD_SEARCH_HISTORY':
      return {
        ...state,
        recentSearch: [
          ...state.recentSearch, 
          action.search
        ]
      };
    case 'CLEAR_SEARCH_HISTORY':
      return {
        ...state,
        recentSearch: []
      };
    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: [
          action.favorites,
          ...state.favorites 
        ]
      };    
    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(favorite => favorite.id !== action.id)
      };
                     
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.bool
      };
    case 'SEARCH_MOVIES':
      return {
        ...state,
        search: {
          ...state.search,
          movies: action.data
        },
        isLoading: false
      };
    case 'SEARCH_TV_SHOWS':
      return {
        ...state,
        search: {
          ...state.search,
          tv: action.data
        },
        isLoading: false
      };
    case 'SEARCH_PEOPLE':
      return {
        ...state,
        search: {
          ...state.search,
          people: action.data
        },
        isLoading: false
      };
    case 'UPDATE_SEARCH_QUERY':
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
