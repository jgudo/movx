import moviesReducer from './moviesReducer';
import filtersReducer from './filtersReducer';
import genreReducer from './genreReducer';
import miscReducer from './miscReducer';
import peopleReducer from './peopleReducer';
import searchReducer from './searchReducer';

export default {
  _movies: moviesReducer,
  _filters: filtersReducer,
  _genre: genreReducer,
  _misc: miscReducer,
  _people: peopleReducer,
  _search: searchReducer
};
