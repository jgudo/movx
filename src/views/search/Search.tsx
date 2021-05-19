import { Container, ProgressLoader, TabContent } from '@app/components/common';
import Tabs from '@app/components/common/Tabs/Tabs';
import { numberWithCommas } from '@app/helpers';
import { useDidMount, useDocumentTitle } from '@app/hooks';
import { search } from '@app/redux/actions';
import { IRootState } from '@app/types/types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import SearchMovieTab from './tab/SearchMovieTab';
import SearchPeopleTab from './tab/SearchPeopleTab';
import SearchTvTab from './tab/SearchTvTab';

const Search: React.FC<RouteComponentProps<{ query: string }>> = ({ match }) => {
  useDocumentTitle('Search | MOVX');
  const state = useSelector((state: IRootState) => ({
    moviesTotal: state.search.movies?.total_results || 0,
    tvTotal: state.search.tv?.total_results || 0,
    query: state.search.query,
    peopleTotal: state.search.people?.total_results || 0,
    isLoading: state.misc.isLoading
  }));
  const query = match.params.query;

  useEffect(() => {

    if (query !== state.query) {
      dispatch(search(query));
    }
  }, []);

  const dispatch = useDispatch();
  const didMount = useDidMount();

  useEffect(() => {
    if (didMount) {
      dispatch(search(query));
    }
  }, [query]);

  return (!state.isLoading || !!state.moviesTotal || !!state.tvTotal || !!state.peopleTotal) ? (
    <Container>
      <div className="movie__header">
        <div className="movie__header-title">
          <br /><br />
          <h1>Search Result</h1>
          <h3>
            {numberWithCommas(state.moviesTotal + state.tvTotal + state.peopleTotal)}&nbsp;
            total result with keyword: &nbsp;
            <span className="result__keyword">
              {state.query}
            </span>
          </h3>
        </div>
      </div>
      <Tabs>
        <TabContent index={0} label={`Movies (${numberWithCommas(state.moviesTotal)})`}>
          <SearchMovieTab />
        </TabContent>
        <TabContent index={1} label={`TV Shows (${numberWithCommas(state.tvTotal)})`}>
          <SearchTvTab />
        </TabContent>
        <TabContent index={2} label={`People (${numberWithCommas(state.peopleTotal)})`}>
          <SearchPeopleTab />
        </TabContent>
      </Tabs>
    </Container>
  ) : <ProgressLoader message="Searching, Please wait..." />
};

export default Search;
