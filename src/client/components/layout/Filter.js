import React from 'react';
import { connect } from 'react-redux';

import { 
  setYearFilter, 
  setGenreFilter, 
  setSortFilter,
  updateQuery 
} from '../../actions/actions';

const yearToday = new Date().getFullYear();
const years = [];

for (let i = yearToday; i >= 1883; i--) {
  years.push(i);
}

const Filter = (props) => {
  const { filterCategory } = props;
  const { year, sort, genre } = props.filterData;

  const updateQueryString = (yearProps, sortProps, genreProps) => {
    const yearFilter = yearProps ? `&year=${yearProps}&first_air_date_year=${yearProps}` : '';
    const sortFilter = sortProps ? `&sort_by=${sortProps}` : '';
    const genreFilter = genreProps ? `&with_genres=${genreProps}` : '';
    const newQuery = `${yearFilter + sortFilter + genreFilter}`;

    switch (filterCategory) {
      case 'discover':
        props.updateQuery('UPDATE_DISCOVER_QUERY', newQuery);
        break;
      case 'tv':
        props.updateQuery('UPDATE_TV_QUERY', newQuery);
        console.log('hoho');
        break;
      default:
        return null;
    }
  };

  const onYearFilterChange = (e) => {
    const selected = e.target.value;
    switch (filterCategory) {
      case 'discover':
        props.setYearFilter('SET_DISCOVER_YEAR_FILTER', selected)
          .then(({ filter }) => {
            const { year, sort, genre } = filter.discover;
            updateQueryString(year, sort, genre);
          });
        break;
      case 'tv':
        props.setYearFilter('SET_TV_YEAR_FILTER', selected)
          .then(({ filter }) => {
            const { year, sort, genre } = filter.tv;
            updateQueryString(year, sort, genre);
          });
        break;
      default: 
        return null;   
    }
  };

  const onSortFilterChange = (e) => {
    const selected = e.target.value;
    switch (filterCategory) {
      case 'discover':
        props.setSortFilter('SET_DISCOVER_SORT_FILTER', selected)
          .then(({ filter }) => {
            const { year, sort, genre } = filter.discover;
            updateQueryString(year, sort, genre);
          });
        break;
      case 'tv':
        props.setSortFilter('SET_TV_SORT_FILTER', selected)
          .then(({ filter }) => {
            const { year, sort, genre } = filter.tv;
            updateQueryString(year, sort, genre);
          });
        break;
      default: 
        return null;  
    }
  };

  const onGenreFilterChange = (e) => {
    const selected = e.target.value;
    switch (filterCategory) {
      case 'discover':
        props.setGenreFilter('SET_DISCOVER_GENRE_FILTER', selected)
          .then(({ filter }) => {
            const { year, sort, genre } = filter.discover;
            updateQueryString(year, sort, genre);
          });
        break;
      case 'tv':
        props.setGenreFilter('SET_TV_GENRE_FILTER', selected)
          .then(({ filter }) => {
            const { year, sort, genre } = filter.tv;
            updateQueryString(year, sort, genre);
          });
        break;  
      default: 
        return null;  
    }
  };

  return (
    <div className="filter">
      <div className="filter__item">
        <span>Year</span>
        <br/>
        <select 
            id="yearFilter"
            name="yearFilter"
            onChange={onYearFilterChange}
            value={year} 
        >
          <option value="">None</option>
          {years.map(year => (
            <option value={year} key={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="filter__item">
        <span>Sort By</span>
        <br/>    
        <select 
            id="sortFilter"
            name="sortFilter"
            onChange={onSortFilterChange}
            value={sort}
        >
          <option value="popularity.desc">Popularity Desc</option>
          <option value="popularity.asc">Popularity Asc</option>
          <option value="release_date.desc">Release Date Desc</option>
          <option value="release_date.asc">Release Date Asc</option>
          <option value="vote_count.desc">Vote Desc</option>
          <option value="vote_count.asc">Vote Asc</option>
          <option value="original_title.asc">Title (A-Z)</option>
          <option value="original_title.desc">Title (Z-A)</option>
        </select>
      </div>
      <div className="filter__item">
        <span>Genre</span>
        <br/>    
        <select 
            id="genreFilter"
            name="genreFilter"
            onChange={onGenreFilterChange} 
            value={genre}
        >
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="18">Drama</option>
          <option value="10751">Family</option>
          <option value="14">Fantasy</option>
          <option value="36">History</option>
          <option value="27">Horror</option>
          <option value="10402">Music</option>
          <option value="9648">Mystery</option>
          <option value="10749">Romance</option>
          <option value="878">Sci-Fi</option>
          <option value="10770">TV Movie</option>
          <option value="53">Thriller</option>
          <option value="10752">War</option>
          <option value="37">Western</option>
        </select>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setYearFilter: (action, year) => dispatch(setYearFilter(action, year)),
  setSortFilter: (action, sort) => dispatch(setSortFilter(action, sort)),
  setGenreFilter: (action, genre) => dispatch(setGenreFilter(action, genre)),
  updateQuery: (action, query) => dispatch(updateQuery(action, query))
});
  
export default connect(undefined, mapDispatchToProps)(Filter);
