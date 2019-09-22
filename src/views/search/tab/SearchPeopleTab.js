import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import PeopleCard from '../../../components/people/PeopleCard';
import PaginationBar from '../../../components/common/PaginationBar';

// actions
import { searchPeople } from '../../../actions/searchActions';

// helpers
import { isEmpty } from '../../../helpers/helperFunctions';

const SearchPeopleTab = ({ people, isLoading, query }) => {
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    if (props.people.page !== page && !isLoading) {
      dispatch(searchPeople(`/search/person?query=${query}`, page));
    }
  };

  return (
    !isEmpty(people) && people.results.length !== 0 ? (
      <>
        <div className="movie__wrapper">
          {people.results.map((person) => {
            return (
              <PeopleCard 
                  category="people"
                  key={person.id}
                  people={person}  
              />
            )
          })}
        </div>
        {people.total_pages > 1 && (
          <PaginationBar 
              activePage={people.page}
              itemsCountPerPage={1}
              onChange={handlePageChange}
              pageRangeDisplayed={10}
              totalItemsCount={people.total_pages}
              totalPage={people.total_pages}
          />
        )}
      </>
    ) : (
      <div className="search__no-result">
        <h1>No result found.</h1>
      </div>
    )
  );
};

export default SearchPeopleTab;
