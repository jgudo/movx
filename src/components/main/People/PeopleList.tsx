import { IActor } from '@app/types/types';
import React from 'react';
import PeopleCard from './PersonCard';

interface IProps {
  gridClass?: string;
  templateCount?: number;
  people: IActor[];
}

// templateCount = number of items shown blank as loading template
const PeopleList: React.FC<IProps> = ({ people, gridClass, templateCount }) => {
  return (
    <div className={gridClass}>
      {people.length === 0 && templateCount != 0 ? new Array(templateCount).fill({}).map((item, index) => (
        <PeopleCard
          key={`skeleton_people_${index}`}
          data={null}
        />
      )) : people.map((person, index) => (
        <PeopleCard
          key={`${person.id}_${index}`}
          data={person}
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
