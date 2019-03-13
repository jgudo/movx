import React from 'react';

const Filter = ({ 
  onSortFilterChange,
  onYearFilterChange,
  onGenreFilterChange 
}) => {
  const yearToday = new Date().getFullYear();
  const years = [];

  for (let i = yearToday; i >= 1883; i--) {
    years.push(i);
  }

  return (
    <div className="filter">
      <div className="filter__item">
        <span>Year</span>
        <br/>
        <select 
            id="yearFilter"
            name="yearFilter"
            onChange={onYearFilterChange} 
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
  
export default Filter;
