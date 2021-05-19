import { Pagination } from '@app/components/common';
import { PeopleList } from '@app/components/main';
import { searchPeople } from '@app/redux/actions';
import { IRootState } from '@app/types/types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SearchPeopleTab = () => {
  const dispatch = useDispatch();
  const { query } = useParams<{ query: string }>();
  const { people, isLoading } = useSelector((state: IRootState) => ({
    people: state.search.people,
    isLoading: state.misc.isLoading
  }))
  const handlePageChange = (page: number) => {
    if (people?.page !== page && !isLoading) {
      dispatch(searchPeople(query, page));
    }
  };

  return people && people.results.length !== 0 ? (
    <>
      <PeopleList people={people.results} />
      <Pagination
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
