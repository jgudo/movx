import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../hoc/Loader';
import SearchMovieTab from './SearchMovieTab';
import SearchTvTab from './SearchTvTab';
import SearchPeopleTab from './SearchPeopleTab';
import Tabs from '../tabs/Tabs';

import { 
  search,
  updateSearchQuery
} from '../../actions/actions';

// helpers
import { numberWithCommas } from '../../helpers/helperFunctions';

class Search extends Component {
  componentDidMount() {
    const queryString = this.props.match.params.query;
    
    if (queryString !== this.props.query) {
      this.props.searchAll(queryString);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.query !== nextProps.match.params.query) {
      this.props.searchAll(nextProps.match.params.query);
    }
  }

  render() {
    const { 
      movies, 
      tv, 
      people,
      query,
      totalFound,
      match, 
      isLoading 
    } = this.props;
    
    return (
      <div className="container">
        <div className="container__wrapper">
          <div className="movie__header">
            <div className="movie__header-title">
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
        </div>  
      </div>
    );
  }
}

Search.propTypes = {
  isLoading: PropTypes.bool, 
  movies: PropTypes.object, 
  people: PropTypes.object,
  totalFound: PropTypes.number,
  tv: PropTypes.object
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
  searchAll: query => dispatch(search(query)),
  updateSearchQuery: query => dispatch(updateSearchQuery(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader('movies')(Search));
