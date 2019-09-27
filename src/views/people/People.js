import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loader from 'components/hoc/Loader'; 
import PeopleCard from 'components/people/PeopleCard';
import PaginationBar from 'components/common/PaginationBar';
import { fetchPeople } from 'actions/peopleActions';
import { isEmpty, numberWithCommas } from 'helpers/helperFunctions';

const People = (props) => {
  const people = useSelector(state => state._people.people);
  const dispatch = useDispatch();
  const query = '/person/popular?';

  useEffect(() => {
    if (isEmpty(people)) {
      dispatch(fetchPeople(query));
    } 
  }, []);

  const handlePageChange = (page) => {
    if (people.page !== page) {
      dispatch(fetchPeople(query, page));
    }
  };

  return (
    <div className="container">
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Popular People</h1>
          <h3>{numberWithCommas(people.total_results)} People</h3>
        </div>
      </div>
      <div className="movie__wrapper">
        {people.results ? people.results.map(person => (
          <PeopleCard 
              category="people"
              key={person.id}
              people={person} 
          />
        )) : new Array(10).fill({}).map((item, index) => (
          <PeopleCard 
              category="people"
              key={`skeleton_person_${index}`}
              people={{}} 
          />
        ))}
      </div>
      <PaginationBar 
          activePage={people.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={people.total_pages}
          totalPage={people.total_pages}
      />
    </div>  
  );
};

export default Loader('people')(People);
