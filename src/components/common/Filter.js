import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { 
  setDiscoverGenreFilter,
  setDiscoverSortFilter,
  setDiscoverYearFilter,
  setTvGenreFilter,
  setTvYearFilter,
  setTvSortFilter
} from '../../actions/actions';


const yearToday = new Date().getFullYear();
const years = [];

for (let i = yearToday; i >= 1883; i--) {
  years.push(i);
}

const Filter = (props) => {
  const { filterCategory } = props;
  const { year, sort, genre } = props.filterData;
  const filterRef = useRef(null);

  const onFilterToggle = () => {
    filterRef.current.classList.toggle('open');
  };

  
  const onFilterClose = () => {
    filterRef.current.classList.remove('open');
  };

  const onYearFilterChange = (e) => {
    const selected = e.target.value;
    onFilterClose();

    if (filterCategory === 'discover') props.setDiscoverYearFilter(selected);
    else if (filterCategory === 'tv') props.setTvYearFilter(selected);
  };

  const onSortFilterChange = (e) => {
    const selected = e.target.value;
    onFilterClose();

    if (filterCategory === 'discover') props.setDiscoverSortFilter(selected);
    else if (filterCategory) props.setTvSortFilter(selected);
  };

  const onGenreFilterChange = (e) => {
    const selected = e.target.value;
    onFilterClose();

    if (filterCategory === 'discover') props.setDiscoverGenreFilter(selected);
    else if (filterCategory === 'tv') props.setTvGenreFilter(selected);
  };

  return (
    <div className="filter">
      <div 
          className="filter__wrapper"
          ref={filterRef}
      >
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
            <option value="">None</option>
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
        <button 
            className="filter__close"
            onClick={onFilterClose}
        >
          Close
        </button>
      </div>
      <button 
          className="filter__toggle"
          onClick={onFilterToggle}
      >
      Filter
      </button>
    </div>
  );
};

Filter.propTypes = {
  filterCategory: PropTypes.string,
  filterData: PropTypes.objectOf(PropTypes.string),
  setGenreFilter: PropTypes.func,
  setSortFilter: PropTypes.func,
  setYearFilter: PropTypes.func,
  updateQuery: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  setDiscoverYearFilter: year => dispatch(setDiscoverYearFilter(year)),
  setDiscoverSortFilter: sort => dispatch(setDiscoverSortFilter(sort)),
  setDiscoverGenreFilter: genre => dispatch(setDiscoverGenreFilter(genre)),
  setTvYearFilter: year => dispatch(setTvYearFilter(year)),
  setTvSortFilter: sort => dispatch(setTvSortFilter(sort)),
  setTvGenreFilter: genre => dispatch(setTvGenreFilter(genre))
});
  
export default connect(undefined, mapDispatchToProps)(Filter);
