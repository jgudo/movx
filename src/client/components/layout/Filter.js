import React from 'react';

const Filter = ({ 
  onSortFilterChange,
  onYearFilterChange 
}) => {
  const yearToday = new Date().getFullYear();
  const years = [];

  for (let i = yearToday; i > 1900; i--) {
    years.push(i);
  }

  return (
    <div className="filter">
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
  );
};
  
export default Filter;
