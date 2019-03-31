import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoadingScreen from '../layout/LoadingScreen'; 
import SearchMovieTab from './SearchMovieTab';
import SearchTvTab from './SearchTvTab';
import SearchPeopleTab from './SearchPeopleTab';
import Tabs from '../tabs/Tabs';

import { 
  searchMovies, 
  searchTvShows,
  searchPeople,
  updateSearchQuery,
  isCurrentlyFetching 
} from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

class Search extends Component {
  componentDidMount() {
    const queryString = this.props.match.params.query;
    if (queryString !== this.props.query) {
      this.search(queryString);
      this.props.updateSearchQuery(queryString);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.query !== nextProps.match.params.query) {
      this.search(nextProps.match.params.query);
      this.props.updateSearchQuery(nextProps.match.params.query);
    }
  }

  search = (query) => {
    this.props.isCurrentlyFetching();
    this.props.searchMovies(`search/movie?query=${query}`);
    this.props.searchTvShows(`search/tv?query=${query}`);
    this.props.searchPeople(`search/person?query=${query}`);
  };

  render() {
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
        {(!isEmpty(movies) && !isLoading) && (
          <div className="container">
            <div className="container__wrapper">
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
            </div>  
          </div>
        )}
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
  searchMovies: (url, page) => dispatch(searchMovies(url, page)),
  searchPeople: (url, page) => dispatch(searchPeople(url, page)),
  searchTvShows: (url, page) => dispatch(searchTvShows(url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool)),
  updateSearchQuery: query => dispatch(updateSearchQuery(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
