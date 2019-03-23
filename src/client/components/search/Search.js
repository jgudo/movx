import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingScreen from '../layout/LoadingScreen'; 
import SearchMovieTab from './SearchMovieTab';
import SearchTvTab from './SearchTvTab';
import SearchPeopleTab from './SearchPeopleTab';
import Tabs from '../tabs/Tabs';

import { fetchRequest, updateQuery, isCurrentlyFetching } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

class Search extends Component {
  state = {
    error: undefined
  };
  
  componentDidMount() {
    const queryString = this.props.match.params.query;
    if (queryString !== this.props.query) {
      this.search(queryString);
      this.props.updateQuery('UPDATE_SEARCH_QUERY', queryString);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.query !== nextProps.match.params.query) {
      this.search(nextProps.match.params.query);
      this.props.updateQuery('UPDATE_SEARCH_QUERY', nextProps.match.params.query);
    }
  }

  search = (query) => {
    this.props.isCurrentlyFetching();
    this.props.fetchRequest('SEARCH_MOVIES', `search/movie?query=${query}`)
      .then((status) => {
        if (status === 503) {
          this.setState({ error: 'Error connection' });
        } else if (status === 404) {
          this.setState({ error: 'Cannot fetch movies' });
        }
      });
    this.props.fetchRequest('SEARCH_TV_SHOWS', `search/tv?query=${query}`);
    this.props.fetchRequest('SEARCH_PEOPLE', `search/person?query=${query}`);
  };

  render() {
    const { error } = this.state;
    const { 
      movies, 
      tv, 
      people,
      totalFound,
      match, 
      isLoading 
    } = this.props;
    
    return (
      <React.Fragment>
        {isLoading && <LoadingScreen />}
        <div className="container">
          <div className="container__wrapper">
            {(!isEmpty(movies) && !error && !isLoading) && (
              <React.Fragment>
                <div className="movie__header">
                  <div className="movie__header-title">
                    <h1>Search Result</h1>
                    <h3>
                     {numberWithCommas(totalFound)}&nbsp; 
                      total result with keyword: &nbsp;
                      <span className="result__keyword">
                        {match.params.query}
                      </span>
                    </h3>
                  </div>
                </div>
                <Tabs>
                  <div label={`Movies (${numberWithCommas(movies.total_results)})`}>
                    <SearchMovieTab
                        isLoading={isLoading} 
                        movies={movies}
                        query={match.params.query}
                    />
                  </div>
                  <div label={`TV Shows (${numberWithCommas(tv.total_results)})`}>
                    <SearchTvTab 
                        isLoading={isLoading} 
                        query={match.params.query}
                        tvShows={tv}
                    />
                  </div>
                  <div label={`People (${numberWithCommas(people.total_results)})`}>
                  <SearchPeopleTab 
                      isLoading={isLoading} 
                      people={people}
                      query={match.params.query}
                  />
                  </div>
                </Tabs>
              </React.Fragment>
            )}
            {error && (
              <div className="error">
                <h1>{error}</h1>
                <button 
                    className="button--primary m-auto"
                    onClick={() => {
                      window.location.reload();
                    }}
                >
                  Retry
                </button>
              </div>
            )}
          </div>  
        </div>
      </React.Fragment>
    );
  }
}

Search.propTypes = {
  isLoading: PropTypes.bool, 
  movies: PropTypes.object, 
  people: PropTypes.object,
  tv: PropTypes.object, 
  totalFound: PropTypes.number
};

const mapStateToProps = ({ search, isLoading }) => ({
  movies: search.movies,
  tv: search.tv,
  query: search.query,
  people: search.people,
  totalFound: (search.movies.total_results + search.tv.total_results + search.people.total_results),
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool)),
  updateQuery: (action, query) => dispatch(updateQuery(action, query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
