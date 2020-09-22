import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from 'components/common/Container';
import LoadingScreen from 'components/common/LoadingScreen';
import { numberWithCommas, isEmpty } from 'helpers/helperFunctions';
import Tabs from 'components/tabs/Tabs';

import useDocumentTitle from 'hooks/useDocumentTitle';
import useDidMount from 'hooks/useDidMount';
import { search } from 'actions/searchActions';
import SearchMovieTab from './tab/SearchMovieTab';
import SearchTvTab from './tab/SearchTvTab';
import SearchPeopleTab from './tab/SearchPeopleTab';

const Search = ({ match }) => {
  useDocumentTitle('Search | MOVX');
  useEffect(() => {
    const queryString = match.params.query;

    if (queryString !== query) {
      dispatch(search(queryString));
    }
  }, []);

  const { movies, tv, query, favorites, people, totalFound, isLoading } = useSelector(state => ({
    movies: state._search.search.movies,
    tv: state._search.search.tv,
    query: state._search.search.query,
    favorites: state._misc.favorites,
    people: state._search.search.people,
    totalFound: (state._search.search.movies.total_results + state._search.search.tv.total_results + state._search.search.people.total_results),
    isLoading: state._misc.isLoading
  }));
  const dispatch = useDispatch();
  const didMount = useDidMount();

  useEffect(() => {
    if (didMount) {
      dispatch(search(match.params.query));
    }
  }, [match.params.query]);

  return (!isLoading || (!isEmpty(movies) || !isEmpty(tv) || !isEmpty(people))) ? (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <br /><br />
          <h1>Search Result</h1>
          <h3>
            {numberWithCommas(totalFound)}&nbsp;
            total result with keyword: &nbsp;
            <span className="result__keyword">
              {query}
            </span>
          </h3>
        </div>
      </div>
      <Tabs>
        <div
          index={0}
          label={`Movies (${numberWithCommas(movies.total_results)})`}
        >
          <SearchMovieTab
            isLoading={isLoading}
            movies={movies}
            favorites={favorites}
            query={match.params.query}
          />
        </div>
        <div
          index={1}
          label={`TV Shows (${numberWithCommas(tv.total_results)})`}
        >
          <SearchTvTab
            isLoading={isLoading}
            query={match.params.query}
            favorites={favorites}
            tvShows={tv}
          />
        </div>
        <div
          index={2}
          label={`People (${numberWithCommas(people.total_results)})`}
        >
          <SearchPeopleTab
            isLoading={isLoading}
            people={people}
            query={match.params.query}
          />
        </div>
      </Tabs>
    </Container>
  ) : <LoadingScreen msg="Searching, Please wait..." />
};

export default Search;
