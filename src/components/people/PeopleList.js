import React from 'react';
import PeopleCard from './PeopleCard';

// templateCount = number of items shown blank as loading template
const PeopleList = ({ people, gridClass, templateCount, isLoading }) => {
  return (
    <div className={gridClass}>
      {!people && templateCount != 0 ? new Array(templateCount).fill({}).map((item, index) => (
        <PeopleCard
          category="people"
          key={`skeleton_people_${index}`}
          people={{}}
        />
      )) : people.map((person, index) => (
        <PeopleCard
          category="people"
          isLoading={isLoading}
          key={`${person.id}_${index}`}
          people={person}
        />
      ))}
    </div>
  );
};

PeopleList.defaultProps = {
  templateCount: 0,
  gridClass: 'grid'
};

export default PeopleList;
