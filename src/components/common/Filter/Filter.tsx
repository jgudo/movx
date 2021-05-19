import { setGenreFilter, setSortFilter, setYearFilter } from '@app/redux/actions';
import { IRootState, TFilterCategory, TSortType } from '@app/types/types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const yearToday = new Date().getFullYear();
const years: Array<string> = [];

for (let i = yearToday; i >= 1883; i--) {
  years.push(i.toString());
}

interface IProps {
  filterCategory: TFilterCategory;
}

const Filter: React.FC<IProps> = ({ filterCategory }) => {
  const {
    filters: { year, sort, genre },
    isLoading
  } = useSelector((state: IRootState) => ({
    isLoading: state.misc.isLoading,
    filters: state.filters[filterCategory]
  }));

  const dispatch = useDispatch();

  const onFilterToggle = () => {
    document.body.classList.toggle('is-filter-open');
  };

  const onFilterClose = () => {
    document.body.classList.remove('is-filter-open');
  };

  const onYearFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;

    onFilterClose();
    dispatch(setYearFilter(selected, filterCategory));
  };

  const onSortFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;

    onFilterClose();
    dispatch(setSortFilter(selected as TSortType, filterCategory));
  };

  const onGenreFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;

    onFilterClose();
    dispatch(setGenreFilter(selected, filterCategory));
  };

  return (
    <div className="filter">
      <div className="filter__wrapper">
        <div className="filter__item">
          <span>Year</span>
          <br />
          <select
            disabled={isLoading}
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
          <span>Genre</span>
          <br />
          <select
            disabled={isLoading}
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
        <div className="filter__item">
          <span>Sort By</span>
          <br />
          <select
            disabled={isLoading}
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
        <button
          className="filter__close"
          onClick={onFilterClose}
        >
          Close
        </button>
      </div>
      <button
        className="filter__toggle button--muted"
        onClick={onFilterToggle}
      >
        <i className="fa fa-filter" />
      </button>
    </div>
  );
};

export default Filter;
