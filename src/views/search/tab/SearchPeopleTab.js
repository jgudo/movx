import React from 'react';
import { useDispatch } from 'react-redux';

import PeopleList from 'components/people/PeopleList';
import PaginationBar from 'components/common/PaginationBar';

import { searchPeople } from 'actions/searchActions';
import { isEmpty } from 'helpers/helperFunctions';

const SearchPeopleTab = ({ people, isLoading, query }) => {
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    if (people.page !== page && !isLoading) {
      dispatch(searchPeople(`/search/person?query=${query}`, page));
    }
  };

  return !isEmpty(people) && people.results.length !== 0 ? (
    <>
      <PeopleList 
          category="people" 
          people={people.results} 
      />
      <PaginationBar 
          activePage={people.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={people.total_pages}
          totalPage={people.total_pages}
      />
    </>
  ) : (
    <div className="search__no-result">
      <h1>No people found.</h1>
      <i className="fa fa-user-friends" />
    </div>
  );
};

export default SearchPeopleTab;
