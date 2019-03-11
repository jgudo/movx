import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Pagination from 'react-js-pagination';

import TopProgressLoader from '../layout/TopProgressLoader'; 
import LoadingScreen from '../layout/LoadingScreen'; 
import MovieCard from '../card/MovieCard';

// actions
import { fetchRequest, isCurrentlyFetching } from '../../actions/actions';

// helpers
import isEmpty from '../../helpers/helperFunctions';

const queryString = 'trending/all/day?';

class TrendingMovies extends Component {
  state = {
    movies: {}
  };

  componentDidMount() {
    if (isEmpty(this.props.trendingMovies)) {
      this.props.fetchRequest('FETCH_TRENDING_MOVIES', queryString);
    }
  }

  handlePageChange = (e) => {
    if (this.props.trendingMovies.activePage !== e) {
      this.props.isCurrentlyFetching();
      this.props.fetchRequest('FETCH_TRENDING_MOVIES', queryString, e);
    }
  };

  render() {
    const { trendingMovies, isLoading } = this.props;
  
    return (
      <React.Fragment>
        <TopProgressLoader isLoading={isLoading} />
        {isEmpty(trendingMovies) && <LoadingScreen />}
        <div 
            className="container" 
            /* eslint no-return-assign: 0 */
            ref={el => this.container = el}
        >
          <div className="container__wrapper">
            <div className="movie__header">
              <h1>Trending Movies</h1>
            </div>
            <div className="movie__wrapper">
              {!isEmpty(trendingMovies) && trendingMovies.collection.map((movie) => {
                return (
                  <MovieCard 
                      category="movie"
                      key={movie.id}
                      movie={movie} 
                  />
                )
              })}
            </div>
            {trendingMovies.collection && (
              <div className="pagination__wrapper">
                <p>Page {trendingMovies.activePage}/{trendingMovies.total_pages}</p>
                <Pagination
                    activePage={trendingMovies.activePage || 1}
                    firstPageText={<FontAwesomeIcon icon={['fa', 'angle-double-left']} />}
                    itemsCountPerPage={10}
                    lastPageText={<FontAwesomeIcon icon={['fa', 'angle-double-right']} />}
                    nextPageText={<FontAwesomeIcon icon={['fa', 'angle-right']} />}
                    onChange={this.handlePageChange}
                    pageRangeDisplayed={5}
                    prevPageText={<FontAwesomeIcon icon={['fa', 'angle-left']} />}
                    totalItemsCount={trendingMovies.total_pages || 1000}
                />
              </div>
            )}
          </div>  
      </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ trendingMovies, isLoading }) => ({
  trendingMovies,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchRequest: (action, url, page) => dispatch(fetchRequest(action, url, page)),
  isCurrentlyFetching: bool => dispatch(isCurrentlyFetching(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingMovies);
