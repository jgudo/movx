import React from 'react';

const Filter = () => {
  const yearToday = new Date().getFullYear();
  const years = [];

  for (let i = yearToday; i > 1900; i--) {
    years.push(i);
  }

  return (
    <div className="filter">
      <select name="yearFilter" id="yearFilter">
        {years.map(year => (
          <option value={year}>{year}</option>
        ))}
      </select>
      <select name="sortFilter" id="sortFilter">
        <option value="popularity.desc">Popularity Desc</option>
        <option value="popularity.asc">Popularity Asc</option>
        <option value="release_date.dsc">Release Date Dsc</option>
        <option value="release_date.asc">Release Date Asc</option>
        <option value="vote_count.dsc">Vote Dsc</option>
        <option value="vote_count.asc">Vote Asc</option>
        <option value="original_title.asc">Title (A-Z)</option>
        <option value="original_title.dsc">Title (Z-A)</option>
      </select>
    </div>
  );
};
  
export default Filter;
